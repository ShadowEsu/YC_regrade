import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

const maxAutoLoops = 2;

type Props = {
  ready: boolean;
};

export function LaunchVideo({ ready }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopCountRef = useRef(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;

    loopCountRef.current = 0;
    setFinished(false);
    setMuted(true);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.currentTime = 0;

    const tryPlay = () => {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [ready]);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    }
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
    video.play().then(() => setPlaying(true)).catch(() => {});
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
      id="launch-video"
      className="border-b border-blue/10 bg-[#0a0f2e] py-[clamp(40px,6vw,72px)]"
    >
      <div className="mx-auto w-full max-w-[880px] px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
          <p className="font-ui text-[12px] font-bold uppercase tracking-[0.12em] text-[#9db5ff]">
            Watch · 60 seconds
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-ui text-[11px] font-semibold text-white/90">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9db5ff] opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#9db5ff]" />
            </span>
            Launching soon
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[20px] border border-white/15 bg-black shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)] sm:rounded-[24px]">
          <div className="aspect-video">
            <video
              ref={videoRef}
              src="/launch-video.mp4"
              muted={muted}
              playsInline
              preload="metadata"
              autoPlay
              onEnded={handleEnded}
              className="h-full w-full object-cover"
              aria-label="Regrade launch video with Mr Whale"
            />
          </div>

          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 sm:bottom-4 sm:right-4">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? "Pause video" : "Play video"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue/95 text-white transition-transform duration-300 hover:scale-105 sm:h-11 sm:w-11"
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Play className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue/95 text-white transition-transform duration-300 hover:scale-105 sm:h-11 sm:w-11"
            >
              {muted ? (
                <VolumeX className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Volume2 className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
