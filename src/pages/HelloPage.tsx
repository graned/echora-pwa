import { Box, Container, Typography } from '@mui/material'

export default function HelloPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Hello, Echora User!</Typography>
      </Box>
    </Container>
  )
}
