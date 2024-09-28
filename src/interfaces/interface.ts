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
export interface AlbumListProps {
  onSelectAlbum: (albumId: string) => void;
  onClose: () => void;
}
export interface TrackListProps {
  playlistId: string;
  onClose: () => void;
  onTrackSelect: (trackUri: string) => void;
}
export interface AlbumListType {
  albumId: string | null;
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
export interface AlbumState {
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
    }>;
    total_tracks: number;
  };
}
export interface AlbumProps {
  items: AlbumState[]; // Expecting an array of Album objects
}
