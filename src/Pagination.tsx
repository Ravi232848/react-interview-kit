interface paginationProps {
  totalCount: number;
  itemPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  totalCount,
  itemPerPage,
  currentPage,
  setCurrentPage,
}: paginationProps) {
  const totalPages = Math.ceil(totalCount / itemPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages < 8) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const changePage = (newPage: number) => {
    if (newPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {totalPages && (
        <div className="pagination">
          <button
            className="pagination-button"
            disabled={currentPage <= 1}
            onClick={() => changePage(currentPage - 1)}
          >
            Previous
          </button>
          <div>
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={page === currentPage ? "active" : ""}
                disabled={page === "..."}
                onClick={() => changePage(Number(page))}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-button"
            disabled={currentPage >= totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
