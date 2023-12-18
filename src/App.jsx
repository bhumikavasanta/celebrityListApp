import React, { useState, useEffect } from 'react';
import User from './components/User';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://run.mocky.io/v3/e83076cb-5fe8-45cd-be9e-7de44a049cf4');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchData(data.filter((x) => x.first.toLowerCase().includes(searchTerm.toLowerCase())
    || x.first.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, data]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="centered-container">
      <div className="app-container">
        List App
      </div>
      <div className='searchDiv'>
        <SearchBar
          searchTerm={searchTerm}
          handleInputChange={handleInputChange}
        />
      </div>
      {
        data?.length === 0 && <div className="no-result">
          Loading...
          </div>
      }
      {
        searchTerm !== "" && searchData?.length === 0 && <div className="no-result">
          No Results Found!!
          </div>
      }
      {data.map((item, index) => (
          <User
            key={index}
            item={item}
            searchTerm={searchTerm}
          />
        ))}
    </div>
  );
}

export default App;
