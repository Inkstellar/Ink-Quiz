import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllGames,
  setActiveGame,
  gameUpdates,
  updateGameFeed,
  fetchQuestions,
} from "../features/gameSlice";
import { socket } from "../socket";

function AllGames() {
  const { games, playerName } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Step 2: Initialize useNavigate
  const [getAllGames, setAllGames] = useState(false);

  function includeUser(allPlayers) {
    const activePlayers = allPlayers;
    if (activePlayers.includes(playerName)) {
      return activePlayers;
    }
    return [...activePlayers, playerName];
  }
  const handleJoinGame = (game) => {
    const updateGame = {
      ...game,
      playersJoined: game.playersJoined + 1,
      activePlayers: includeUser(game.activePlayers),
    };
    console.log(updateGame);
    dispatch(
      updateGameFeed({
        player: playerName,
        type: "addPlayer",
        gameId: game.gameId,
      })
    );
    // dispatch(setActiveGame(updateGame));
    navigate(`/game/${game.gameId}`); // Step 3: Redirect to /game
  };
  useEffect(() => {
    if (!getAllGames) {
      dispatch(fetchAllGames());
      setAllGames(true);
    }
    return () => {};
  }, []);
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onFooEvent(value) {
      dispatch(gameUpdates(value.data));
      console.log(value);
    }
    socket.on("gameUpdates", onFooEvent);

    return () => {
      socket.off("gameUpdates");
    };
  }, []);
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Active Games
      </Typography>
      <Grid container spacing={4}>
        {games.map((game) => (
          <Grid item key={game.id} xs={12} sm={6} md={4}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Box
                  sx={{
                    background: "#1976d2",
                    color: "#fff",
                    borderRadius: 2,
                    height: 200,
                    display: "flex",
                    placeItems: "center",
                    justifyContent: "center",
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="h5" component="div">
                    {game.gameName}
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Admin: {game.createdBy}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Players: {game.playersJoined}/{game.totalPlayers}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleJoinGame(game)}
                  disabled={game.playersJoined >= game.totalPlayers} // Disable button if playersJoined >= maxPlayers
                >
                  Join Game
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AllGames;
