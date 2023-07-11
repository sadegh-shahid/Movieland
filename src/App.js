import { useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import Movieland from './images/Movieland.png';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
function App() {

  const [inputValue, setInputValue] = useState("")

  const [movies, setMovies] = useState([])
  const [clicked, setClicked] = useState(false)
  const changeSearch = (event) => {
    setInputValue(event.target.value)
  }

  const searchIt = () => {
    console.log("message");
    if (inputValue) {
      fetch(`http://www.omdbapi.com/?s=${inputValue}&apikey=e341f2c3`)

        .then(response => {
          return response.json()
        })

        .then(response => {
          console.log(response)
          response.Response === "True" ?
            setMovies(response.Search)
            : setMovies([])
            ;

        })
      setClicked(true)
    }

    else alert("Please enter the name")
  }


  return (
    <div className="app">

      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center">
        <Box component="img" src={Movieland} alt='logo' className='logo' sx={{ my: 2}}>

        </Box>
        <Box component="div" className="search" sx={{ my: 2}}>
        <input type="text" placeholder='Search for movie' value={inputValue} onChange={event => changeSearch(event)} />
   
          <SearchIcon onClick={searchIt}></SearchIcon>

</Box>

        <div className="search">
          <input type="text" placeholder='Search for movie' value={inputValue} onChange={event => changeSearch(event)} />
          <img src={SearchIcon} alt="SearchIcon" onClick={searchIt} />

        </div>
      </Grid>






      <div className="container">
        {movies.length > 0 ? (movies.map(movie => {
          return <MovieBox movie={movie}></MovieBox>
        }))
          : (clicked ? <div className="empty">
            <h2>No movie found</h2>
          </div> : <></>)
        }
      </div>



    </div>
  );
}

export default App;
