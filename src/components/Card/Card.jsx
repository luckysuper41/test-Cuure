import React from 'react';
import './Card.css';
import Button from "../Button/Button";
import PropTypes from 'prop-types';

export default function Card(props) {
     const {
          product,
          handleRemove,
          handleLike,
          handleDislike,
          SetDetailShow,
          SetShowDetailProduct
     } = props;

     return (
          <div className="card-box">
               <img className="card-image" src={product.image} alt={product.title} />
               <div className="card-like-dislike">
                    <div className="ele-like-dislike">
                         <Button
                              content={<i className="fas fa-heart"></i>}
                              handleClick = {()=>handleLike(product.id)}
                              className={product.status === "liked" ? "button-like active":"button-like"}
                              type="button"
                         />
                         <span>{product.likes}</span>
                    </div>
                    <div className="ele-like-dislike">
                         <Button
                              content={<i className="fas fa-heart-broken"></i>}
                              handleClick = {()=>handleDislike(product.id)}
                              className={product.status === "disliked" ? "button-dislike active":"button-dislike"}
                              type="button"
                         />
                         <span>{product.dislikes}</span>
                    </div>
               </div>
               <div className="card-remove">
                    <Button
                         content="X"
                         handleClick = {()=>handleRemove(product.id)}
                         className="button-remove"
                         type="button"
                    />
               </div>
               <div className="card-title">
                    <button 
                         className="full-product"
                         type="button"
                         onClick={()=>{
                              SetDetailShow(product);
                              SetShowDetailProduct(true);
                         }}
                    >
                         {product.title}
                    </button>
               </div>
               <div className="card-category">{product.category}</div>
               
               <div className="card-price">{product.price}</div>
               <div className="card-brief">
                    {product.description_brief} 
                    <button 
                         className="full-detail"
                         type="button"
                         onClick={()=>{
                              SetDetailShow(product);
                              SetShowDetailProduct(true);
                         }}
                    >
                         More detail
                    </button>
               </div>
               
               
          </div>
     )
}

Card.propTypes = {
     product: PropTypes.object,
     handleRemove: PropTypes.func,
     handleLike: PropTypes.func,
     handleDislike: PropTypes.func,
     SetShowDetailProduct: PropTypes.func,
     SetDetailShow: PropTypes.func
};

Card.defaultProps = {
     product: null,
     handleRemove: null,
     handleLike: null,
     handleDislike: null,
     SetShowDetailProduct: null,
     SetDetailShow: null
}