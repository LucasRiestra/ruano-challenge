import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import sampleData from '../../data/sample.json';
import './series.css';
import 'devextreme/dist/css/dx.light.css';

interface PosterArt {
  url: string;
  width: number;
  height: number;
}

interface Entry {
  title: string;
  description: string;
  programType: string;
  images: {
    'Poster Art': PosterArt;
  };
  releaseYear: number;
}

interface Data {
  total: number;
  entries: Entry[];
}

const Series = () => {
  const [series, setSeries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          data.push({
            ...item,
            images: {
              'Poster Art': {
                ...item.images['Poster Art'],
                url: item.images['Poster Art'].url
              }
            }
          });
        }
      }
      setSeries(data);
      setLoading(false);
    };
  
    loadSeries();
  }, []);

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
        <div>Error loading data</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}> 
          <TileView
            dataSource={series}
            itemRender={({ title, images }) => (
              <div 
                className="dx-tile-image" 
                style={{ 
                  backgroundImage: `url(${images['Poster Art'].url})`,
                }}
              >
                {title}
              </div>
            )}
            height={360 * 2} 
            baseItemHeight={335} 
            baseItemWidth={225}
            itemMargin={10}
          />
        </div>
      )}
    </div>
  );
};

export default Series;