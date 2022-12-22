import { supabase } from "../utils/supabase-utils";

const TABLE_NAME = 'video';

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from(TABLE_NAME).select("*");
        },
        insertVideo(video) {
            return supabase.from(TABLE_NAME).insert(video).select("*");
        }
    }
}