import type { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useUpdatePlaylistMutation } from '../../api/playlistsApi';
import type { UpdatePlaylistArgs } from '../../api/playlistsApi.types';

type Props = {
  playlistId: string | null;
  setPlaylistId: (playlistId: null) => void;
  editPlaylist: (playlist: null) => void;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
};

export const EditPlaylistForm: React.FC<Props> = ({
  playlistId,
  setPlaylistId,
  editPlaylist,
  handleSubmit,
  register,
}) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();

  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {
    if (!playlistId) return;

    updatePlaylist({
      playlistId,
      body: data,
    }).then(() => setPlaylistId(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};
