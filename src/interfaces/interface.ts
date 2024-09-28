export interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  tracks: {
    total: number;
  };
}
export interface PlaylistListProps {
  onSelectPlaylist: (playlistId: string) => void;
}
export interface TrackListProps {
  playlistId: string;
  onClose: () => void;
}

export interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}
