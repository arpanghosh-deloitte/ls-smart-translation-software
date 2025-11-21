import { Paper, Typography,Link,Box } from "@mui/material";
import styles from "./AuthShared.module.css"

const AuthInfoPanel=() =>{
  return(
    <Paper elevation={0}
    className={styles.infoCard}>
      <Typography variant="h5"
      sx={{fontWeight:600,mb:2}}>
        Welcome to the Deloitte Smart Translation Hub
      </Typography>
      <Typography variant="body2" sx={{mb:2}}>
        A central platform where you can efficiently translate and manage documents in a controlled Deloitte Environment.
      </Typography>
      <Typography variant="body2" sx={{mb:2}}>
        Access to Smart Translation is currently limited to registered Deloitte users. To request access or support, please contact the translation support team
      </Typography>
      <Box sx={{mt:1}}>
        <Typography variant="body2" sx={{fontWeight:500}}>
          Need help?
        </Typography>
        <Link href="mailto:test@deloitte.com" underline="hover" color="inherit">
        test@deloitte.com
        </Link>
      </Box>
    </Paper>
  )
}

export default AuthInfoPanel;