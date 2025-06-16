import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../dataApi/authApi';

export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginUser({ loginId, password });

      // Store token and user info in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('loginId', result.loginId);
      localStorage.setItem('role', result.role);

      // Redirect to home
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid login credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '4rem' }}>
        <Typography variant="h4" gutterBottom>Login</Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Login ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
