import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  AlbumProps,
  AlbumState,
  AlbumListProps,
} from "../../interfaces/interface";
import { motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";

const Album: React.FC<AlbumListProps> = ({ onSelectAlbum, onClose }) => {
  const [savedAlbums, setSavedAlbums] = useState<AlbumState[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string>();
  const [token, setToken] = useState<string | null>(
    Cookies.get("spotifyToken") || ""
  );

  useEffect(() => {
    if (!token) return;
    const fetchSavedAlbums = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.spotify.com/v1/me/albums`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data: AlbumProps = await response.json(); // Explicitly type the response

          setSavedAlbums(data.items); // Store saved albums
        } else {
          setError(`Failed to fetch saved albums: ${response.statusText}`);
          console.error("Failed to fetch saved albums:", response.statusText);
        }
      } catch (error: any) {
        setError(`Error fetching saved albums: ${error.message}`);
        console.error("Error fetching saved albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedAlbums();
  }, [token]);

  return (
    <div className="flex flex-col gap-8">
      <motion.h1 className="font-rubik text-4xl text-orange-600 font-medium">
        Library
      </motion.h1>
      {loading && <p>Loading albums...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && savedAlbums.length > 0 && (
        <ul className="flex gap-4">
          {savedAlbums.map((album) => (
            <motion.li
              key={album.album.id}
              className="relative flex flex-col items-center p-4 bg-white pb-0 max-w-60 rounded-xl shadow-md transition-transform duration-200 cursor-pointer"
              onClick={() => {
                setSelectedAlbum(album.album.id);
                onSelectAlbum(album.album.id);
                onClose();
              }}
            >
              <img
                src={
                  album.album.images && album.album.images.length > 0
                    ? album.album.images[0].url
                    : "https://via.placeholder.com/300"
                }
                alt={album.album.name}
                className="w-56 h-52 object-cover rounded-t-xl"
              />
              <div className="p-2 text-center w-full rounded-b-xl">
                <h2 className="text-lg font-semibold text-gray-600 font-rubik">
                  {album.album.name}
                </h2>
                <p className="text-sm text-gray-500 font-rubik">
                  {album.album.total_tracks} tracks
                </p>
              </div>
            </motion.li>
          ))}
          <Spotify link={`https://open.spotify.com/album/${selectedAlbum}`} />
        </ul>
      )}
    </div>
  );
};

export default Album;
