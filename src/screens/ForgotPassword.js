import React,{useState,useEffect} from 'react'
import {Link, Button, InputAdornment, TextField, FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useAuth} from '../contexts/AuthContext';


export default function ForgotPassword() {

  const navigate = useNavigate();

  const initialValues = { name: "", pwd:"" };
  const [formValues,setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkM, setCheckM] =useState("");

  const {resetPassword, currentUser} = useAuth()
  
  

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

    return errors;
  }

  const logIn = async() =>{
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues);
      try{
        setCheckM("");
        setLoading(true);
        await resetPassword(formValues.name);
      }catch(err){
        console.log(err);
        setCheckM("Please Check your Mail");
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
          <h3>Password Reset</h3>
          <p>{checkM && checkM}</p>
           <div style= {{ display:'flex',alignItems:'center',flexDirection:"column", height:150,width:300, justifyContent:'space-between'}}>
            
            <TextField
            error={!!formErrors.name}
            // type='email'
            name='name'
            helperText={formErrors.name}
            variant="outlined"
            fullWidth
            label="E-mail"
            onChange={handleChange}
            />
            <Button variant='contained' disabled={loading} onClick={handleSubmit}>Reset Password</Button>
            <Link component="button" fontSize={12.5} onClick={()=>{navigate("/")}}>Log In</Link>
          </div>
        </form>
        <p>If you don't have an account <Link component="button" fontSize={12.5} onClick={()=>{navigate("/Register")}}>Click here to Register</Link></p>

    </div>
  )
}
