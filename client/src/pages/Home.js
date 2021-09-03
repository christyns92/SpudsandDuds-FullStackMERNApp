import React from 'react';
import { useQuery } from '@apollo/client';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import TopMoviesList from '../components/TopMoviesList';
import MovieCard from '../components/MovieCard/index'
import OmdbContainer from '../components/OmdbContainer';
import { QUERY_REVIEWS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];

  return (
    <main>
      <div className="flex-row justify-center">
      <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <TopMoviesList />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a', maxwidth: '727px;' }}
        >
          <ReviewForm />

        </div>

        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a', maxwidth: '727px;' }}
        >
          <OmdbContainer/>
          
        </div>

        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >

          <MovieCard />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ReviewList
              reviews={reviews}
              title="Some Feed for Review(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
