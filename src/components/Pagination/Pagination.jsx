import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';

export default function Pagination(props) {
     const {
          totalProducts,
          indexOfFirstProduct,
          indexOfLastProduct,
          currentPage,
          pageUp,
          pageDown
     } = props;
     return (
          <div className="pagination">
               <p className="detail">{indexOfFirstProduct + 1} - {indexOfLastProduct} of {totalProducts}</p>
               <div className="button-page-up-down">
                    <button 
                         className="button-page"
                         disabled={currentPage > 1 ? false : true} 
                         onClick={() => pageDown()}
                    >
                         &#8249;
                    </button>
                    <button
                         className="button-page"
                         disabled={indexOfLastProduct >= totalProducts ? true : false}
                         onClick={() => pageUp()} 
                    >
                         &#8250;
                    </button>
               </div>
        </div>
     )
}

Pagination.propTypes = {
     totalProducts: PropTypes.number,
     indexOfFirstProduct: PropTypes.number,
     indexOfLastProduct: PropTypes.number,
     currentPage: PropTypes.number,
     pageUp: PropTypes.func,
     pageDown: PropTypes.func
};

Pagination.defaultProps = {
     totalProducts: null,
     indexOfFirstProduct: null,
     indexOfLastProduct: null,
     currentPage: null,
     pageUp:null,
     pageDown: null
}