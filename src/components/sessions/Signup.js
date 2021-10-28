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
  // useEffect(()=>{
  //   if (!Object.values(formik.initialValues).some((value)=>value === "")){
  //     setReady(true)
  //   }
  //   else {
  //     setReady(false)
  //   }
  // },[])
  // const formik = useFormik({
  //     username: '',
  //     password: ''
   
  // });
  // console.log(formik.initialValues , "formik")
  // const handleChange = (e)=>{
  //   console.log(e.target.name)
  //   formik.initialValues[e.target.name]= e.target.value
  // }
  

  return (
   
      <form autoComplete="off" noValidate>
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