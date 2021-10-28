import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
// material
import { Button } from '@mui/material';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
// import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
         

          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="username"
         
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
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
            loading={isSubmitting}
          >
            Register
          </Button>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
             Already have an account?  &nbsp;
              <Link variant="subtitle2"  to="register">
              Login
              </Link>
            </Typography>
        
        </Stack>
      </Form>
    </FormikProvider>
  );
}