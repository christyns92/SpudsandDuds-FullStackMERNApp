import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import FavoriteIcon from '@material-ui/icons/Favorite';
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}));
// const thatssofetchALL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=1f0c12a5a877dc629a002fa2c6169442&language=en-US&page=1&include_adult=false'

const BASE_URL = "https://api.themoviedb.org/3";
const api_key = "1f0c12a5a877dc629a002fa2c6169442";
const getImage = (path) => `https://image.tmdb.org/t/p/w200/${path}`;

export default function SingleLineImageList() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  const api = axios.create({ baseURL: BASE_URL });

  const getNowPlaying = api.get("movie/now_playing", {
    params: { api_key },
  });

  useEffect(() => {
    getNowPlaying.then((res) => {
      setData(res.data.results);
    });
  }, []);

    console.log(data);

    const sendTitle = (value) => {
      console.log(value)
    };

  return (
    <div className={classes.root, "topMovies"}>
      <ImageList className={classes.imageList} cols={5} rowHeight={275}>
        {data.map((movie) => (
          <ImageListItem key={movie.poster_path}>
            <img src={getImage(movie.poster_path)} alt={movie.original_title} value={movie.original_title} onClick={(e) => {sendTitle(movie.original_title)}} />
            <ImageListItemBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton aria-label={`star ${movie.original_title}`}>
                  <FavoriteIcon className={classes.title} />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}