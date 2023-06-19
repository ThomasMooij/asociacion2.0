import "./pagination.css";
import ReactPaginate from "react-paginate";
import { Suspense} from "react";
import "./pagination.css";
import { useState } from "react";

const Pagination = ({ itemsPerPage, items, LazyCard }) => {
  const [itemOffset, setItemOffset] = useState(0);
  
  if(!items) {
    return  <div>Loading...</div>;
  }else{

    function Items({ currentItems }) {
      return (
        <>
          {currentItems &&
            currentItems.map((item, i) => (
              <Suspense fallback={""}>
                <LazyCard item={item} />
              </Suspense>
            ))}
        </>
      );
    }

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          activeClassName={"pagination__link--active"}
        />
      </>
    );
  }
};

export default Pagination;
