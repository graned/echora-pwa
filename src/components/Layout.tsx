import { useState } from 'react'
import { Box, Drawer, IconButton, Avatar, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Button } from '@mui/material'
import { Menu as MenuIcon, ChevronLeft, ChevronRight, Person, Settings, ExitToApp, Star } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.auth.user)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Drawer */}
      <Drawer
        variant="persistent"
        open={leftOpen}
        sx={{
          width: leftOpen ? 240 : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: leftOpen ? 240 : 56,
            boxSizing: 'border-box',
            position: 'relative',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={() => setLeftOpen(!leftOpen)}>
            {leftOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        
        <Divider />
        
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {['Dashboard', 'Characters', 'Campaigns', 'Library'].map((text) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              {leftOpen && <ListItemText primary={text} />}
            </ListItem>
          ))}
        </List>
        
        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Button 
            fullWidth 
            onClick={() => setSubscriptionModalOpen(true)}
            sx={{ textAlign: 'left' }}
          >
            {leftOpen ? (
              <>
                <Typography variant="body2">Current Plan</Typography>
                <Typography variant="subtitle2">Premium</Typography>
              </>
            ) : (
              <Star />
            )}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          p: 2,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>
              <ListItemIcon><Person fontSize="small" /></ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem onClick={() => navigate('/settings')}>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><ExitToApp fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>

      {/* Right Drawer */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightOpen}
        sx={{
          width: rightOpen ? 240 : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: rightOpen ? 240 : 56,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
          <IconButton onClick={() => setRightOpen(!rightOpen)}>
            {rightOpen ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </Box>
        
        <Divider />
        
        <Typography variant="h6" sx={{ p: 2 }}>Selected Characters</Typography>
        <List>
          {['Character 1', 'Character 2', 'Character 3'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
              <Button size="small" variant="outlined">Select</Button>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Floating Navigation Button */}
      <Box sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate('/hello2')}
          sx={{ borderRadius: '50%', width: 56, height: 56 }}
        >
          <ChevronRight />
        </Button>
      </Box>
    </Box>
  )
}
