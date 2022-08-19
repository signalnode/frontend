import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useReducer } from 'react';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../token_helper';
import AuthenticationReducer from '../authentication/AuthenticationReducer';

function Navbar() {
  // const [authState, dispatch] = useReducer(AuthenticationReducer, {});

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOMENODE
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button onClick={() => console.log(getAccessToken())} color="inherit">
              Token
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
