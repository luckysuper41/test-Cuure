import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';

export default function Login(props) {

     const {
          setLogin,
          setUserName,
          userName
     } = props;

     const handleSubmit = (event) => {
          event.preventDefault();
          if(userName){
               setLogin(true);
          }else{
               alert('Fill your name');
          }
     }

     return (
          <div className="login">
               <div className='joinInnerContainer'>
                    <h1 className="heading">Login</h1>
                    <form onSubmit={(event)=>handleSubmit(event)}>
                         <input 
                              placeholder="UserName" 
                              className="loginInput" 
                              type="text" 
                              onChange={
                                   (event) => setUserName(event.target.value)
                              } 
                         />
                         <button 
                              className="button-login" 
                              type="submit"
                         >
                              Enter
                         </button>
                    </form>
               </div>
          </div>
     )
}

Login.propTypes = {
     setLogin: PropTypes.func,
     setUserName: PropTypes.func,
     userName: PropTypes.string
};

Login.defaultProps = {
     setLogin: null,
     setUserName: null,
     userName: null
}