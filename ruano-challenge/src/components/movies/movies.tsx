import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import Popup from 'devextreme-react/popup';
import { useRecoilState } from 'recoil';
import sampleData from '../../data/sample.json';
import 'devextreme/dist/css/dx.light.css';
import { movieState, loadingState, errorState, popupVisibleState, selectedMovieState } from '../../recoil/recoilState';
import { Entry } from '../../interfaces/interfaces';
import { useLoadPrograms } from '../../hooks/useLoadPrograms';

const Movies = () => {
  const [movies, setMovies] = useRecoilState(movieState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibleState);
  const [selectedMovie, setSelectedMovie] = useRecoilState(selectedMovieState);

  useLoadPrograms('movie');
  
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{marginLeft: '10vh', fontWeight: 'bold'}} >
            Popular Movies
          </Typography>
        </Toolbar>
      </AppBar>
      {loading ? (
        <LoadPanel visible={loading} />
      ) : error ? (
        <div>Oops, something went wrong</div>
      ) : (
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
                  e.currentTarget.style.border = 'none';
                }}
                onClick={() => {
                  setSelectedMovie({ title, description, releaseYear, images, programType: 'series'});
                  setPopupVisible(true);
                }}
              >
                <img 
                  className="dx-tile-image" 
                  src={images['Poster Art'].url}
                  alt={title}
                />
                <div 
                  style={{ textAlign: 'center', marginTop: '0px' }}
                >
                  {title}
                </div>
              </div>
            )}
            width={285 * 5}
            height={360 * 4} 
            baseItemHeight={360} 
            baseItemWidth={225}
          />
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