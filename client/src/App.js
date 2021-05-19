//Front end set up
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

//Front end Configuration
function App() {

  //Hooks for input management
  const [bookName, setbookName] = useState('');
  const [bookReview, setbookReview] = useState('');
  const [bookReviewList, setbookReviewList] = useState('');
  const [newBookReview, setBookReview] = useState('');

  //Data Handlers
  useEffect(() =>{
    Axios.get('http://localhost:3306/api/get').then((response)=>{
      setbookReviewList(response.data);
    });
  }, []);
  
  const submitReview = () => {
    Axios.post('http://localhost:3306//api/insert', {bookName: bookName, bookReview: bookReview});

    setbookReviewList([...bookReviewList, {bookName: bookName, bookReview: bookReview},
    ]);
  };

  const deleteReview = (book) => {
    Axios.delete(`http://localhost:3306/api/delete/${book}`);
  }

  const updateReview = (book) => {
    Axios.put('http://localhost:3306/api/update', {bookName: book, bookReview: newBookReview});
    setBookReview('')
  }

  //Rendering
  return (
    <div className="App">
      <h1>Book Marker App</h1>
      <div className="form">
        <label>Book Name:</label>
        <input type="text" name="bookName" onChange={(e)=>{setbookName(e.target.value)}}/>
  
        <label>Book Description:</label>
        <input type="text" name="bookReview" onChange={(e)=>{setbookReview,(e.target.value)}}/>
      <button onClick={submitReview}>Submit</button>

      {bookReviewList.map((val)=>{
        return(
          <div className="card">
            <h1>{val.bookName}</h1>
            <p>{val.bookReview}</p>

            <button onClick={() => {deleteReview(val.bookName)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e)=>{setBookReviewList,(e.target.value)}}/>
            <button onClick={() => {updateReview(val.bookName)}}>Update</button>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default App;
