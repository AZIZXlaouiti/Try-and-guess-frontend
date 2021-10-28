import React, { useState , useEffect } from 'react'
import { Box } from '@mui/system'
import { Paper , Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Signup = () => {
    const [state , setState ] = useState({
        username:"",
        password:""
    })
    useEffect(()=>{
     //
    },[])
    return (
        <Box className='landing-session'>

            <Paper className='session-sheet' elevation={4} >
                <Typography align='center' variant='h2' sx={{ paddingTop: '5vh' }}>
                    Register
                </Typography>
                <form id='session-form' >
                    <TextField className='session-text'  id='username' type='text' label='Username' variant="outlined" />
                    <TextField className='session-text'  id='email' type='text' label='Email' variant="outlined" />
                    <TextField className='session-text'  id='password' type='password' label='Password' variant="outlined" />
                    <TextField className='session-text'  id='password_confirmation' type='password' label='Confirm Password' variant="outlined" />
                    <Button type='submit' variant="outlined" >
                        Submit
                    </Button>
                    {/* <Typography sx={{color: 'red'}} className='session-inverse-text'>
                        {errors ? 'There was an error.' : null}
                    </Typography>
                    <Typography className='session-inverse-text' onClick={handleSignupClick}>
                        Already have an account? Login.
                    </Typography> */}
                </form>
            </Paper>

        </Box>
    )
}

export default Signup
