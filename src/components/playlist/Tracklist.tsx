import React from "react";
import { TrackListProps } from "../../interfaces/interface";

import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";

const TrackList: React.FC<TrackListProps> = ({
  playlistId,
  onClose,
  onTrackSelect,
}) => {
  return (
    <motion.div
      className=" bg-white  rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center mt-auto mb-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex items-center mb-4">
        <h2 className="ml-4 font-bold text-xl">Track List</h2>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full w-96"
      >
        <Spotify
          style={{
            width: "100%",
            maxHeight: "700px",
            minHeight: "700px",
          }}
          className="fade-in"
          link={`https://open.spotify.com/playlist/${playlistId}?autoplay=true`}
        />
      </motion.div>
    </motion.div>
  );
};

export default TrackList;
