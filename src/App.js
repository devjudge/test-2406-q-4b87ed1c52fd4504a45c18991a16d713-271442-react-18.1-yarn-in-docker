import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountries = async () => {
    const res = await fetch('https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json');
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountries();
  }, [searchTerm]);

  const handleSearch = () => {
    const filteredResults = countries.filter(ele => ele.name === searchTerm);
    setCountries(filteredResults);
  };

  return (
    <>
      <h1>Where in the world!</h1>
      <div className="App">
        <div className='input-container'>
          <input className='search-input' placeholder='search for a country...' onChange={(e) => setSearchTerm(e.target.value)} />
          <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
        {countries.length === 0 
          ? (<h1>No country found!</h1>) 
          : (
            <div className='countries'>
              {countries?.map(con => (
                <div className={`country-list-${con.id}`} key={con.id}>
                  <img src={con.flag} alt={con.name} />
                  <div className='country-info'>
                    <h2>{con.name}</h2>
                    <p><strong>Population: </strong>{con.population}</p>
                    <p><strong>Region: </strong>{con.region}</p>
                    <p><strong>Capital: </strong>{con.capital}</p>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </>
  );
}

export default App;
