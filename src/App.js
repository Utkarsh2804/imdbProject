import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

import "./App.css";




function App() {

  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currPage, setcurrPage] = useState(1);
  const [searchMovie, setsearchMovie] = useState([])

  // Data Fetching from API
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55903b004b65252bf433fb4218601d2c&language=en-US&sort_by=popularity.desc&page=${page}&vote_average.gte=8.4`)
      .then(res => res.json())
      .then(res => setState([...state, ...res.results]))

  }, [page]);


  const scrollToEnd = () => {
    console.log('Downnn')
    setPage(page + 1)

  }


  // Get Movies to display on UI

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)

        setsearchMovie([...searchMovie, ...data.results]);
        setcurrPage(data.page);

      })
  }
  
  // Search filter 
  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) {
      const endpoint =
        `https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&query=${searchTerm}&page=${currPage}`;

      setState([])

      getMovies(endpoint);

    }
    else {
      <h1>No Movie Found</h1>
    }
  }

  // Infinite Scrolling 
  window.onscroll = function () {

    if (searchTerm !== '' &&
      document.documentElement.scrollTop + document.documentElement.clientHeight
      >= document.documentElement.scrollHeight
    ) {
      //console.log('Bottom')
      const endpoint =
        `https://api.themoviedb.org/3/search/movie?api_key=55903b004b65252bf433fb4218601d2c&query=${searchTerm}&page=${currPage + 1}`;

      getMovies(endpoint);
    }


    if (searchTerm === '' && document.documentElement.scrollTop + document.documentElement.clientHeight
      >= document.documentElement.scrollHeight) {
      //console.log('Neww')
      scrollToEnd()

    }

  };

  const handleOnChange = (event) => {
    if (searchTerm === '') {
      setsearchMovie([])
      setcurrPage(1)
    }

    setSearchTerm(event.target.value);
  };



  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>


      <div className="movie-container">
        {state.length > 0 &&
          state.map((movie) => <MovieCard key={movie.id} {...movie} />)
        }


      </div>
      <div className="movie-container">



        {searchMovie.length > 0 &&
          searchMovie.map((movie) => <MovieCard key={movie.id} {...movie} />)
        }

      </div>

      {
        searchMovie.length === 0 && searchTerm !== '' &&
        <div className="Found">
          <h1> No Movie Found</h1>
        </div>
      }

    </>
  )

}

export default App;