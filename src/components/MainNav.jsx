import * as React from 'react';
import {BottomNavigation, Box} from '@mui/material';
import {BottomNavigationAction} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
      backgroundColor: "#2d313a",
      zIndex: 100,
    },
  });

export default function SimpleBottomNavigation() {
  const classes = useStyles();  
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Link to="/"><BottomNavigationAction style={{ color: "white" }}  label="Trending" icon={<WhatshotIcon />} /></Link>
        <Link to="/movies"><BottomNavigationAction style={{ color: "white" }} label="Movies" icon={<MovieIcon />} /></Link>
        <Link to="/series"><BottomNavigationAction style={{ color: "white" }} label="Series" icon={<TvIcon />} /></Link>
        <Link to="/search"><BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} /></Link>
        
      </BottomNavigation>
    </Box>
  );
}