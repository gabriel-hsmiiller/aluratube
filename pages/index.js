import styled from 'styled-components';
import config from '../config.json';
import { CSSReset } from '../src/components/css-reset';
import { StyledTimeline } from '../src/components/timeline';

function HomePage() {
    const homePageStyle = {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    };

    return (
        <>
            <CSSReset />
            <div style={homePageStyle}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    );
}

export default HomePage

function Menu() {
    return (
        <div>
            Menu
        </div>
    )
}

const StyledHeader = styled.div`
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
function Header() {
    return (
        <StyledHeader>
            <section className="user-info">
                <img src={`https://github.com/${config.dev.github}.png`} />
                <div>
                    <span>{config.dev.name}</span>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {

    const { playlists } = props;
    const playlistNames = Object.keys(playlists);

    return (
        <StyledTimeline>
            {
                playlistNames.map((name, index) => {
                    const videos = playlists[name];
                    return (
                        <section key={index}>
                            <h2>{name}</h2>
                            <div>
                                {
                                    videos.map((item, index) => {
                                        return (
                                            <a key={index} href={item.url}>
                                                <img src={item.thumb}></img>
                                                <span>{item.title}</span>
                                            </a>
                                        );
                                    })
                                }
                            </div>
                        </section>
                    );
                })
            }
        </StyledTimeline>
    )
}