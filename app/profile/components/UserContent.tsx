import React from 'react'
import { Box, Typography } from '@mui/material'

interface UserContentProps {

}

const UserContent: React.FC<UserContentProps> = ({}) => {
  return (
    <Box 
        sx={{
            width: '85%',
            height: '600px',
            marginLeft: '10px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: '7px',
            padding: "35px",
            boxShadow: 3
        }}>
    <Typography>User Content</Typography>
    </Box>
  )
}

UserContent.propTypes = {}

export default UserContent