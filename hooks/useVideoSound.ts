// hooks/useVideoSound.ts
"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UseVideoSoundReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  isMuted: boolean;
  isPlaying: boolean;
  toggleSound: () => void;
  togglePlay: () => void;
}

export function useVideoSound(): UseVideoSoundReturn {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true); // autoplay impose muted
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync état playing avec les événements natifs de la vidéo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Toggle mute/unmute
  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {
        // Autoplay policy : silently fail
      });
    } else {
      video.pause();
    }
  }, []);

  return { videoRef, isMuted, isPlaying, toggleSound, togglePlay };
}
