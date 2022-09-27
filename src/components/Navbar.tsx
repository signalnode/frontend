import AccountCircle from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { loadSettings } from '../token_helper';

import { useState } from 'react';
import { logout } from '../requests/authentication';
import { initDB } from '../requests/install';
import { test } from '../requests/test';

function Navbar() {
  const navigate = useNavigate();
  const { accessToken } = loadSettings();

  // const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            <Button onClick={() => initDB()} color="inherit">
              Init DB
            </Button>
            <Button onClick={async () => console.log(await test())} color="inherit">
              Test call
            </Button>
            <IconButton size="large" aria-label="store" onClick={() => navigate('/store')} color="inherit">
              <StoreIcon />
            </IconButton>
            {accessToken ? (
              <>
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
            )}

            <Button component={Link} to="/dashboard" color="inherit">
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
