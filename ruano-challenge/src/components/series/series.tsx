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

interface PosterArt {
  url: string;
  width: number;
  height: number;
}

export interface Entry {
  title: string;
  description: string;
  programType: string;
  images: {
    'Poster Art': PosterArt;
  };
  releaseYear: number;
}

const Series = () => {
  const [series, setSeries] = useRecoilState(seriesState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);
  const [popupVisible, setPopupVisible] = useRecoilState(popupVisibleState);
  const [selectedSeries, setSelectedSeries] = useRecoilState(selectedSeriesState);

  useEffect(() => {
    const checkImage = (url: string) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });

    const loadSeries = async () => {
      const sortedEntries = sampleData.entries
        .filter((item: Entry) => item.programType === 'series' && item.releaseYear >= 2010)
        .sort((a: Entry, b: Entry) => a.title.localeCompare(b.title));

      const data: Entry[] = [];
      for (const item of sortedEntries) {
        const imageExists = await checkImage(item.images['Poster Art'].url);
        if (imageExists) {
          data.push(item);
        }
      }
      setSeries(data);
      setLoading(false);
    };

    loadSeries();
  }, [setSeries, setLoading]);

  
  console.log(popupVisible);

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
        <div style={{display: 'grid', justifyContent: 'center', alignItems: 'center'}}> 
          <TileView className='dx-tile-view'
            dataSource={series}
            itemRender={({ title, description, releaseYear, images }) => (
              <div
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
            width={225 * 4}
            height={360 * 4} 
            baseItemHeight={360} 
            baseItemWidth={225}
            itemMargin={10}
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
  height={700}
>
  {selectedSeries && (
    <div>
      <img style={{ borderRadius: '10px', alignItems:'center', justifyContent:'center', width: '39vh', height: '49vh' }} src={selectedSeries?.images['Poster Art'].url} alt={selectedSeries.title} />
      <p>{selectedSeries?.description}</p>
      <p>{selectedSeries?.releaseYear}</p>
    </div>
  )}
</Popup>
    </div>
    
  );
};

export default Series;