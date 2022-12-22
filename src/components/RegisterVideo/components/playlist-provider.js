import React from "react";

export const PlaylistContext = React.createContext({
    playlist: {},
    playlistId: {},
    setPlaylist: () => { console.error("Configure setPlaylist!") },
    setPlaylistId: () => { console.error("Configure setPlaylist!") },
});

export default function PlaylistProvider({children, playlistInitialValue, playlistIdInitialValue}) {
    const [playlist, setPlaylist] = React.useState(playlistInitialValue);
    const [playlistId, setPlaylistId] = React.useState(playlistIdInitialValue);

    return (
        <PlaylistContext.Provider value={{ playlist, setPlaylist, playlistId, setPlaylistId }}>
            {children}
        </PlaylistContext.Provider>
    );
}