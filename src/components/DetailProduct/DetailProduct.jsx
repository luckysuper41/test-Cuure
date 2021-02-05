import React from 'react';
import './DetailProduct.css';
import PropTypes from 'prop-types';

export default function DetailProduct(props) {
     const {
          product,
          SetShowDetailProduct
     } = props;

     const handleClick = () =>{
          SetShowDetailProduct(false);
     }

     return (
          <div className="modal">
               <div className="product-box">
                    <img className="product-image" src={product.image} alt={product.title} />
                    <div className="product-id">Id: #{product.id}</div>
                    <div className="product-title">{product.title}</div>
                    <div className="product-category">{product.category}</div>
                    
                    <div className="product-price">{product.price}</div>
                    <div className="product-full">
                         <hr/>
                         <h2>Description:</h2>
                         {product.description_full} 
                    </div>     
                    <div className="product-close">
                         <button
                              className="button-close"
                              type="button"
                              onClick={handleClick}
                         >Close</button>
                    </div>
               </div>
          </div>
          
     )
}

DetailProduct.propTypes = {
     product: PropTypes.object,
     SetShowDetailProduct: PropTypes.func,
};

DetailProduct.defaultProps = {
     product: null,
     SetShowDetailProduct: null,
}