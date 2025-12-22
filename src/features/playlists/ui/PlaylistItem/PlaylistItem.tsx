import type { PlaylistData } from '../../api/playlistsApi.types';
import { PlaylistCover } from './PlaylistCover/PlaylistCover';
import { PlaylistDescription } from './PlaylistDescription/PlaylistDescription';

type Props = {
  playlist: PlaylistData;
  deletePlaylistHandler: (playlistId: string) => void;
  editPlaylistHandler: (playlist: PlaylistData) => void;
};

export const PlaylistItem: React.FC<Props> = ({
  playlist,
  deletePlaylistHandler,
  editPlaylistHandler,
}) => {
  return (
    <div>
      <PlaylistCover playlist={playlist} />
      <PlaylistDescription playlist={playlist} />
      <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </div>
  );
};
