import React, { useEffect } from "react";

const SoundScapePlayer: React.FC<{ token: string }> = ({ token }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      console.log("Spotify SDK loaded");
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "SoundScape Player",
          getOAuthToken: (cb: any) => {
            cb(token);
          },
          volume: 0.5,
        });

        player.addListener("ready", ({ device_id }: any) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }: any) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Error handling
        player.addListener("initialization_error", ({ message }: any) => {
          console.error("Initialization error:", message);
        });
        player.addListener("authentication_error", ({ message }: any) => {
          console.error("Authentication error:", message);
        });
        player.addListener("account_error", ({ message }: any) => {
          console.error("Account error:", message);
        });

        player.connect();
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  return (
    <div id="spotify-player" style={{ width: "100%", height: "80px" }}>
      <button id="togglePlay">Toggle Play</button>
    </div>
  );
};

export default SoundScapePlayer;
