import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import useGenres from '../../hooks/useGenre';

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState();
  const genreForUrl = useGenres(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_genres=${genreForUrl}`);
    // console.log(data);
    setContent(data.results);
    setNoOfPages(data.total_pages);

  }

  useEffect(() => {
    fetchMovies();
  }, [page, genreForUrl])
  
  return (
    <>
      <div className="pageTitle">Movies</div>
      <Genres 
        type='movie'
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
         {
           content && content.map((c) => (
                <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media='movie'
                    vote={c.vote_average}

                />
           ))
         } 
      </div>
      {noOfPages > 1 && (
          <CustomPagination setPage={setPage} noOfPage={noOfPages}/>
        )
      }
    </>
  )
}

export default Movies