import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isFetching: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isFetching,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !isFetching) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Showing page{" "}
          <span className="font-semibold text-blue-600">{currentPage}</span> of{" "}
          <span className="font-semibold text-blue-600">{totalPages}</span>
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1 || isFetching}
          className="group flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700">Previous</span>
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={`page-${page}-${index}`}>
              {page === "..." ? (
                <span className="px-3 py-2 text-gray-400 text-sm">...</span>
              ) : (
                <button
                  onClick={() => handlePageClick(page as number)}
                  disabled={isFetching}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ease-in-out ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                  } ${
                    isFetching
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {currentPage === page && (
                    <div className="absolute inset-0 bg-blue-600 rounded-xl opacity-20" />
                  )}
                  <span className="relative z-10">{page}</span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || isFetching}
          className="group flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out cursor-pointer"
        >
          <span className="text-sm font-medium text-gray-700">Next</span>
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
