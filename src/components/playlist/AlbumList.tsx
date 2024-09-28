import React, { useEffect, useState } from "react";
import { Track, AlbumListType } from "../../interfaces/interface";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";

const AlbumList: React.FC<AlbumListType> = ({
  albumId,
  onClose,
  onTrackSelect,
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const token = Cookies.get("spotifyToken") || "";

  useEffect(() => {
    const fetchTracks = async () => {
      if (!albumId || !token) return;
      console.log(albumId, "albumId");
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/albums/${albumId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setTracks(data.items);
        } else {
          setError("Failed to fetch tracks: " + response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setError("Error fetching tracks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [albumId, token]);
  console.log(tracks, "tracks");
  const handleTrackSelect = (trackUri: string) => {
    const trackId = trackUri.split(":")[2];

    setSelectedTrackId(trackId);
    onTrackSelect(trackUri);
  };

  return (
    <motion.div
      className="w-full bg-white rounded-3xl p-6 shadow-lg  flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex items-center mb-4">
        <h2 className="ml-4 font-bold text-xl">Track List</h2>
      </div>

      {loading && <div className="text-center">Loading tracks...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {!loading && tracks.length > 0 && (
        <ul className="mt-4 space-y-4 tracklist_playlist overflow-auto ">
          {tracks.map((track: any) => (
            <li
              key={track.id}
              className={`flex items-center gap-4 p-4  rounded-lg hover:bg-gray-200 cursor-pointer ${
                selectedTrackId === track.id ? "bg-orange-600" : "bg-gray-100"
              }`}
              onClick={() => {
                handleTrackSelect(track.uri);
              }}
            >
              <div className="flex flex-col">
                <h3
                  className={`text-lg font-semibold ${
                    selectedTrackId === track.id ? "text-white" : "text-black"
                  }`}
                >
                  {track.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedTrackId && (
        <div className=" p-4 bg-white shadow-lg">
          <Spotify
            wide
            link={`https://open.spotify.com/track/${selectedTrackId}`}
          />
        </div>
      )}
    </motion.div>
  );
};

export default AlbumList;
