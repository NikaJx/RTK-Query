import { getPaginationPages } from '@/common/utils/getPaginationPages';
import s from '@/common/components/Pagination/Pagination.module.css';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageCount: number;
  pageSize: number;
  changePageSizeHandler: (size: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  pageCount,
  setCurrentPage,
  pageSize,
  changePageSizeHandler,
}) => {
  if (pageCount <= 1) return null;

  const pages = getPaginationPages(currentPage, pageCount);

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton
              }
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type="button">
              {page}
            </button>
          ),
        )}
      </div>
      <label>
        Show
        <select value={pageSize} onChange={(e) => changePageSizeHandler(Number(e.target.value))}>
          {[2, 4, 8, 16, 32].map((size) => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
        per page
      </label>
    </div>
  );
};
