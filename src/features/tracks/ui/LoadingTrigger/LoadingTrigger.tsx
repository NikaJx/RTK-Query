import type { RefObject } from 'react';

type Props = {
  observerRef: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
};

export const LoadingTrigger: React.FC<Props> = ({ isFetchingNextPage, observerRef }) => {
  return (
    <div ref={observerRef}>
      {isFetchingNextPage ? (
        <div>Loading more tracks...</div>
      ) : (
        <div style={{ height: '20px' }}></div>
      )}
    </div>
  );
};
