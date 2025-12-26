import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import { useGetMeQuery } from '../api/authApi';
import { PlaylistList } from '@/features/playlists/ui/PlaylistList/PlaylistList';
import CreatePlaylistForm from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm';

import s from '@/features/auth/ui/ProfilePage.module.css';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing/Routing';

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery();
  const { data: playlistResponse, isLoading } = useFetchPlaylistsQuery(
    {
      userId: meResponse?.userId,
    },
    { skip: !meResponse?.userId },
  );

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>;
  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />;

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList isPlaylistLoading={isLoading} playlist={playlistResponse?.data || []} />
      </div>
    </div>
  );
};
