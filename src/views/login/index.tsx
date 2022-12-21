import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../requests/authentication';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // TODO: Validate formData
    const username = formData.get('username')!.toString();
    const passphrase = formData.get('passphrase')!.toString();

    // TODO: Validate res
    await login(username, passphrase);

    navigate('/');
    // window.location.reload();
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
          <TextField margin="normal" required fullWidth name="passphrase" label="Passphrase" type="password" id="passphrase" autoComplete="passphrase" />
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
