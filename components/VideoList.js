import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";

const VideoList = ({ items }) => (
  <List>
    {items.map((video) => (
      <div key={video.videoId}>
        <ListItem
          button
          onClick={() =>
            window.open(
              `https://www.youtube.com/watch?v=${video.videoId}`,
              "_blank"
            )
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img
                style={{ width: "100%" }}
                alt={video.title}
                src={video.thumbnailUrl}
              />
            </Grid>
            <Grid item xs={9}>
              <ListItemText primary={video.title} />
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    ))}
  </List>
);

export default VideoList;
