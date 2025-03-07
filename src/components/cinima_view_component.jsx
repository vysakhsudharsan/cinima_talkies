import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import './cinima_view_component.css';


const Cinima = () => {

  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); 
  };
  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);
    setData(null);

  const requestData = {
    t: searchValue,
    apikey: 'ee3e7d56',
  };

      try {
      // Send the request to the API
      const response = await axios.get('http://www.omdbapi.com', {
        params: requestData,
      });

      if (response.data.Response === 'True') {
        setData(response.data);
      } else {
        setError('Movie not found!');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };    
  return (
    <div> 
      <input
        type="text"
        placeholder="Enter Movie name"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button className='btn_search' onClick={handleSearchClick}>Search</button> 
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {data && (
        <div className="cinema-container">
          {/* Details box on the left */}
          <div className="details-box">
            <h1>
              {data.Title}
              <span>{data.Year}</span>
            </h1>
            <h2>Details</h2>
            <ul>
              <li><strong>Movie name:</strong> {data.Title}</li>
              <li><strong>Year:</strong> {data.Year}</li>
              <li><strong>Director:</strong> {data.Director}</li>
              <li><strong>Writer:</strong> {data.Writer}</li>
              <li><strong>Released:</strong> {data.Released}</li>
              <li><strong>Runtime:</strong> {data.Runtime}</li>
              <li><strong>Genre:</strong> {data.Genre}</li>
              <li><strong>Actors:</strong> {data.Actors}</li>
              <li><strong>Language:</strong> {data.Language}</li>
              <li><strong>Plot:</strong> {data.Plot}</li>
              <li><strong>Country:</strong> {data.Country}</li>
              <li><strong>Awards:</strong> {data.Awards}</li>
              <li><strong>Rated:</strong> {data.Rated}</li>
              <li><strong>IMDb Rating:</strong> {data.imdbRating}</li>
              <li><strong>IMDb Votes:</strong> {data.imdbVotes}</li>
              <li><strong>IMDb ID:</strong> {data.imdbID}</li>
              <li><strong>Type:</strong> {data.Type}</li>
              <li><strong>DVD:</strong> {data.DVD}</li>
              <li><strong>BoxOffice:</strong> {data.BoxOffice}</li>
              <li><strong>Production:</strong> {data.Production}</li>
              <li><strong>Website:</strong> {data.Website}</li>
            </ul>
          </div>

          {/* Poster on the right */}
          <div className="poster">
            <img
              src={data.Poster}
              alt={data.Title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cinima;
