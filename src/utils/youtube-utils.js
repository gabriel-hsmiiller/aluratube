export function getYoutubeThumb(url) {
    const id = getYoutubeVideoID(url);
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYoutubeVideoID(url) {
    const videoID = url.split("v=")[1];
    const ampersandPosition = videoID?.indexOf("&") ?? -1;
    if (ampersandPosition !== -1) {
        return videoID.substring(0, ampersandPosition);
    }
    return videoID;
}
