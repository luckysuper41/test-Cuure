import React, { useState,useEffect } from "react";
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { products$ } from './data/products';
import Card from "./components/Card/Card";
import FilterCategory from "./components/FilterCategory/FilterCategory";
import Pagination from "./components/Pagination/Pagination";
import Spinner from "./components/Spinner/Spinner";
import DetailProduct from "./components/DetailProduct/DetailProduct";

import {
  LOADING,
  ERROR,
  FETCH_DATA,
  UPDATE_CATEGORY_LIST,
  FILTER_PRODUCTS,
  UPDATE_FILTERED_CATEGORY,
  UPDATE_LIKE,
  UPDATE_DISLIKE,
  REMOVE_PRODUCT
} from './redux/productSlice';


function App() {
  // dispatch action
  const dispatch = useDispatch();

  // show DetailProduct
  const [showDetailProduct,SetShowDetailProduct] = useState(false);
  const [detailShow,SetDetailShow] = useState();

  // get products from data (in project real - its API)
  useEffect(()=>{
    const getData = async () => {
      dispatch(LOADING());
      try{
        const response = await products$;

        if(!response || response.length === 0){
          console.log("Not Found data");
          return dispatch(ERROR("Not Found data"));
        }

        response.forEach(product => {
          product.status = 'none'
        });

        dispatch(FETCH_DATA(response));
        dispatch(UPDATE_CATEGORY_LIST());
        dispatch(FILTER_PRODUCTS());
      }catch(error){
        console.log(error.message);
        dispatch(ERROR("Get data error"));
      }
    }
    getData();
  }, [dispatch] );

  // get data from redux
  const data = useSelector(state => state.products);

  // actions
  const removeProduct = (id) => {
    dispatch(REMOVE_PRODUCT(id));
    dispatch(UPDATE_CATEGORY_LIST());
    dispatch(FILTER_PRODUCTS());
  }

  const updateFilter = (category) => {
    dispatch(LOADING());
    dispatch(UPDATE_FILTERED_CATEGORY(category));
    dispatch(FILTER_PRODUCTS());
  }

  const updateLike = (id) => {
    dispatch(UPDATE_LIKE(id));
    dispatch(FILTER_PRODUCTS());
  }

  const updateDislike = (id) => {
    dispatch(UPDATE_DISLIKE(id));
    dispatch(FILTER_PRODUCTS())
  }

  // Systeme de Pagination
  const [currentPage, SetCurrentPage] = useState(1);
  const productPerPage = 5;
  //Get current products
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentFilteredProducts = data.filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  // Move to next page
  const pageUp = () => {
    SetCurrentPage(currentPage+1);
  }
  // Move to previous page
  const pageDown = () => {
    SetCurrentPage(currentPage-1);
  }

  // Loading
  if (data.loading) {
    return <Spinner/>;
  }

  return (
    <>
      <FilterCategory 
        categories={data.categories}
        handleUpdateCategory={updateFilter}
      />

      <div className="main-content">
        <h2 className="title-main-content">Welcome !</h2>
        {currentFilteredProducts.map((product)=>(
          <Card
            key={product.id}
            product={product}
            SetDetailShow={SetDetailShow}
            SetShowDetailProduct={SetShowDetailProduct}
            handleRemove={removeProduct}
            handleLike={updateLike}
            handleDislike={updateDislike}
          />
        ))}
      </div>

      {showDetailProduct ? 
        (<DetailProduct 
          product={detailShow}
          SetShowDetailProduct={SetShowDetailProduct} 
        />) 
        : null
      }
      
      <Pagination 
        totalProducts={data.filteredProducts.length}
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
        currentPage={currentPage}
        pageUp={pageUp}
        pageDown={pageDown}
      />

    </>
  );
}

export default App;
