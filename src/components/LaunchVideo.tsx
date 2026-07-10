import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const maxAutoLoops = 33;

type Props = {
  ready: boolean;
};

export function LaunchVideo({ ready }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;

    video.currentTime = 0;
    video.muted = false;
    setMuted(false);
    loopCountRef.current = 0;
    setFinished(false);
    setPlaying(true);

    let gestureEvents: string[] = [];
    const unmuteOnGesture = () => {
      const el = videoRef.current;
      if (!el) return;
      el.muted = false;
      setMuted(false);
      if (el.paused) el.play().catch(() => {});
    };

    video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});

      gestureEvents = ["pointerdown", "keydown", "touchstart", "wheel"];
      gestureEvents.forEach((evt) =>
        window.addEventListener(evt, unmuteOnGesture, { once: true, passive: true })
      );
    });

    return () => {
      gestureEvents.forEach((evt) => window.removeEventListener(evt, unmuteOnGesture));
    };
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
    <section
      id="top"
      className="relative h-[100dvh] min-h-[520px] w-full overflow-hidden bg-[#0a0f2e]"
    >
      <video
        ref={videoRef}
        src="/launch-video.mp4"
        muted={muted}
        playsInline
        preload="auto"
        onEnded={handleEnded}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label="Regrade launch animation with Mr Whale"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f2e]/75 via-transparent to-[#0a0f2e]/25"
        aria-hidden
      />
      <div className="absolute left-1/2 top-[calc(var(--site-header)+1.25rem)] -translate-x-1/2">
        <span className="glass-dark animate-breathe-slow inline-flex items-center gap-2 rounded-full px-4 py-2 font-ui text-[12px] font-semibold uppercase tracking-[0.12em] text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-muted opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-muted" />
          </span>
          Launching very soon
        </span>
      </div>
      <div className="absolute bottom-6 right-5 z-10 flex items-center gap-2.5 sm:bottom-8 sm:right-8">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause video" : "Play video"}
          className="glass-dark inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
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
          className="glass-dark inline-flex h-12 w-12 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
        >
          {muted ? (
            <VolumeX className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Volume2 className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
      </div>
    </section>
  );
}
