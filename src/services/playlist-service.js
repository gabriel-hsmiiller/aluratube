import { supabase } from "../utils/supabase-utils";

const TABLE_NAME = 'playlist';

export function playlistService() {
    return {
        getAllPlaylists() {
            return supabase.from(TABLE_NAME).select("*");
        },
        insertPlaylist(playlist) {
            return supabase.from(TABLE_NAME).insert(playlist).select("*");
        },
        updatePlaylist(playlist, id) {
            return supabase.from(TABLE_NAME).update(playlist).eq('id', id).select();
        },
        deletePlaylist(id) {
            return supabase.from(TABLE_NAME).delete().eq('id', id);
        }
    }
}