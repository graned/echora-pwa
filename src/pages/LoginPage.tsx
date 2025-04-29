import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from '@mui/material'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'demo@echora.app' && password === 'demo123') {
      dispatch(login())
      navigate('/hello')
    }
  }

  const handleDemoLogin = () => {
    dispatch(login())
    navigate('/hello')
  }

  return (
    <Container maxWidth="sm">
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleDemoLogin}
            >
              Login with Demo Account
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}
