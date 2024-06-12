import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemList from '../../components/Item';
import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('isLogin');
  console.log(JSON.parse(isLogin));

  useEffect(() => {
    if (isLogin === null) {
      navigate('/login');
    }
  }, [navigate,isLogin]);

  const onLogout = ()=>{
    localStorage.removeItem("isLogin");
    navigate("/login")
  }

  return (
    <div className='home-container'>
      <div className='nav-bar'>
      <h1>Home</h1>
      <div>
      <button type='button' className='modal-button' onClick={onLogout}>Logout</button>
      </div>
      </div>
      <div>
        <ItemList />
      </div>
    </div>
  );
};

export default Home;
