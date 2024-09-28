import React, { useState } from "react";
import PlaylistList from "./PlaylistList";
import TrackList from "./Tracklist";
import { motion } from "framer-motion";

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  return (
    <div className="relative w-full flex h-screen">
      {/* PlaylistList section */}
      <motion.div
        className="h-full"
        initial={{ width: "100%" }}
        animate={{ width: selectedPlaylist ? "70%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <PlaylistList
          onSelectPlaylist={(playlistId) => setSelectedPlaylist(playlistId)}
        />
      </motion.div>

      {/* TrackList section sliding in from the right */}
      {selectedPlaylist && (
        <motion.div
          className="h-full"
          initial={{ width: "0%" }}
          animate={{ width: "30%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <TrackList
            playlistId={selectedPlaylist}
            onClose={() => setSelectedPlaylist(null)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Playlist;
