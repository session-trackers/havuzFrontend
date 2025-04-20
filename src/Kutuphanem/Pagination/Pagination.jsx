import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

const Pagination = ({ itemsPerPage, items, setCurrentItems }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Aktif sayfayı hesapla
  const currentPage = Math.floor(itemOffset / itemsPerPage);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
  }, [itemOffset, items, itemsPerPage, setCurrentItems]);

  useEffect(() => {
    setItemOffset(0); // Filtreleme sonrası ilk sayfaya dön
  }, [items]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      className="paginate"
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage} // Aktif sayfayı belirler
      activeLinkClassName="activePageLink"
      activeClassName="activePage"
      previousClassName="prevButton"
      nextClassName="nextButton"
    />
  );
};

export default Pagination;
