import { AccountCircle as AccountCircleIcon, Store as StoreIcon, Extension as ExtensionIcon, House as DashboardIcon } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { loadSettings } from '../utils/token-helper';

import { useState } from 'react';
import { initDB, logout, test } from '../requests';

function Navbar() {
  const navigate = useNavigate();
  const { accessToken } = loadSettings();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = async () => {
    await logout();
    setAnchorEl(undefined);
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
            SIGNALNODE
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Button onClick={() => initDB()} color="inherit">
              Init DB
            </Button>
            <Button onClick={async () => console.log(await test())} color="inherit">
              Test call
            </Button>
            {accessToken ? (
              <>
                <IconButton size="large" aria-label="dashboard" onClick={() => navigate('/dashboard')} color="inherit">
                  <DashboardIcon />
                </IconButton>
                <IconButton size="large" aria-label="addons" onClick={() => navigate('/addons')} color="inherit">
                  <ExtensionIcon />
                </IconButton>
                <IconButton size="large" aria-label="store" onClick={() => navigate('/store')} color="inherit">
                  <StoreIcon />
                </IconButton>
                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                  <AccountCircleIcon />
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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
