import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  }
})

const CustomPagination = ({ setPage, noOfPage = 10 }) => {

  const handlePagination = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10 }}>
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={noOfPage}
          onChange={(e) => handlePagination(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color='primary'
        />
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination