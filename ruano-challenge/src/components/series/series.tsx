import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import Popup from 'devextreme-react/popup';
import { useRecoilState } from 'recoil';
import sampleData from '../../data/sample.json';
import './series.css';
import 'devextreme/dist/css/dx.light.css';
import { popupVisibleState, selectedSeriesState } from '../../recoil/recoilState';
import { useSeries } from '../../hooks/useSeries';
import Filter from '../filter/filter';
import { Link } from 'react-router-dom';

const Series = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibleState);
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesState);
  const { series, loading, error, setSeries } = useSeries(sampleData, currentPage);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{marginLeft: '10vh', fontWeight: 'bold'}} >
            Popular Series
          </Typography>
        </Toolbar>
      </AppBar>
      <Filter items={series} setItems={setSeries} />
      {loading ? (
        <LoadPanel visible={loading} />
      ) : error ? (
        <div>Oops, something went wrong</div>
      ) : (
        <div>
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
                  src={images['Poster Art']?.url || 'https://res.cloudinary.com/dtqgzojs3/image/upload/v1710319130/hs-001sm-motoazada-2-veloc-adel-1-vel-atras-sin-motor_b1bgsz.jpg'}
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
        title={selectedSeries?.title}
        width={400}
        height={550}
      >
        <div>
          {selectedSeries?.images['Poster Art'] && (
            <img 
              style={{ borderRadius: '10px', alignItems:'center', justifyContent:'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} 
              src={(selectedSeries?.images['Poster Art'] && selectedSeries.images['Poster Art'].url) ? selectedSeries.images['Poster Art'].url : 'https://res.cloudinary.com/dtqgzojs3/image/upload/v1710319130/hs-001sm-motoazada-2-veloc-adel-1-vel-atras-sin-motor_b1bgsz.jpg'}
              onError={(e) => {
              e.currentTarget.src = 'https://res.cloudinary.com/dtqgzojs3/image/upload/v1710319130/hs-001sm-motoazada-2-veloc-adel-1-vel-atras-sin-motor_b1bgsz.jpg';
        }}
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