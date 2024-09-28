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
  onTrackSelect: (trackUri: string) => void;
}

// Example Track interface
export interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
  uri: string; // Add this line if it's missing
}
