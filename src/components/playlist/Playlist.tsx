import React, { useState } from "react";
import PlaylistList from "./PlaylistList";
import { motion } from "framer-motion";
import TrackList from "./Tracklist";
import SoundScapePlayer from "../../player/SountScapePlayer";
import Cookies from "js-cookie";
import Album from "./Album";

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);

  const handleTrackSelect = (trackUri: string) => {
    setSelectedTrackUri(trackUri);
  };

  return (
    <div className="relative justify-between flex w-full">
      <PlaylistList
        onSelectPlaylist={(playlistId) => setSelectedPlaylist(playlistId)}
      />
      <Album
        onSelectPlaylist={function (playlistId: string): void {
          throw new Error("Function not implemented.");
        }}
      />

      <motion.div
        className="w-1/4 h-full"
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
    </div>
  );
};

export default Playlist;
