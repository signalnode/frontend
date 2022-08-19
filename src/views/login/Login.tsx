import { Box, Button, Checkbox, Container, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Enviroment from '../../enviroment';
import { setAccessToken, setRefreshToken } from '../../token_helper';

type AuthenticationResponse = { accessToken: string; refreshToken: string };

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const body = JSON.stringify({ username: formData.get('username'), password: formData.get('password') });

    const res = await fetch(`${Enviroment.BACKEND_URL}/authenticate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });

    if (res.status !== 200) return;

    const data = (await res.json()) as AuthenticationResponse;

    console.log(data);

    setAccessToken(data.accessToken);
    setRefreshToken(data.refreshToken);

    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoComplete="username" autoFocus />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
