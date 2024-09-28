import React, { useEffect, useState } from "react";
import { Playlist, Track, TrackListProps } from "../../interfaces/interface";
import Cookies from "js-cookie";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoChevronForwardCircleSharp } from "react-icons/io5";
import { motion } from "framer-motion";

const TrackList: React.FC<TrackListProps> = ({ playlistId, onClose }) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("spotifyToken") || "";

  useEffect(() => {
    const fetchTracks = async () => {
      if (!playlistId || !token) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const trackItems = data.items.map((item: any) => item.track); // Extract tracks from items
          setTracks(trackItems);
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
  }, [playlistId, token]);

  return (
    <motion.div
      className="w-full bg-white rounded-3xl p-6 shadow-lg overflow-auto tracklist_playlist flex flex-col"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <h2 className="ml-4 font-bold text-xl">Track List</h2>
      </div>

      {/* Loading & Error States */}
      {loading && <div className="text-center">Loading tracks...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}

      {/* Track List */}
      {!loading && tracks.length > 0 && (
        <ul className="mt-4 space-y-4">
          {tracks.map((track: any) => (
            <li
              key={track.id}
              className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-16 h-16 rounded-md"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{track.name}</h3>
                <p className="text-sm text-gray-600">
                  {track.artists.map((artist: any) => artist.name).join(", ")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default TrackList;
