import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  playlist: PlaylistData;
};

export const PlaylistDescription: React.FC<Props> = ({ playlist }) => {
  return (
    <>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
    </>
  );
};
