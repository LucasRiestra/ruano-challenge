import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import Popup from 'devextreme-react/popup';
import sampleData from '../../data/sample.json';
import { useRecoilState } from 'recoil';
import 'devextreme/dist/css/dx.light.css';
import { popupVisibleState, selectedMovieState } from '../../recoil/recoilState';
import { useMovies } from '../../hooks/useMovies';
import Filter from '../filter/filter';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibleState);
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);
  const { movies, loading, error, setMovies } = useMovies(sampleData, currentPage);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{marginLeft: '10vh', fontWeight: 'bold'}} >
            Popular Movies
          </Typography>
        </Toolbar>
      </AppBar>
      <Filter items={movies} setItems={setMovies} />
      {loading ? (
        <LoadPanel visible={loading} />
      ) : error ? (
        <div>Oops, something went wrong</div>
      ) : (
        <div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
          <TileView
            dataSource={movies}
            itemRender={({ title, description, releaseYear, images }) => (
              <div
              style={{
                display: 'grid',
                justifyContent: 'center',
                alignItems: 'center',
              }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.5';
                  e.currentTarget.style.border = '1px solid white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.border = '1px solid white';
                }}
                onClick={() => {
                  setSelectedMovie({ title, description, releaseYear, images, programType: 'series'});
                  setPopupVisible(true);
                }}
              >
                <img 
                  className="dx-tile-image" 
                  src={images['Poster Art'].url}
                  onError={(e) => {
                    e.currentTarget.src = 'https://res.cloudinary.com/dtqgzojs3/image/upload/v1710319130/hs-001sm-motoazada-2-veloc-adel-1-vel-atras-sin-motor_b1bgsz.jpg';
                  }}
                  alt={title}
                />
                <div 
                  style={{ textAlign: 'center', marginTop: '0px' }}
                >
                  {title}
                </div>
              </div>
            )}
            width={300 * 5.8}
            height={360 * 4} 
            baseItemHeight={360} 
            baseItemWidth={225}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2vh'}}>
          <Button variant="contained" onClick={() => setCurrentPage(currentPage - 1)} style={{ backgroundColor: '#333', color: '#fff' }}>Previous</Button>
          <Button variant="contained" onClick={() => setCurrentPage(currentPage + 1)} style={{ backgroundColor: '#333', color: '#fff' }}>Next</Button>
        </div>
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          style={{ backgroundColor: '#333', color: '#fff', display: 'flex', justifyContent: 'center', width: '20vh', margin:'0 auto', marginBottom: '6vh'}}
            >
          Back to Home
        </Button>
        </div>
      )}
      <Popup
        visible={popupVisible}
        onHiding={() => setPopupVisible(false)}
        dragEnabled={false}
        closeOnOutsideClick={true}
        showTitle={true}
        title={selectedMovie?.title}
        width={400}
        height={550}
      >
        <div>
          {selectedMovie?.images['Poster Art'] && (
            <img 
              style={{ borderRadius: '10px', alignItems:'center', justifyContent:'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} 
              src={selectedMovie.images['Poster Art'].url} 
              onError={(e) => {
                e.currentTarget.src = 'https://res.cloudinary.com/dtqgzojs3/image/upload/v1710319130/hs-001sm-motoazada-2-veloc-adel-1-vel-atras-sin-motor_b1bgsz.jpg';
              }}
              alt={selectedMovie.title} 
            />
          )}
          <p>{selectedMovie?.description}</p>
          <p>{selectedMovie?.releaseYear}</p>
        </div>
      </Popup>
    </div>
  );
};

export default Movies;