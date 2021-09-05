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
          style={{ border: 'none' }}
        >
          <TopMoviesList />
        </div>
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: 'none', maxwidth: '727px' }}
        >
          <OmdbContainer/>    
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ReviewList
              reviews={reviews}
              title="Recently Reviewed Spuds & Duds"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
