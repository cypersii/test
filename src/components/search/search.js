import React, {useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardActionArea, CardContent, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import './search.css';
// import { useNavigate,Outlet } from 'react-router-dom';



const Search = ()=>{
    const [querySearch, setQuerySearch] = useState('');
    const [shows, setShows] = useState([]);
    // const [searchResults, setSearchResults] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // let link = `/search/${setQuerySearch}`
    // const divert = (event) => {
    //     event.preventDefault();
    //     // const test = `/search/${setQuerySearch}`
    //     console.log(querySearch)
    //     // return querySearch
    //     navigate(`/search`)
    // };

    const handleSearch = async () => {
        try {
          const response = await axios.get(
            `https://api.tvmaze.com/search/shows?q=${querySearch}`
          );
    
          const shows = response.data.map((result) => result);
          console.log(shows)
          setShows(shows);
          setSnackbarOpen(shows.length === 0);
        } catch (error) {
          console.error('Search failed:', error);
        }
      };

      const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      };

    // useEffect(() => {
    //     fetch(`https://api.tvmaze.com/search/shows?q=${querySearch}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setShows(data);
    //       });
    //   }, []);

    return (
        <React.Fragment>
                <div className='top'>
                    <TextField
                        label="Outlined secondary"
                        color="secondary"
                        focused
                        value={querySearch}
                        onChange={e => setQuerySearch(e.target.value)}
                        fullWidth
                    />
                    <Button variant="outlined" color="secondary" type="submit" onClick={handleSearch} >Search</Button>
                </div>

            <Grid container spacing={1}>
                {shows.length===0 ? (
                    <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="info">
                        No results found.
                        </Alert>
                    </Snackbar>
                ): shows.map((show)=>(
                    <Grid item xs={2}>
                        <Card sx={{ maxWidth: 345 ,maxHeight:500}}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={ Object.is(show.show.image,null)? "Null":show.show.image.original}
                                    alt={show.show.name}
                                />
                                <CardContent style={{overflow: "hidden", textOverflow: "ellipsis", width: '11rem' ,height: '20rem'}}>
                                    <Typography gutterBottom variant="h5" component="div">{show.show.name}</Typography>
                                    <Typography noWrap sx={{fontWeight:'light'}}>{show.show.summary}</Typography>
                                    <Typography sx={{fontWeight:'medium'}}>Type: {show.show.type}</Typography>
                                    <Typography sx={{fontWeight:'medium'}}>Language: {show.show.language}</Typography>
                                    <Typography sx={{fontWeight:'medium'}}>Genres: {show.show.genres.join(',')}</Typography>
                                    <Typography sx={{fontWeight:'medium'}}>Status: {show.show.status}</Typography>
                                    <Typography sx={{fontWeight:'medium'}}>Schedule: {show.show.schedule.time},{show.show.schedule.days.join(',')}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>                    
                ))}
            </Grid>

        </React.Fragment>
    )
}

export default Search;