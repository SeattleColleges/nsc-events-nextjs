import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UnauthorizedPages: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
      <Typography variant="h5" component="h2">
        401 Unauthorized
      </Typography>
      <Typography variant="h5" component="h2" sx={{ maxWidth: 500 }}>
        You are not authorized to access this page
      </Typography>
    </Box>
  );
};

export default UnauthorizedPages;
