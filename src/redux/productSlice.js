import { createSlice } from "@reduxjs/toolkit";

const initState = {
     products: [],
     filteredProducts: [],
     categories: [],
     filteredCategory: 'all',
     loading: false,
     error: false
};

const productSlice = createSlice({
     name: 'products',
     initialState: initState,
     reducers: {

          LOADING: (state, action) => {
               return {...state,loading:true};
          },
          
          ERROR: (state, action)=>{
               return {...state, loading: false, error: action.payload};
          },

          FETCH_DATA: (state, action)=>{
               return {...state, loading:false, error: false, products: action.payload}
          },

          UPDATE_CATEGORY_LIST: (state, action) => {
               const newCategories = [...new Set(state.products.map(product => product.category))];
               return {...state, categories: newCategories, loading: false, error: false};
          },

          FILTER_PRODUCTS: (state, action) => {
               const newFilteredProducts = state.products.filter(product => product.category === state.filteredCategory);
               if(newFilteredProducts.length === 0){
                    return {...state, filteredProducts: state.products, filteredCategory: 'all', loading:false, error: false};
               }
               return {...state, filteredProducts: newFilteredProducts, loading: false, error:false};
          },

          UPDATE_FILTERED_CATEGORY: (state, action) => {
               return{...state, filteredCategory: action.payload}
          },

          REMOVE_PRODUCT: (state, action) => {
               const removeDataId = action.payload;
               const NewProducts = state.products.filter(product => product.id !== removeDataId);
               return {...state, products: NewProducts};
          },

          UPDATE_LIKE: (state, action) => {
               const dataChangeIndex = state.products.findIndex(product => product.id === action.payload);
               const thisData = {...state.products[dataChangeIndex]};
               let status = thisData.status;
               if(status === 'none'){
                    thisData.status = 'liked';
                    thisData.likes +=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               } else if(status === 'liked'){
                    thisData.status = 'none';
                    thisData.likes -=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               } else if(status === 'disliked'){
                    thisData.status = 'liked';
                    thisData.likes +=1;
                    thisData.dislikes -=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               }
          },

          UPDATE_DISLIKE: (state, action) => {
               const dataChangeIndex = state.products.findIndex(product => product.id === action.payload);
               const thisData = {...state.products[dataChangeIndex]};
               let status = thisData.status;
               if(status === 'none'){
                    thisData.status = 'disliked';
                    thisData.dislikes +=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               } else if(status === 'disliked'){
                    thisData.status = 'none';
                    thisData.dislikes -=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               } else if(status === 'liked'){
                    thisData.status = 'disliked';
                    thisData.dislikes +=1;
                    thisData.likes -=1;
                    return {...state, products:[...state.products.slice(0, dataChangeIndex), thisData, ...state.products.slice(dataChangeIndex + 1)]}
               }
          }
     }
});

const { actions, reducer } = productSlice;
export const {
     LOADING,
     ERROR,
     FETCH_DATA,
     UPDATE_CATEGORY_LIST,
     FILTER_PRODUCTS,
     UPDATE_FILTERED_CATEGORY,
     UPDATE_LIKE,
     UPDATE_DISLIKE,
     REMOVE_PRODUCT
} = actions;
export default reducer;