import React, { useEffect, useState } from "react";

interface SoundScapePlayerProps {
  token: string;
  trackUri: string | null;
}

const SoundScapePlayer: React.FC<SoundScapePlayerProps> = ({
  token,
  trackUri,
}) => {
  const [player, setPlayer] = useState<any>(null); // Store player instance
  const [isReady, setIsReady] = useState<boolean>(false); // Track if player is ready

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    script.onload = () => {
      console.log("Spotify SDK loaded");
      window.onSpotifyWebPlaybackSDKReady = () => {
        const newPlayer = new window.Spotify.Player({
          name: "SoundScape Player",
          getOAuthToken: (cb: any) => {
            cb(token);
          },
          volume: 0.5,
        });

        newPlayer.addListener("ready", ({ device_id }: any) => {
          console.log("Ready with Device ID", device_id);
          setIsReady(true); // Player is ready
        });

        newPlayer.addListener("not_ready", ({ device_id }: any) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Error handling
        newPlayer.addListener("initialization_error", ({ message }: any) => {
          console.error("Initialization error:", message);
        });
        newPlayer.addListener("authentication_error", ({ message }: any) => {
          console.error("Authentication error:", message);
        });
        newPlayer.addListener("account_error", ({ message }: any) => {
          console.error("Account error:", message);
        });

        setPlayer(newPlayer); // Save player instance
        newPlayer.connect();
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [token]);

  // Play the selected track when the URI changes and the player is ready
  useEffect(() => {
    if (player && isReady && trackUri) {
      player.resume().then(() => {
        player
          .play({
            uris: [trackUri], // Play the selected track
          })
          .then(() => {
            console.log("Playing track:", trackUri);
          })
          .catch((error: any) => {
            console.error("Error playing track:", error);
          });
      });
    }
  }, [player, isReady, trackUri]); // Ensure to include all dependencies

  return (
    <div id="spotify-player" style={{ width: "100%", height: "80px" }}>
      <button id="togglePlay">Toggle Play</button>
    </div>
  );
};

export default SoundScapePlayer;
