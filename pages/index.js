import React from 'react';
import styled from 'styled-components';
import config from '../config.json';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/timeline';
import { videoService } from '../src/services/video-service';
import { playlistService } from '../src/services/playlist-service';
import { MdEdit, MdOutlineClose, MdVideocamOff } from 'react-icons/md';
import { PlaylistContext } from '../src/components/RegisterVideo/components/playlist-provider';
import { useForm } from '../src/utils/use-form';

function HomePage() {
    const homePageStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    };

    const [filterValue, setFilterValue] = React.useState("");

    const playlistContext = React.useContext(PlaylistContext);

    const VideoService = videoService();
    const PlaylistService = playlistService();

    React.useEffect(() => {
        PlaylistService.getAllPlaylists().then(({ data: playlistData }) => {
            VideoService.getAllVideos().then(({ data: videoData }) => {
                const newPlaylists = {...playlistContext.playlist};
                playlistData.forEach((playlist) => {
                    newPlaylists[playlist.name] = [...(playlistContext.playlist[playlist.name] ?? [])];
                    newPlaylists[playlist.name].push(...videoData?.filter((video) =>
                        video.playlist === playlist.id
                        && !newPlaylists[playlist.name].map(v => v.id).includes(video.id)
                    ));
                });
                playlistContext.setPlaylist(newPlaylists);

                const playlistId = playlistData.reduce((prev, curr) => {
                    prev[curr.name] = curr.id;
                    return prev;
                }, {});

                playlistContext.setPlaylistId({ ...playlistContext.playlistId, ...playlistId });
            });
        });
    }, []);

    return (
        <>
            <div style={homePageStyle}>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header />
                <Timeline playlists={playlistContext.playlist} filter={filterValue} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};

    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: darkblue;
    background-image: url("https://images.unsplash.com/photo-1571974599782-87624638275e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80");
    background-position: center;
    background-size: cover;
    height: 230px;
    width: 100%;
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner />
            <section className="user-info">
                <img src={`https://github.com/${config.dev.github}.png`} />
                <div>
                    <h2>{config.dev.name}</h2>
                    <span>Dev. Front-end JR.</span>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({playlists, filter}) {

    const playlistNames = Object.keys(playlists);

    const PlaylistService = playlistService();
    const [showEditModal, setShowEditModal] = React.useState(false);
    const playlistContext = React.useContext(PlaylistContext);
    const formEdit = useForm({
        initialValues: { name: '', id: 0 }
    });

    const savePlaylist = () => {
        const newPlaylist = { ...formEdit.values };

        PlaylistService.updatePlaylist({ name: newPlaylist.name }, newPlaylist.id).then(({ data }) => {
            const newPlaylists = {...playlistContext.playlist};
            newPlaylists[data[0].name] = newPlaylists[newPlaylist.name];
            delete newPlaylists[newPlaylist.name];
            playlistContext.setPlaylist(newPlaylists);
        });
    };

    const removePlaylist = () => {
        const { id: playlistId } = formEdit.values;
        const [playlistName] = Object.entries(playlistContext.playlistId).find(([key, value]) => value === playlistId);

        PlaylistService.deletePlaylist(playlistId).then(() => {
            const newPlaylists = {...playlistContext.playlist};
            delete newPlaylists[playlistName];
            playlistContext.setPlaylist(newPlaylists);

            const newPlaylistsId = {...playlistContext.playlistId};
            delete newPlaylistsId[playlistName];
            playlistContext.setPlaylistId(newPlaylistsId);
        });
    }

    return (
        <StyledTimeline>
            {
                playlistNames.map((name, index) => {
                    const videos = playlists[name];
                    return (
                        <div key={index}>
                            {showEditModal ? (<div className="edit-modal">      
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    setShowEditModal(false);
                                    savePlaylist();
                                    formEdit.clearForm();
                                }}>
                                    <div>
                                        <button className="close-modal" onClick={() => {setShowEditModal(false)}}>
                                            <MdOutlineClose />
                                        </button>
                                        <input
                                            placeholder="Playlist name"
                                            name="name"
                                            value={formEdit.values.name}
                                            onChange={formEdit.handleChange} />
                                        <button type="submit" disabled={formEdit.values.name === "" ? true : null}>Submit</button>
                                        <button type="button" onClick={() => {
                                            removePlaylist();
                                            formEdit.clearForm();
                                            setShowEditModal(false);
                                        }}>Remove playlist</button>
                                    </div>
                                </form>
                            </div>) : false}

                            <section>
                                <h2>{name} <MdEdit className="edit" onClick={() => {
                                    setShowEditModal(true);
                                    const id = playlistContext.playlistId[name];
                                    const fakeEvent = { target: { value: id, name: 'id' } };
                                    formEdit.handleChange(fakeEvent);
                                }} /></h2>
                                <div>
                                    {   videos.length > 0 ?
                                        videos
                                        .filter((item) => {
                                            const titleNormalized = item.title.toLowerCase();
                                            const filterNormalized = filter.toLowerCase();
                                            return titleNormalized.includes(filterNormalized);
                                        })
                                        .map((item, index) => {
                                            return (
                                                <a key={index} href={item.url}>
                                                    <img src={item.thumb} />
                                                    <span>{item.title}</span>
                                                </a>
                                            );
                                        }) :
                                        (
                                            <div className="no-videos">
                                                <MdVideocamOff />
                                                <span>No videos in playlist</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </section>
                        </div>
                    );
                })
            }
        </StyledTimeline>
    )
}