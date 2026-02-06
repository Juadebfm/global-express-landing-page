import React, { useState } from "react";
import { blogPosts } from "../components/blogData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BlogPosts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // 2 rows × 3 columns
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="mt-12 md:mt-16 lg:mt-24 px-6 md:px-12 lg:px-24">
      <h4 className="font-bold text-xl md:text-2xl mb-8">Recent blog posts</h4>

      {/* Blog Grid - 2 rows × 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {currentPosts.map((post) => (
          <div key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-44 md:h-52 object-cover rounded-lg lg:rounded-none"
            />

            <p className="text-[#FF6600] text-[11px] mt-3 font-semibold">
              {post.date}
            </p>

            <h6 className="text-base md:text-lg font-semibold mt-2 line-clamp-2">
              {post.title}
            </h6>

            <p className="mt-2 text-sm text-[#C0C5D0] line-clamp-3">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              {post.tags.map((tag, index) => (
                <button
                  key={index}
                  className={`${tag.color} ${tag.bgColor} px-2.5 py-0.5 rounded-2xl`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-12 lg:mt-16">
        {/* Previous */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous"
          className={`${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:text-black"
          } transition`}
        >
          <FaArrowLeft size={28} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={index} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 md:px-4 py-2 rounded-lg ${
                  currentPage === pageNumber
                    ? "bg-[#FF6600] text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next"
          className={`${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:text-black"
          } transition`}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BlogPosts;
