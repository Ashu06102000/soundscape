import React, { useState } from "react";
import PlaylistList from "./PlaylistList";
import { motion } from "framer-motion";
import TrackList from "./Tracklist";
// import SoundScapePlayer from "../../player/SountScapePlayer";
// import Cookies from "js-cookie";
// import Album from "./Album";
// import AlbumList from "./AlbumList";

const Playlist = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  // const [selectAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null);

  const handleTrackSelect = (trackUri: string) => {
    setSelectedTrackUri(trackUri);
  };

  return (
    <div className="relative justify-between flex w-full">
      <div className="flex gap-4 flex-col">
        <PlaylistList
          onSelectPlaylist={(playlistId) => setSelectedPlaylist(playlistId)}
        />

        {/* <Album
          onClose={() => setSelectedPlaylist(null)}
          onSelectAlbum={(albumId) => setSelectedAlbum(albumId)}
        /> */}
      </div>

      {selectedPlaylist && (
        <TrackList
          playlistId={selectedPlaylist}
          onClose={() => setSelectedPlaylist(null)}
          onTrackSelect={handleTrackSelect}
        />
      )}
    </div>
  );
};

export default Playlist;
