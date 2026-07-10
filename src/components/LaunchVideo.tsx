import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const maxAutoLoops = 3;

type Props = {
  ready: boolean;
};

export function LaunchVideo({ ready }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, [ready]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    if (!nextMuted) video.play().catch(() => {});
    setMuted(nextMuted);
  }

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
      return;
    }
    if (finished) {
      loopCountRef.current = 0;
      video.currentTime = 0;
      setFinished(false);
    }
    video.play().catch(() => {});
    setPlaying(true);
  }

  function handleEnded() {
    const video = videoRef.current;
    if (!video) return;
    loopCountRef.current += 1;
    if (loopCountRef.current < maxAutoLoops) {
      video.currentTime = 0;
      video.play().catch(() => {});
      return;
    }
    setPlaying(false);
    setFinished(true);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-[var(--site-header)]">
      <div className="relative w-full">
        <video
          ref={videoRef}
          src="/launch-video.mp4"
          muted={muted}
          playsInline
          preload="auto"
          onEnded={handleEnded}
          className="aspect-video max-h-[85vh] w-full object-cover"
          aria-label="Regrade 2.0 launch animation"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/70 via-transparent to-transparent"
          aria-hidden
        />
        <div className="absolute left-1/2 top-6 -translate-x-1/2">
          <span className="glass-dark animate-breathe-slow inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-muted opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-muted" />
            </span>
            Launching very soon
          </span>
        </div>
        <div className="absolute bottom-5 right-5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Pause video" : "Play video"}
            className="glass-dark inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
          >
            {playing ? (
              <Pause className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Play className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="glass-dark inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
          >
            {muted ? (
              <VolumeX className="h-5 w-5" strokeWidth={2} />
            ) : (
              <Volume2 className="h-5 w-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
