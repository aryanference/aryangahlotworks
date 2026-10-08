"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipBack, SkipForward, Play, Pause, ExternalLink } from "lucide-react";
import {
  MUSIC,
  spotifyPlaylistId,
  youtubePlaylistId,
  type Track,
} from "@/data/music";
import { DockGlyph } from "./DockIcons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { YoutubeIcon } from "@/components/icons";

function AlbumArt({ size = 64 }: { size?: number }) {
  if (MUSIC.cover) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={MUSIC.cover}
        alt={`${MUSIC.playlistName || "Playlist"} cover`}
        className="rounded-lg object-cover shadow-md"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="overflow-hidden rounded-lg shadow-md"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <DockGlyph app="music" />
    </div>
  );
}

/** YouTube playlist mode: the embed IS the player. */
function YouTubeBody({ playlistId }: { playlistId: string }) {
  return (
    <>
      <iframe
        title="On Rotation — YouTube playlist"
        src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`}
        className="h-[158px] w-full rounded-lg border-0"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="relative mt-3 flex items-center gap-2">
        <span className="truncate text-[13px] font-semibold">
          {MUSIC.playlistName || "Playlist"}
          {MUSIC.curator ? <span className="font-normal opacity-85"> · {MUSIC.curator}</span> : null}
        </span>
      </div>
    </>
  );
}

/** Custom track-list mode (used when you define tracks in data/music.ts). */
function TrackListBody({
  tracks,
  current,
  onPick,
}: {
  tracks: Track[];
  current: number;
  onPick: (i: number, hasPreview: boolean) => void;
}) {
  const hasPlaylist = Boolean(MUSIC.playlistUrl);
  return (
    <>
      <div className="relative flex gap-3">
        <AlbumArt />
        <ol className="min-w-0 flex-1 space-y-1">
          {tracks.slice(0, 5).map((t, i) => (
            <li key={`${t.title}-${i}`}>
              <button
                type="button"
                onClick={() => onPick(i, Boolean(t.previewUrl))}
                className={`flex w-full items-baseline gap-1.5 truncate text-left text-[12px] leading-snug ${
                  i === current ? "font-bold" : "text-white/80 hover:text-white"
                }`}
              >
                <span className="w-3 shrink-0 text-right text-[10px] tabular-nums opacity-70">
                  {i + 1}
                </span>
                <span className="truncate">
                  {t.title}
                  {t.artist ? <span className="opacity-70"> — {t.artist}</span> : null}
                </span>
              </button>
            </li>
          ))}
        </ol>
        {hasPlaylist && (
          <a
            href={MUSIC.playlistUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open playlist"
            className="absolute right-0 top-0 rounded-full bg-white/15 p-1.5 backdrop-blur hover:bg-white/25"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
      <div className="relative mt-3 flex items-center gap-2">
        <span className="truncate text-[13px] font-semibold">
          {MUSIC.playlistName || "Playlist"}
          {MUSIC.curator ? <span className="font-normal opacity-85"> · {MUSIC.curator}</span> : null}
        </span>
      </div>
    </>
  );
}

export default function MusicWidget() {
  const platform = MUSIC.playlistUrl
    ? MUSIC.platform
    : ("none" as typeof MUSIC.platform | "none");
  const ytId = useMemo(
    () => (platform === "youtube" ? youtubePlaylistId(MUSIC.playlistUrl) : null),
    [platform],
  );
  const spotifyId = useMemo(
    () => (platform === "spotify" ? spotifyPlaylistId(MUSIC.playlistUrl) : null),
    [platform],
  );
  const [preview, setPreview] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = MUSIC.tracks;
  const track = tracks[current];
  const usesTrackList = platform === "spotify" || (!ytId && tracks.length > 0);

  /* Real playback only when a track actually has a preview URL. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !usesTrackList) return;
    if (playing && track?.previewUrl) {
      audio.src = track.previewUrl;
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, track, usesTrackList]);

  const step = (dir: 1 | -1) => {
    if (!tracks.length) return;
    setCurrent((c) => (c + dir + tracks.length) % tracks.length);
  };

  const isYoutube = platform === "youtube" && ytId;

  return (
    <motion.section
      aria-label="On Rotation music player"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="pointer-events-auto absolute bottom-5 right-4 hidden w-[300px] overflow-hidden rounded-2xl md:block"
    >
      <div className="dock-glass rounded-2xl p-2.5">
        {/* Header */}
        <div className="flex items-center justify-between px-1 pb-2">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.18em]">
            {MUSIC.title}
          </h3>
          {MUSIC.playlistUrl ? (
            <MagneticButton
              variant="ghost"
              size="sm"
              strength={0.25}
              glow={false}
              className="!px-2 !py-0.5 text-[10px] font-bold uppercase tracking-[0.14em]"
              onClick={() => window.open(MUSIC.playlistUrl, "_blank", "noopener")}
            >
              Open
            </MagneticButton>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
              Open
            </span>
          )}
        </div>

        {/* Body — cover-tinted panel */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#E5234E] via-[#C2185B] to-[#7B1FA2] p-3 text-white">
          <div aria-hidden className="absolute inset-0 bg-black/15" />

          {isYoutube ? (
            <YouTubeBody playlistId={ytId} />
          ) : usesTrackList ? (
            <TrackListBody
              tracks={tracks}
              current={current}
              onPick={(i, hasPreview) => {
                setCurrent(i);
                setPlaying(hasPreview);
              }}
            />
          ) : (
            <div className="relative flex flex-col items-center gap-2 rounded-lg border border-dashed border-white/35 px-3 py-6 text-center">
              <div className="h-12 w-12 overflow-hidden rounded-lg">
                <DockGlyph app="music" />
              </div>
              <p className="text-[11px] leading-snug text-white/85">
                No playlist yet. Add your link and tracks to{" "}
                <code className="rounded bg-black/25 px-1">data/music.ts</code>.
              </p>
            </div>
          )}

          {/* Spotify inline preview (spotify platform only) */}
          {usesTrackList && spotifyId && (
            <AnimatePresence initial={false}>
              {preview && (
                <motion.div
                  key="embed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative mt-3"
                >
                  <iframe
                    title="Spotify playlist preview"
                    src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`}
                    className="h-[220px] w-full rounded-lg border-0"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 px-1 pt-2.5">
          {usesTrackList ? (
            <>
              {spotifyId ? (
                <button
                  type="button"
                  onClick={() => setPreview((p) => !p)}
                  className="mr-auto rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-black shadow hover:bg-white"
                >
                  Preview
                </button>
              ) : (
                <span className="mr-auto text-[10px] text-muted">—</span>
              )}

              <div className="flex items-center gap-0.5" aria-label="Playback controls">
                <button
                  type="button"
                  aria-label="Previous track"
                  disabled={!tracks.length}
                  onClick={() => step(-1)}
                  className="rounded-full p-1.5 hover:bg-black/10 disabled:opacity-35 dark:hover:bg-white/10"
                >
                  <SkipBack size={15} />
                </button>
                {track?.previewUrl ? (
                  <button
                    type="button"
                    aria-label={playing ? "Pause" : "Play"}
                    onClick={() => setPlaying((p) => !p)}
                    className="rounded-full bg-white p-1.5 text-black shadow hover:opacity-90"
                  >
                    {playing ? <Pause size={15} /> : <Play size={15} />}
                  </button>
                ) : (
                  <span
                    title={
                      tracks.length
                        ? "Add previewUrl to tracks in data/music.ts to enable playback"
                        : undefined
                    }
                    className="rounded-full bg-white/85 p-1.5 text-black shadow opacity-60"
                    aria-hidden
                  >
                    <Play size={15} />
                  </span>
                )}
                <button
                  type="button"
                  aria-label="Next track"
                  disabled={!tracks.length}
                  onClick={() => step(1)}
                  className="rounded-full p-1.5 hover:bg-black/10 disabled:opacity-35 dark:hover:bg-white/10"
                >
                  <SkipForward size={15} />
                </button>
              </div>
            </>
          ) : (
            isYoutube && (
              <span className="mr-auto flex items-center gap-1 text-[10px] text-muted">
                <YoutubeIcon size={12} /> via YouTube
              </span>
            )
          )}

          {MUSIC.playlistUrl ? (
            <MagneticButton
              variant="primary"
              size="sm"
              strength={0.3}
              glow={false}
              aria-label="Open playlist"
              className="!h-8 !w-8 !rounded-full !p-0"
              onClick={() => window.open(MUSIC.playlistUrl, "_blank", "noopener")}
            >
              {isYoutube ? <YoutubeIcon size={14} /> : <ExternalLink size={14} />}
            </MagneticButton>
          ) : (
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-black opacity-45"
              aria-hidden
            >
              <ExternalLink size={14} />
            </span>
          )}
        </div>

        {/* Hidden audio for real preview playback in track-list mode */}
        <audio ref={audioRef} onEnded={() => setPlaying(false)} />
      </div>
    </motion.section>
  );
}
