import React from "react";
import { playlistService } from "../../services/playlist-service";
import { videoService } from "../../services/video-service";
import { getYoutubeThumb } from "../../utils/youtube-utils";
import { StyledRegisterVideo } from "./styles";
import { MdOutlinePlaylistAdd, MdOutlineVideoCall, MdAdd, MdOutlineClose } from 'react-icons/md';
import { PlaylistContext } from "./components/playlist-provider";
import { useForm } from "../../utils/use-form";

export default function RegisterVideo() {

    const formVideo = useForm({
        initialValues: { title: '', url: '', thumb: '', playlist: 0 }
    });

    const formPlaylist = useForm({
        initialValues: { name: '' }
    });

    const [showFormVideo, setShowFormVideo] = React.useState(false);
    const [showFormPlaylist, setShowFormPlaylist] = React.useState(false);
    const [showFabOptions, setShowFabOptions] = React.useState(false);
    const [clickedFab, setClickedFab] = React.useState(false);
    const [playlists, setPlaylists] = React.useState([]);

    const playlistContext = React.useContext(PlaylistContext);

    const PlaylistService = playlistService();
    const VideoService = videoService();
    
    React.useEffect(() => {
        PlaylistService.getAllPlaylists().then(({ data }) => {
            const newPlaylists = [...playlists, ...data.filter((playlist) => !playlists.includes(playlist))];
            setPlaylists(newPlaylists);
        });
    }, []);

    const saveVideo = () => {
        const video = { ...formVideo.values };

        video.thumb = getYoutubeThumb(formVideo.values.url);

        VideoService.insertVideo(video).then(({ data }) => {
            const newPlaylists = {...playlistContext.playlist};
            const playlist = playlists.find((playlist) => playlist.id === data[0].playlist);
            newPlaylists[playlist.name].push(data[0]);
            playlistContext.setPlaylist(newPlaylists);

            const newPlaylistsForm = [...playlists, data[0]]
            setPlaylists(newPlaylistsForm);
        });
    };
    const savePlaylist = () => {
        const playlist = { ...formPlaylist.values };

        PlaylistService.insertPlaylist(playlist).then(({ data }) => {
            const newPlaylists = {...playlistContext.playlist};
            newPlaylists[data[0].name] = [];
            playlistContext.setPlaylist(newPlaylists);
        });
    };

    const getClassNamesForButton = (...defaultClasses) => {
        const classes = [...defaultClasses];

        clickedFab ? classes.push('rotate-icon') : null;

        return classes.join(" ");
    };

    return (
        <StyledRegisterVideo>
            {showFabOptions ? (<div className="fab-container">
                <button onClick={() => setShowFormVideo(true)}>
                    <label className="tooltip">
                        Video
                    </label>
                    <MdOutlineVideoCall />
                </button>
                <button onClick={() => setShowFormPlaylist(true)}>
                    <label className="tooltip">
                        Playlist
                    </label>
                    <MdOutlinePlaylistAdd />
                </button>
            </div>) : false}
            <button className={getClassNamesForButton("add-video")} onClick={() => {
                setShowFabOptions(!showFabOptions);
                setClickedFab(!clickedFab);
            }}>
                <MdAdd />
            </button>

            {showFormVideo ? (<form onSubmit={(e) => {
                e.preventDefault();
                setShowFormVideo(false);
                formVideo.clearForm();
                saveVideo();
            }}>
                <div>
                    <button className="close-modal"  onClick={() => setShowFormVideo(false)}>
                        <MdOutlineClose />
                    </button>
                    <input
                        placeholder="Video title"
                        name="title"
                        value={formVideo.values.title}
                        onChange={formVideo.handleChange} />
                    <input
                        placeholder="URL"
                        name="url"
                        value={formVideo.values.url}
                        onChange={formVideo.handleChange} />
                    <select
                        placeholder="Selecione"
                        name="playlist"
                        onChange={formVideo.handleChange}>
                            <option key={0} value={0}>Selecione --</option>
                            {
                                playlists.map((playlist) => {
                                    return (
                                        <option
                                            key={playlist.id}
                                            value={playlist.id}
                                            selected={formVideo.values.playlist === playlist.id ? true : null}>
                                                {playlist.name}
                                        </option>
                                    );
                                })
                            }
                    </select>
                    {
                        formVideo.values.url ? (
                            <div className="thumbnail">
                                <img src={getYoutubeThumb(formVideo.values.url)} />
                            </div>
                        ) : false
                    }
                    <button type="submit" disabled={
                        formVideo.values.title === ""
                        || formVideo.values.url === ""
                        || formVideo.values.playlist === 0
                        ? true : null
                    }>Submit</button>
                </div>
            </form>) : false}

            {showFormPlaylist ? (<form onSubmit={(e) => {
                e.preventDefault();
                setShowFormPlaylist(false);
                formPlaylist.clearForm();
                savePlaylist();
            }}>
                <div>
                    <button className="close-modal"  onClick={() => setShowFormPlaylist(false)}>
                        <MdOutlineClose />
                    </button>
                    <input
                        placeholder="Playlist name"
                        name="name"
                        value={formPlaylist.values.name}
                        onChange={formPlaylist.handleChange} />
                    <button type="submit" disabled={formPlaylist.values.name === "" ? true : null}>Submit</button>
                </div>
            </form>) : false}
        </StyledRegisterVideo>
    )
}