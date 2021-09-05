import React from 'react';

function MovieDetail(props) {
  return (
    <div className="row">
    <div className="col-12 col-sm-12 text-align-center">
      <img
        alt={props.title}
        className="img-fluid"
        src={props.src}
        style={{ margin: '0 auto' }}
      />
       </div>
        <div className="col-12col-sm-12 text-align-center">
        <h2>{props.title}</h2>
        <h5>Directed By: {props.director}</h5>
        <h5>Genre: {props.genre}</h5>
        <h5>Released: {props.released}</h5>
      </div>
      </div>
      
   
  );
}

export default MovieDetail;
