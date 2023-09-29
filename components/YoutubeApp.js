import {
  Box,
  Button,
  Container,
  FormControl,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import AddVideoDialog from "./AddVideoDialog";
import EmptyResult from "./EmptyResult";
import StatusIndictor from "./StatusIndictor";
import VideoList from "./VideoList";

const YoutubeApp = () => {
  const [indicatorState, setIndicatorState] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [videoList, setVideoList] = React.useState([]);

  const handleError = async (message) => {
    setIndicatorState({
      type: "error",
      message,
    });
  };

  const handleSuccess = async (successObj) => {
    setIndicatorState({
      type: "success",
      message: "Video Added!",
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      query: searchQuery,
    });

    const response = await fetch(`/api/search?${queryParams}`);

    const data = await response.json();

    // TODO: Why does this require a double index?
    setVideoList(data.data.metadatas[0]);
  };

  return (
    <Container maxWidth="sm">
      <h1>YoutubeApp</h1>
      <Box>
        <form noValidate autoComplete="off" onSubmit={handleSearch}>
          <FormControl fullWidth>
            <FormGroup fullWidth row={true}>
              <Grid container spacing={1} alignItems="stretch">
                <Grid item xs>
                  <TextField
                    id="outlined-basic"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    label="Search"
                    fullWidth
                    variant="outlined"
                    style={{ height: "100%" }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    style={{ height: "100%" }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </form>
      </Box>

      {videoList.length > 0 ? <VideoList items={videoList} /> : <EmptyResult />}

      <StatusIndictor
        open={!!indicatorState}
        onClose={() => {
          setIndicatorState(null);
        }}
        {...indicatorState}
      />

      <AddVideoDialog onError={handleError} onSuccess={handleSuccess} />
    </Container>
  );
};

export default YoutubeApp;
