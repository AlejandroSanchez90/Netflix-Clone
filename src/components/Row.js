import './Row.css';
import { useEffect, useState } from 'react';
import CardLoading from './CardLoading';
import axios from '../api/axios';
function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const base_url = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request.data);
      setIsLoading(false);
      return request;
    };

    fetchData();
  }, [fetchUrl]);
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {isLoading ? (
          <CardLoading />
        ) : (
          movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow ? movie?.poster_path : movie.backdrop_path}`}
                  alt=''
                />
              )
          )
        )}
      </div>
    </div>
  );
}

export default Row;
