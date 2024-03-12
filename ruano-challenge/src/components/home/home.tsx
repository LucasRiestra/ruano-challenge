import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LoadPanel from 'devextreme-react/load-panel';
import './home.css';

interface CardData {
  id: number;
  text: string;
  image: string;
  subtitle: string;
  location: string;
}

const cardData: CardData[] = [
  { 
    id: 1,
    text: 'SERIES',
    image: '/assets/placeholder.png',
    subtitle: 'Popular Series',
    location: '/series',
  },
  { 
    id: 2,
    text: 'MOVIES',
    image: './placeholder.png',
    subtitle: 'Popular Movies',
    location: '/movies',
  },
];

const TileViewItem: React.FC<{ data: CardData }> = ({ data }) => (
  
    <div className='tile-wrapper'>
      <Link to={data.location}>
      <div 
        className='tile-item'
        style={{ 
          backgroundImage: `url(${data.image})`,
          backgroundSize: 'cover',
          backgroundColor: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2em',
          fontWeight: 'bold',
        }}
      >
        {data.text}
      </div>
      </Link>
      <div className='tile-subtitle'>
        {data.subtitle}
      </div>
    </div>
  
);

const Home = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" sx={{marginLeft: '10vh', fontWeight: 'bold'}} >
            Popular Titles
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='tile-container'>
        {cardData.map((item) => (
          <TileViewItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;