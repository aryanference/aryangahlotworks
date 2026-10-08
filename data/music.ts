export type MusicPlatform = "youtube" | "spotify";

export interface Track {
  title: string;
  artist?: string;
  /** Optional preview mp3 for the custom track-list mode. */
  previewUrl?: string;
  url?: string;
}

/**
 * "On Rotation" music widget.
 *
 * platform "youtube": embeds the playlist player inline (simplest, fully real).
 * platform "spotify": OPEN/Spotify buttons link out; tracks render as the
 *   custom list; per-track playback works when a track has previewUrl.
 */
export const MUSIC = {
  title: "On Rotation",
  playlistName: "", // optional display name, e.g. "Epic Scores"
  curator: "Aryan Gahlot",
  platform: "youtube" as MusicPlatform,
  playlistUrl: "https://youtube.com/playlist?list=PLbmltpj78-3s",
  cover: "", // optional square image in /public for the track-list mode
  tracks: [] as Track[],
};

export function youtubePlaylistId(url: string): string | null {
  const m = url.match(/[?&]list=([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

export function spotifyPlaylistId(url: string): string | null {
  const m = url.match(/playlist\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}
