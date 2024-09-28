// src/global.d.ts
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any; // or a more specific type if you have one
  }
}

export {};
