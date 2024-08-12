import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function Scores() {
  const { activeGame, questions } = useSelector((state) => state.game);

  return (
    <Grid item>
      <h2>Scores</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4">Team A</Typography>
            <Typography variant="h1">
              {activeGame.teamA && activeGame.teamA.score}
            </Typography>{" "}
            {/* Example score for Team A */}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h4">Team B</Typography>
            <Typography variant="h1">
              {" "}
              {activeGame.teamB && activeGame.teamB.score}
            </Typography>{" "}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Scores;
