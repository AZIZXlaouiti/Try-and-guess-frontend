import React from 'react'
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Icon } from "@iconify/react";
import { Stack , TextField , IconButton, InputAdornment ,  Button ,Typography,Link }from "@mui/material";
const SessionForm: React.FC=()=>{
    const [show , setShow] = React.useState(false)
    const [isSignup , setSignup ] = React.useState(true)
    const [error, setError] = React.useState('')
    const [ready, setReady] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [form, setForm] = React.useState({
      username: "",
      password: "",
    });
  return (
      show 
      ?  
      <form
      className='session'
      id="chatbox-messages"
    //   onChange={handleChange}
    //     onSubmit={handleSubmit}
      >
        <Stack spacing={3}>
          <h1>{isSignup ? "Signup":"Login"}</h1>
  
          <TextField
            fullWidth
            autoComplete="username"
            type="username"
            label="username"
            name="username"
            // error={error}
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
          {/* <Typography sx={{color: 'red'}} >
                          {error ? `Oops ..${error}` : null}
                      </Typography> */}
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            {isSignup ? "Already have an account?":"Don't have an account?"} &nbsp;
            <Link
              variant="subtitle2"
              underline="hover"
              component="button"
              onClick={(ev:any):void=>{
                ev.preventDefault()
                setSignup(!isSignup)
                setError('')
              }}
            >
              {isSignup ?"Login":"Signup"}
            </Link>
          </Typography>
        </Stack>
      </form>
     : 
     <h2 id='intro'
     onClick={():void=>{
         setShow(true)
     }}
    >welcome player ??
    </h2>
    
     
         
      
  )
}
export default SessionForm;