import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Playlist, PlaylistListProps } from "../../interfaces/interface";
import { motion } from "framer-motion";

const PlaylistList: React.FC<PlaylistListProps> = ({ onSelectPlaylist }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("spotifyToken") || ""
  );
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      if (token) {
        setLoading(true); // Set loading state to true
        setError(null); // Reset any previous errors
        try {
          const response = await fetch(
            "https://api.spotify.com/v1/me/playlists",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();

            setPlaylists(data.items);
          } else {
            setError("Failed to fetch playlists: " + response.statusText);
          }
        } catch (error) {
          console.error("Error fetching playlists:", error);
          setError("Error fetching playlists. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPlaylists();
  }, [token]);
  {
    loading && <div>Loading...</div>;
  }
  {
    error && <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      <motion.h1 className="font-rubik text-4xl text-orange-600 font-medium">
        Library
      </motion.h1>
      {!loading && playlists.length > 0 && (
        <ul className="flex gap-4 ">
          {playlists.map((playlist) => (
            <motion.li
              key={playlist.id}
              className="relative flex flex-col items-center p-4 bg-white pb-0 max-w-60  rounded-xl shadow-md transition-transform duration-200 cursor-pointer"
              // whileHover={{ scale: 1.05 }}
              onClick={() => {
                onSelectPlaylist(playlist.id);
              }}
            >
              <img
                src={
                  playlist.images && playlist.images.length > 0
                    ? playlist.images[0].url
                    : "https://via.placeholder.com/300"
                }
                alt={playlist.name}
                className="w-56 h-52 object-cover rounded-t-xl"
              />
              <div className="p-2 text-center   w-full rounded-b-xl">
                <h2 className="text-lg font-semibold text-gray-600 font-rubik">
                  {playlist.name}
                </h2>
                <p className="text-sm text-gray-500 font-rubik">
                  {playlist.tracks.total} tracks
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PlaylistList;
