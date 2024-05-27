import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UnauthorizedPages: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Typography variant="h5" component="h2">
      401 Unauthorized
      </Typography>
    </Box>
  );
};

export default UnauthorizedPages;