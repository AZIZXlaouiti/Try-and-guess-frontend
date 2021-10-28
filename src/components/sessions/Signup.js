import React , { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Button } from '@mui/material';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
// ----------------------------------------------------------------------

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [ready , setReady ] = useState(false)
  const [form , setForm ] = useState({
    username:'',
    password:''
  })
  useEffect(()=>{
    if (!Object.values(form).some((value)=>value === "")){
      setReady(true)
    }
    else {
      setReady(false)
    }
  },[form])
  const handleChange = (e)=>{
    
   setForm({
    ...form ,  
    [e.target.name]: e.target.value
  })
}
  

  return (
   
      <form autoComplete="off" noValidate onChange={handleChange} >
        <Stack spacing={3}>
         <h1>Signup</h1>

          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="username"
            name = 'username'
          />

<TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
        
          />
        
          

          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled = {!ready}
          >
            Register
          </Button>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
             Already have an account?  &nbsp;
              <Link variant="subtitle2"  to="register" underline="hover"   component="button" >
              Login
              </Link>
              
            </Typography>
        
        </Stack>
      </form>

  );
}