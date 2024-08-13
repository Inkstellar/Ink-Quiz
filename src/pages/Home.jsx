import React, { useEffect } from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import CategoryIcon from "@mui/icons-material/Category";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { useDispatch } from "react-redux";
import { fetchAllGames } from "../features/gameSlice";
import { socket } from "../socket";

function Home() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   socket.connect();
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("allgames", dispatch(fetchAllGames()));

  //   return () => {
  //     socket.off("allgames");
  //   };
  // }, []);
  const classes = {
    heroSection: {
      position: "relative",
      textAlign: "center",
      padding: "100px 24px",
      color: "#fff",
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      overflow: "hidden",
      height: "200px",
      margin: " 16px 0",
      borderRadius: "16px",
      fontSize: "48px",
      fontWeight: "bolder",
      display: "flex",
      placeItems: "center",
      justifyContent: "center",
    },
  };
  return (
    <Container maxWidth="lg">
      <div className={classes.heroSection}>Challenge your Knowledge</div>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <PublicIcon style={{ fontSize: "50px" }} />
            <Typography variant="h5" gutterBottom>
              Global Participation
            </Typography>
            <Typography>
              Compete with quiz enthusiasts from around the world.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <CategoryIcon style={{ fontSize: "50px" }} />
            <Typography variant="h5" gutterBottom>
              Diverse Categories
            </Typography>
            <Typography>
              Explore quizzes from a wide range of subjects and interests.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <TrackChangesIcon style={{ fontSize: "50px" }} />
            <Typography variant="h5" gutterBottom>
              Track Progress
            </Typography>
            <Typography>
              Monitor your learning journey and see how much you've improved.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
