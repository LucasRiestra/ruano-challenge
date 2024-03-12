import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, marginLeft: '10vh', fontWeight: 'bold', [theme.breakpoints.down('sm')]: { fontSize: '1rem', marginLeft: '2vh' } }}>
          DEMO Streaming
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ marginRight: 2, [theme.breakpoints.down('sm')]: { fontSize: '0.8rem' } }}>
            Log in
          </Typography>
          <Button variant="outlined" color="inherit" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' }, border: 'none', marginRight: '10vh', [theme.breakpoints.down('sm')]: { fontSize: '1.5vh', margin: '2vh' } }}>
            Start your free trial
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;