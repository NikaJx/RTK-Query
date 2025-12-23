import s from '@/features/playlists/ui/PlaylistItem/PlaylistItem.module.css';
import defaultCover from '@/assets/images/default-playlist-cover.png';
import type { ChangeEvent } from 'react';
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/playlistsApi';
import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types';
import { errorToast } from '@/common/utils/errorToast';

type Props = {
  playlist: PlaylistData;
};

export const PlaylistCover: React.FC<Props> = ({ playlist }) => {
  const originalCover = playlist.attributes.images.main.find((img) => img.type === 'original');
  const src = originalCover ? originalCover.url : defaultCover;

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deleteCover] = useDeletePlaylistCoverMutation();

  const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024;
    const allowedTypes = ['iamge/jpeg', 'image/png', 'image/gif'];

    const file = e.target.files?.length && e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      errorToast('ONly jpeg and more');
      return;
    }

    if (file.size > maxSize) {
      errorToast('Size big');
      return;
    }

    uploadPlaylistCover({
      playlistId: playlist.id,
      file,
    });
  };

  const deleteCoverHander = () => {
    deleteCover({ playlistId: playlist.id });
  };
  return (
    <>
      <img src={src} alt="defaultCover" width={'100px'} className={s.cover} />
      <input type="file" accept={'image/jpeg, image/png'} onChange={uploadCoverHandler} />
      {originalCover && <button onClick={() => deleteCoverHander()}>Delete cover</button>}
    </>
  );
};
