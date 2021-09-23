import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const Foods = () => {
  const enableSearch = (
    useSelector(({ functionsReducer }) => functionsReducer.enableSearch)
  );

  return (
    <div>
      <Header />
      {enableSearch && <SearchBar />}
      <Footer />
    </div>
  );
};

export default Foods;
