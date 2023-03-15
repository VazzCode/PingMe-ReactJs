import React,{useState,useEffect} from 'react'
import {Link, Button, InputAdornment, TextField, InputLabel, OutlinedInput, IconButton, Input, FormControl, formControlClasses } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useAuth } from '../contexts/AuthContext';

export default function Register() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const initialValues = { name: "", ph: "", email:"", pwd:"", cpwd:"" };
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const {signup, currentUser} = useAuth()

    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    

    const handleChange=(e)=>{
      const{name,value} = e.target;
      setFormValues({...formValues, [name]: value});   
    };

    const register = async ()=>{
      if(Object.keys(formErrors).length === 0 && isSubmit){
        try{
          setErrorMessage("");
          setLoading(true)
          await signup(formValues.email, formValues.pwd, formValues.name, formValues.ph);
          navigate("/Home");
        } catch(err){
          setErrorMessage("Failed to Login")
          console.log(err);
        }
        setLoading(false)
        console.log(formValues);
      }
      else
        console.log(formErrors);
    }

    useEffect(() => {
      register();
    }, [formErrors])
    
    const validate = (values)=>{
      const errors={};
      if(values.name.length<3)
        errors.name="username should be atleast 3 Letters";

      let em=values.email;
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if(!regex.test(values.email))
        errors.email="email format is Invalid";

      if(values.ph.length != 10)
        errors.ph="mobile number should contain 10 digit"

      if(values.pwd.length<6)
        errors.pwd="password length must be atleat 6 characters"

      if(values.cpwd == "" || values.cpwd != values.pwd)
        errors.cpwd="password confirmation does not match"

      return errors;
    }

    const handleSubmit = (e) => {
    
        console.log('handle submit pressed');      
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        
    }

  return (
    <div style={{margin: 100}}>
        <form >
          <h3>Register</h3>
            {/* <div style={{}}>{errorMessage}</div> */}
           <div style= {{ display:'flex',alignItems:'center',flexDirection:"column", height:500,width:300, justifyContent:'space-between'}}>
            {/* {currentUser && currentUser.email} */}
            <TextField 
            fullWidth
            type='email'
            name='name'            
            label="Username"
            variant="outlined"
            error={!!formErrors.name}
            helperText={formErrors.name}
            onChange={handleChange}
            />
            <TextField     
            name='email'            
            error={!!formErrors.email}
            helperText={formErrors.email}        
            fullWidth
            label="E-mail"
            variant="outlined"           
            onChange={handleChange} 
            />
            <TextField             
            name='ph'
            error={!!formErrors.ph}
            helperText={formErrors.ph}
            fullWidth
            label="Mobile Number"
            variant="outlined" 
            
            onChange={handleChange}
            />
             
            <FormControl fullWidth variant="outlined">
              <InputLabel error={!!formErrors.pwd} htmlFor="outlined-adornment-password">Password</InputLabel>        
              <OutlinedInput
                name='pwd'
                error={!!formErrors.pwd}
                fullWidth
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e)=>{e.preventDefault()}}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              /> 
              <p style={{marginTop:-0.1,marginLeft:-15, color:'#d32f2f'}} >{formErrors.pwd}</p>
            </FormControl>

          <FormControl fullWidth variant="outlined" style={{marginTop:-10}} >
            <InputLabel error={!!formErrors.cpwd} style={{marginTop:-2}} htmlFor="outlined-adornment-password">Confirm Password</InputLabel>        
            <OutlinedInput
              name='cpwd'
              error={!!formErrors.cpwd}
              fullWidth
              onChange={handleChange}

              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e)=>{e.preventDefault()}}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            <p style={{display:'flex',marginLeft:17,marginTop:-0.1, color:'#d32f2f'}} >{formErrors.cpwd}</p>
          </FormControl>

            <Button variant='contained' disabled={loading} onClick={handleSubmit}>Register</Button>
          </div>
        </form>
        <p>If you already have an account <Link component="button" fontSize={12.5} onClick={()=>{navigate("/")}}>Log in</Link></p>
    </div>
  )
}
