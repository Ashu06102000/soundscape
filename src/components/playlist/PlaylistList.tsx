import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Playlist } from "../../interfaces/interface";

const PlaylistList: React.FC = () => {
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
          console.log(response, "re");
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
          setLoading(false); // Set loading state to false
        }
      }
    };

    fetchPlaylists();
  }, [token]);
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && playlists.length > 0 && (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <h2>{playlist.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default PlaylistList;
