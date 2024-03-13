import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import Popup from 'devextreme-react/popup';
import { useRecoilState } from 'recoil';
import sampleData from '../../data/sample.json';
import './series.css';
import 'devextreme/dist/css/dx.light.css';
import { seriesState, loadingState, errorState, popupVisibleState, selectedSeriesState } from '../../recoil/recoilState';
import { useLoadPrograms } from '../../hooks/useLoadPrograms';


const Series = () => {
  const [series, setSeries] = useRecoilState(seriesState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibleState);
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesState);

  useLoadPrograms('series');

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{marginLeft: '10vh', fontWeight: 'bold'}} >
            Popular Series
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
            dataSource={series}
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
                  setSelectedSeries({ title, description, releaseYear, images, programType: 'series'});
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
  title={selectedSeries?.title}
  width={400}
  height={550}
>
  
    <div>
      {selectedSeries?.images['Poster Art'] && (
        <img 
          style={{ borderRadius: '10px', alignItems:'center', justifyContent:'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} 
          src={selectedSeries.images['Poster Art'].url} 
          alt={selectedSeries.title} 
        />
      )}
      <p>{selectedSeries?.description}</p>
      <p>{selectedSeries?.releaseYear}</p>
    </div>
</Popup>
    </div>
    
  );
};

export default Series;