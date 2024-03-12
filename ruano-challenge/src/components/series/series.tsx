import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import LoadPanel from 'devextreme-react/load-panel';
import TileView from 'devextreme-react/tile-view';
import sampleData from '../../data/sample.json';

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

const SeriesImage = (data: Entry) => (
  <div 
    className="dx-tile-image" 
    style={{ backgroundImage: `url(${data.images['Poster Art'].url})` }}
  >
    {data.title}
  </div>
);

const Series = () => {
  const [series, setSeries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const data = sampleData.entries
      .filter((item: Entry) => item.programType === 'series' && item.releaseYear >= 2010)
      .sort((a: Entry, b: Entry) => a.title.localeCompare(b.title))
      .slice(0, 20)
      .map(item => ({
        ...item,
        images: {
          'Poster Art': {
            ...item.images['Poster Art'],
            url: item.images['Poster Art'].url
          }
        }
      }));
    setSeries(data);
    setLoading(false);
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
        <TileView
          items={series}
          itemRender={SeriesImage}
        />
      )}
    </div>
  );
};

export default Series;