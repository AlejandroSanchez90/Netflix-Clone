import './Banner.css';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/Request';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    };

    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  return (
    <header
      className='banner'
      style={{
        // backgroundImage: 'url(https://i.imgur.com/e1hLQ2m.png)',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}>
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className='banner__buttons'>
          <button className='banner__button'>play</button>
          <button className='banner__button'>my list</button>
        </div>

        <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
