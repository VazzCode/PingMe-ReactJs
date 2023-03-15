import React,{useState,useEffect} from 'react'
import {Link, Button, InputAdornment, TextField, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useAuth} from '../contexts/AuthContext';


export default function Login() {

  const navigate = useNavigate();

  const initialValues = { name: "", pwd:"" };
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {login, currentUser} = useAuth()
  
  

  const handleChange=(e)=>{
    const{name,value} = e.target;
    setFormValues({...formValues, [name]: value});   
  };

  const handleSubmit = (e) => {
    
    console.log('handle submit pressed'); 
     
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  const validate = (values)=>{
    const errors={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!regex.test(values.name))
      errors.name="username/e-mail is Invalid";  

    if(values.pwd.length<6)
      errors.pwd="Invalid password";

    return errors;
  }

  const logIn = async() =>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
      try{
        setLoading(true);
        await login(formValues.name,formValues.pwd);
        navigate("/Home");
      }catch(err){
        console.log(err);
      }
      setLoading(false)

      }
    
    else
      console.log(formErrors);
  }

  useEffect(() => {
    logIn();
  
      
  }, [formErrors])
  
  
  return (
    <div style={{margin: 100}}>
          
        <form>
          <h3>Log In</h3>
           <div style= {{ display:'flex',alignItems:'center',flexDirection:"column", height:220,width:300, justifyContent:'space-between'}}>

            <TextField
            error={!!formErrors.name}
            name='name'
            type='email'
            helperText={formErrors.name}
            variant="outlined"
            fullWidth
            label="E-mail"
            onChange={handleChange}
            />
            <FormControl fullWidth variant="outlined" >
            <InputLabel error={!!formErrors.pwd} htmlFor="outlined-adornment-password">Password</InputLabel>        
            <OutlinedInput
              name='pwd'
              error={!!formErrors.pwd}
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
              label="Password"
            />
            <p style={{display:'flex',marginLeft:17,marginTop:-0.1, color:'#d32f2f'}} >{formErrors.pwd}</p>
          </FormControl>
            <Link fontSize={12.5} onClick={()=>{navigate("/forgot")}}>Forgot password?</Link>
            <Button variant='contained' disabled={loading} onClick={handleSubmit}>Log In</Button>
          </div>
        </form>
        <p>If you don't have an account <Link component="button" fontSize={12.5} onClick={()=>{navigate("/Register")}}>Click here to Register</Link></p>   
    </div>
  )
}
