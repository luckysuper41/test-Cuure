import React from 'react';
import './Button.css';
import PropTypes from 'prop-types';

export default function Button(props) {
     const {
          content, 
          handleClick, 
          className, 
          type, 
     } = props;
     return (
          <>
               <button 
                    onClick={handleClick}
                    className={className}
                    type={type}
               >
                    {content}
               </button>
          </>
     )
}

Button.propTypes = {
     content: PropTypes.any,
     type: PropTypes.string,
     className: PropTypes.string,
     handleClick: PropTypes.func,
};

Button.defaultProps = {
     content: null,
     type: null,
     className: null,
     handleClick: null,
}