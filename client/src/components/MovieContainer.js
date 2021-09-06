import React, { Component } from "react";
import Container from "./Container";
import SearchForm from "./SearchForm";
import ReviewForm from "./ReviewForm";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class MovieContainer extends Component {
  state = {
    result: {},
    search: "",
  };

  searchMovies = (query) => {
    API.search(query)
      .then((res) => this.setState({ result: res.data }))
      .catch((err) => console.log(err));
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search` aka Movie Title
  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

  render() {
    return (
      <Container>
        <div>
          <div size="md-12">
            <div>
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </div>
          </div>
        </div>
        <div className="theMovieRundown">
          <div size="md-12">
            <div heading={this.state.result.Title || "Search here..."}>
              {this.state.result.Title ? (
                <>
                <MovieDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
                <ReviewForm
                title={this.state.result.Title}
                src={this.state.result.Poster}
              />
              </>
              ) : (
                <h3> Search for a Movie to Leave a Review </h3>
              )}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default MovieContainer;
