import { useFetchPlaylistsQuery } from '../api/playlistsApi';
import s from '@/features/playlists/ui/PlaylistsPage.module.css';
import CreatePlaylistForm from './CreatePlaylistForm/CreatePlaylistForm';

import { useState, type ChangeEvent } from 'react';
import { useDebounceValue } from '@/common/hooks/useDebounceValue';
import { Pagination } from '@/common/components/Pagination/Pagination';
import { PlaylistList } from './PlaylistList/PlaylistList';

export const PlaylistsPage = () => {
  const [search, setSearch] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const debounceSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize: pageSize,
  });

  const changePageSizeHandler = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  if (isLoading) return <h1>Skeleton loader...</h1>;

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="text" placeholder="Search" onChange={(e) => searchPlaylistHandler(e)} />
      <PlaylistList playlist={data?.data || []} isPlaylistLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        pageCount={data?.meta.pagesCount || 1}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        changePageSizeHandler={changePageSizeHandler}
      />
    </div>
  );
};
