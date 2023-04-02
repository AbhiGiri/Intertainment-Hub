import React, { useEffect, useState } from 'react'
import { Button, createTheme, Tab, Tabs, TextField } from '@mui/material'
import { ThemeProvider } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';

const Search = () => {
  const [type, setType] = useState(0)
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('');
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState();
  
  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      color: 'white'
    }
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    setContent(data.results);
    setNoOfPages(data.total_pages)
  }

  useEffect(() => {
    fetchSearch();
  }, [type, page])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{display: 'flex', margin: '15px 0', padding: '0 36px'}}>
          <TextField 
              style={{flex: 1 }}
              className="searchBox"
              label="Search"
              variant='filled'
              onChange={(e) => setSearchText(e.target.value)}
          />
          <Button variant="contained"  onClick={fetchSearch}>
            <SearchIcon />
          </Button>
        </div>
        <Tabs 
          value={type} 
          indicatorColor="primary" 
          textColor='primary'
          style={{paddingBottom: 5}}
          onChange={(event, newValue) => {
            setType(newValue)
            setPage(1)
          }}>
          <Tab style={{ width: "50%"}} label="Search Movies"/>
          <Tab style={{ width: "50%"}} label="Search Tv Series"/>
        </Tabs>
      </ThemeProvider>
      <div className="trending">
         {
           content && content.map((c) => (
                <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media={type ? 'tv' : 'movie'}
                    vote={c.vote_average}
                />
           ))
         } 
         {searchText && 
          !content && (
            type ? <h2>No Series Found.</h2> : <h2>No Movie Found.</h2>
          )
         }
      </div>
      {noOfPages > 1 && (
          <CustomPagination setPage={setPage} noOfPage={noOfPages}/>
        )
      }
    </div>
  )
}

export default Search