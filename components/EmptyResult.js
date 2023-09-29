import { Box, Container } from "@mui/material";

const EmptyResult = () => (
  <Container
    sx={{
      width: "100%",
      height: "20vh",
      marginTop: "20px",
      backgroundColor: "#f5f5f5",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      boxShadow: 1,
    }}
  >
    <Box sx={{ color: "text.primary", fontWeight: "bold" }}>
      Enter search query
    </Box>
    <Box sx={{ color: "text.secondary" }}>
      Search for videos in Personal YouTube Library
    </Box>
  </Container>
);

export default EmptyResult;
