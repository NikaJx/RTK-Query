import { useInfiniteScroll } from '@/common/hooks/useInfinityScroll';
import { useFetchTracksInfiniteQuery } from '../api/tracksApi';
import { TracksList } from './TracksList/TracksList';
import { LoadingTrigger } from './LoadingTrigger/LoadingTrigger';

export const TracksPage = () => {
  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchTracksInfiniteQuery();

  const pages = data?.pages.map((page) => page.data).flat() || [];

  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetching });

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={pages} />
      {hasNextPage && (
        <LoadingTrigger isFetchingNextPage={isFetchingNextPage} observerRef={observerRef} />
      )}
      {!hasNextPage && pages.length > 0 && <p>Nothing</p>}
      {/* {!isLoading && (
        <>
          {hasNextPage ? (
            <button onClick={loadMoreHandler} disabled={isFetching}>
              {isFetchingNextPage ? 'Loading' : 'Load more'}
            </button>
          ) : (
            <p>Nothing more to load</p>
          )}
        </>
      )} */}
    </div>
  );
};
