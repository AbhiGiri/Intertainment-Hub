import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import SimpleBottomNavigation from './components/MainNav';
import Trending from './pages/Trending/Trending';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';
import Search from './pages/Search/Search';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <SimpleBottomNavigation />
      </div>
    </Router>
  )
}

export default App;