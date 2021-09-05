import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import ReviewForm from "./ReviewForm";
// import PotatoRating from "./PotatoRating/PotatoRating";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class MovieContainer extends Component {
  state = {
    result: {},
    search: "",
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.searchMovies("Good Burger");
  }

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

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
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
            <div
              heading={this.state.result.Title || "Search for a Movie to Begin"}
            >
              {this.state.result.Title ? (
                <MovieDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
              ) : (
                <h3> No Results to Display </h3>
              )}
              <ReviewForm
                title={this.state.result.Title}
                src={this.state.result.Poster}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default MovieContainer;
