import React, { useState } from "react";
import PlaylistList from "./PlaylistList";
import { motion } from "framer-motion";
import TrackList from "./Tracklist";
import SoundScapePlayer from "../../player/SountScapePlayer";
import Cookies from "js-cookie";
import Album from "./Album";
import AlbumList from "./AlbumList";

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);

  const handleTrackSelect = (trackUri: string) => {
    setSelectedTrackUri(trackUri);
  };

  return (
    <div className="relative justify-between flex w-full">
      <div className="flex w-3/4 gap-4 flex-col">
        <PlaylistList
          onSelectPlaylist={(playlistId) => setSelectedPlaylist(playlistId)}
        />
        <Album onSelectAlbum={(albumId) => setSelectedAlbum(albumId)} />
      </div>
      <div className="w-1/4">
        <motion.div
          className="w-full h-full"
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
          {selectAlbum && (
            <AlbumList
              albumId={selectAlbum}
              onClose={() => setSelectedAlbum(null)}
              onTrackSelect={handleTrackSelect}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Playlist;
