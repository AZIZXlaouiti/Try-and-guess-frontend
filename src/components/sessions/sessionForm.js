import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import { Button } from "@mui/material";
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { signup , login } from "./auth";
// ----------------------------------------------------------------------

export default function SessionFrom() {
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [ready, setReady] = useState(false);
  const [isSignup , setSignup ] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    username: "",
    password: "",
  });


  useEffect(() => {
    if (!Object.values(form).some((value) => value === "")) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [form]);


  const handleChange = (e) => {
    e.preventDefault()
    setError('')
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
     e.preventDefault()
     if (isSignup){

       signup(form)
       .then(data=>{
         if (data.message){
           setError(data.message)
         }else {
           dispatch({ type: "LOGIN", payload: data})
          localStorage.setItem('token', data.token);
          }
        })
     }else{
       login(form)
       .then(data=>{
        if (data.errors){
          setError(data.errors)
        }else {
          dispatch({ type: "LOGIN", payload: data})
          localStorage.setItem('token', data.token);
         }
     })
    };
  }
  return (
    <form
    onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <Stack spacing={3}>
        <h1>{isSignup ? "Signup":"Login"}</h1>

        <TextField
          fullWidth
          autoComplete="username"
          type="username"
          label="username"
          name="username"
          error={error}
          variant="outlined"

        />

        <TextField
         
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!ready}
        >
          Register
        </Button>
        <Typography sx={{color: 'red'}} >
                        {error ? `Oops ..${error}` : null}
                    </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
          {isSignup ? "Already have an account?":"Don't have an account?"} &nbsp;
          <Link
            variant="subtitle2"
            underline="hover"
            component="button"
            onClick={(e)=>{
              e.preventDefault()
              setSignup(!isSignup)
              setError('')
            }}
          >
            {isSignup ?"Login":"Signup"}
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
