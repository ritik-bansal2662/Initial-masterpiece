import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  const [movieName, setMovieName] = useState('')
  const [movieReview, setMovieReview] = useState('')
  const [movieReviewList, setMovieReviewList] = useState([])


  useEffect(() => {
    Axios.get('http://localhost:3000/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  },[])

  const submitReview = () => {
    Axios.post('http://localhost:3000/api/insert', {
      movieName : movieName,
      movieReview : movieReview
    }).then(() => {
      alert("successful Insert")
    })

    setMovieReviewList([...movieReviewList, {MovieName: movieName, movieReviews:movieReview}])
  }


  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <div className='form'>
        <label>Movie Name</label>
        <input
          type="text" 
          name="movieName" 
          onChange={(e)=> {
            setMovieName(e.target.value)
          }}
        />
        <label>Review</label>
        <input 
          type="text" 
          name="review" 
          onChange={(e)=> {
            setMovieReview(e.target.value)
          }}
        />
        <button onClick={submitReview}>Submit</button>

        {movieReviewList.map((val) => {
          return <h1>name: {val.MovieName} || review: {val.movieReviews}</h1>
        })}
      </div>
    </div>
  );
}

export default App;
