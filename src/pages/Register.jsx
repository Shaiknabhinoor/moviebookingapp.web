import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography, Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../dataApi/axiosInstance';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    role: '', // optional, leave blank
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/user/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>

        <form onSubmit={handleRegister}>
          <TextField name="firstName" label="First Name" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="lastName" label="Last Name" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="email" label="Email" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="loginId" label="Login ID" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="confirmPassword" label="Confirm Password" type="password" fullWidth margin="normal" onChange={handleChange} />
          <TextField name="contactNumber" label="Contact Number" fullWidth margin="normal" onChange={handleChange} />

          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Box>

          {error && (
            <Box mt={2}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}
        </form>
      </Paper>
    </Container>
  );
}
