import { AccountCircle as AccountCircleIcon, Store as StoreIcon, Extension as ExtensionIcon, House as DashboardIcon, ContentCut } from '@mui/icons-material';
import { AppBar, Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';

import { Link, useNavigate } from 'react-router-dom';
import { loadSettings } from '../utils/token-helper';

import { useState } from 'react';
import { initDB, logout, test } from '../requests';

function Navbar({ toggleDashboardMode }: { toggleDashboardMode: () => void }) {
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
            {accessToken ? (
              <>
                <IconButton size="large" aria-label="dashboard" onClick={() => navigate('/dashboard')} color="inherit">
                  <DashboardIcon />
                </IconButton>
                <IconButton size="large" aria-label="devices" onClick={() => navigate('/devices')} color="inherit">
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
                  <Divider sx={{ my: 0.5 }} />

                  <MenuItem onClick={() => navigate('/dashboard/edit')}>
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit Dashboard</ListItemText>
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
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
