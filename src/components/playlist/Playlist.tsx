import React, { useState } from "react";
import PlaylistList from "./PlaylistList";
import { motion } from "framer-motion";
import TrackList from "./Tracklist";
import SoundScapePlayer from "../../player/SountScapePlayer";
import Cookies from "js-cookie";

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);

  const handleTrackSelect = (trackUri: string) => {
    setSelectedTrackUri(trackUri);
  };

  return (
    <div className="relative w-full">
      <PlaylistList
        onSelectPlaylist={(playlistId) => setSelectedPlaylist(playlistId)}
      />

      <motion.div
        className="absolute top-0 right-0 h-full"
        initial={{ x: "100%" }}
        animate={{ x: selectedPlaylist ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {selectedPlaylist && (
          <TrackList
            playlistId={selectedPlaylist}
            onClose={() => setSelectedPlaylist(null)}
            onTrackSelect={handleTrackSelect}
          />
        )}
      </motion.div>

      {/* SoundScapePlayer to play selected track */}
      <SoundScapePlayer
        token={Cookies.get("spotifyToken") || ""}
        trackUri={selectedTrackUri}
      />
    </div>
  );
};

export default Playlist;
