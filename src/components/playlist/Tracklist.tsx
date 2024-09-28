import React, { useEffect, useState } from "react";
import { Playlist, Track, TrackListProps } from "../../interfaces/interface";
import Cookies from "js-cookie";

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
        console.log(playlistId, "playlistId");

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
          console.log(data.items[0], "data");
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
    <div className="w-full h-full bg-gray-100 p-4 shadow-lg overflow-auto max-w-72">
      <button className="text-red-500" onClick={onClose}>
        Close
      </button>
      {loading && <div>Loading tracks...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && tracks.length > 0 && (
        <ul>
          {tracks?.map((track: any) => (
            <div key={track.id} className="">
              <h2>{track.name}</h2>
              <p>
                {track.artists.map((artist: any) => artist.name).join(", ")}
              </p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackList;
