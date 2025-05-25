import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [comments, setComments] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

  const openPopup = (comment) => {
    setSelectedComment(comment);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setSelectedComment(null);
  };

  useEffect(() => {
    axios.get('/api/comments')
      .then((res) => { setComments(res.data) })
      .catch((err) => { console.log(err); });
  }, []);

  return (
    <>
   <h1><center> ~dM's Application </center></h1>
      <h1>Read all comments</h1>
      <h3>Total comments: {comments.length}</h3>

      <div className="container">
        {isOpen && selectedComment && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                &times;
              </button>
              <h2>Id: {selectedComment.id}</h2>
              <p>{selectedComment.body}</p>
            </div>
          </div>
        )}
        {comments.map((comment) => (
          <div className="card" key={comment.id}>
            <h3>Post Id: {comment.postId}</h3>
            <p>Id: {comment.id}</p>
            <h2>Name: <span style={{ fontSize: "15px", fontWeight: "bold" }}>{comment.name}</span></h2>
            <h4>Email: <a href={`mailto:${comment.email}`}>{comment.email}</a></h4>
            <div style={{ textAlign: "center", marginTop: '5px' }}>
              <button className="open-btn" onClick={() => openPopup(comment)}>Read comment</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
