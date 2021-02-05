import React from 'react';
import './FilterCategory.css';
import PropTypes from 'prop-types';

export default function SearchCategory(props) {
     const {
          categories, 
          handleUpdateCategory
     } = props;
     return (
          <div className="search-bar">
               <span className="search-category">Category:</span>
               <select 
                    className="select" 
                    onChange={event => handleUpdateCategory(event.target.value)}
               >
                    <option value='all'>All categories</option>
                    {categories.map(category => 
                    <option 
                         key={category} 
                         value={category}
                    >
                         {category}
                    </option>
                    )}
               </select>
          </div>
     )
}

SearchCategory.propTypes = {
     categories: PropTypes.array, 
     handleUpdateCategory: PropTypes.func
};

SearchCategory.defaultProps = {
     categories: null, 
     handleUpdateCategory: null
}