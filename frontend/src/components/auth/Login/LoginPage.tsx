import { useState } from "react";
import{
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import AuthInfoPanel from "../AuthInfoPanel";
import sharedStyles from "../AuthShared.module.css";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();
  const login = useAuthStore((s)=> s.login);


const handleSubmit = (e:React.FormEvent)=>{ e.preventDefault();

  //Replace with real backend API Call
  login({
    id:"test-id",
    name:"Test",
    email:"test@deloitte.com"
  });

  // after real login -> route to dahsboard
  //navigate("/dashboard")
};

return(
  <Box className={sharedStyles.authWrapper}> 
  <AuthInfoPanel />
  
  <Box component="form" onSubmit={handleSubmit} className={sharedStyles.formCard}>
<Typography variant="h5" sx={{ fontWeight:600, mb:2}}>
  Login
</Typography>
<TextField fullWidth label="Username" variant="outlined" margin="normal"/>
<TextField fullWidth label="Password" variant="outlined" margin="normal" type={showPassword? "text":"password"}
InputProps={{
  endAdornment:(
    <InputAdornment position="end">
      <IconButton edge="end" onClick={()=>
        setShowPassword((prev) => !prev)
      }>
        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </InputAdornment>
  )
}}
/>
<Button
type="submit" fullWidth variant="contained" size="large"
sx={{mt:3, mb:1, backgroundColor:"#86BC25", fontWeight:600, "&:hover":{backgroundColor:"#6E9F1C"}}}>
  Login
</Button>
<Typography className={sharedStyles.switchText}>
  New to Smart Translator?
  <span className={sharedStyles.switchText} onClick={()=> navigate("/signup")}>Create an Account</span>
</Typography>
  </Box>
  </Box>
)
}
export default LoginPage;