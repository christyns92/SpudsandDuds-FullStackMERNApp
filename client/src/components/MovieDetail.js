import React from 'react';

function MovieDetail(props) {
  return (
    <div className="row">
    <div className="col-4 text-align-right">
      <img
        alt={props.title}
        className="img-fluid"
        src={props.src}
        style={{ margin: '0 auto' }}
      />
       </div>
        <div className="col-8 text-align-left">
        <h2>{props.title}</h2>
        <h5>Directed By: {props.director}</h5>
        <h5>Genre: {props.genre}</h5>
        <h5>Released: {props.released}</h5>
      </div>
      </div>
      
   
  );
}

export default MovieDetail;
