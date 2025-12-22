import s from '@/features/playlists/ui/PlaylistList/PlaylistList.module.css';
import { EditPlaylistForm } from '../EditPlaylistForm/EditPlaylistForm';
import { PlaylistItem } from '../PlaylistItem/PlaylistItem';
import type { PlaylistData, UpdatePlaylistArgs } from '../../api/playlistsApi.types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDeletePlaylistMutation } from '../../api/playlistsApi';

type Props = {
  playlist: PlaylistData[];
  isPlaylistLoading: boolean;
};

export const PlaylistList: React.FC<Props> = ({ isPlaylistLoading, playlist }) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [deletePlaylist] = useDeletePlaylistMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure want to delete the playlist?')) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((tag) => tag.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.items}>
      {!playlist?.length && !isPlaylistLoading && <h2>Playlist not found</h2>}
      {playlist?.map((playlist) => {
        const isEditing = playlist.id === playlistId;

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                handleSubmit={handleSubmit}
                register={register}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylistHandler={deletePlaylistHandler}
                editPlaylistHandler={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
