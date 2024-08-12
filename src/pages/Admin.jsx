import React, { useEffect } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { createNewGame, fetchAllGames } from "../features/gameSlice";

function Admin() {
  const dispatch = useDispatch();
  const [gameName, setGameName] = React.useState("");
  const [maxPlayers, setMaxPlayers] = React.useState("");
  const { games, playerName } = useSelector((state) => state.game);
  const [newgameId, setGameId] = React.useState(uuidv4());

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleMaxPlayersChange = (event) => {
    setMaxPlayers(event.target.value);
  };

  useEffect(() => {
    if (!games.length) {
      dispatch(fetchAllGames());
    }
    return () => {};
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGame = {
      id: games.length + 1, // Simple ID assignment
      gameName: gameName,
      gameId: newgameId,
      createdBy: playerName, // Placeholder, replace with actual data
      createdOn: new Date().toLocaleDateString(),
      playersJoined: 0,
      totalPlayers: maxPlayers,
      activePlayers: [],
      teamA: {
        score: 0,
        name: "",
        players: [],
      },
      teamB: {
        score: 0,
        name: "",
        players: [],
      },
      status: "Active", // Placeholder, replace with actual data
      questionsAsked: [],
      currentQuestion: "",
      currentOptions: [],
      correctAnswer: "",
      revealAnswer: false,
      hotseat: "",
      currentAnswer: "",
      nextQuestion: false,
    };
    // setGames([...games, newGame]);
    dispatch(createNewGame(newGame));
    setGameId(uuidv4());
  };

  // Define columns for DataGrid
  const columns = [
    { field: "gameName", headerName: "Game Name", width: 200 },
    { field: "gameId", headerName: "Game Id", width: 300 },
    { field: "createdBy", headerName: "Created By", width: 200 },
    { field: "createdOn", headerName: "Created On", width: 150 },
    {
      field: "playersJoined",
      headerName: "Players Joined",
      type: "number",
      width: 130,
    },
    {
      field: "totalPlayers",
      headerName: "Total Players",
      type: "number",
      width: 130,
    },
    { field: "status", headerName: "Status", width: 120 },
  ];

  function getRowId(row) {
    if (row) return row.id;
  }
  return (
    <>
      <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Register New Game
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="gameName"
              label="Game Name"
              name="gameName"
              autoComplete="gameName"
              autoFocus
              value={gameName}
              onChange={handleGameNameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="maxPlayers"
              label="Maximum Number of Players"
              type="number"
              id="maxPlayers"
              autoComplete="maxPlayers"
              value={maxPlayers}
              onChange={handleMaxPlayersChange}
            />
            <TextField
              margin="normal"
              disabled
              fullWidth
              id="gameId"
              label="Game Id"
              name="gameId"
              value={newgameId}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register Game
            </Button>
          </Box>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {/* Form fields and submit button */}
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          All Games
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
          {games.length < 0 ? (
            console.log(games)
          ) : (
            <DataGrid
              getRowId={getRowId}
              rows={games}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              // checkboxSelection
            />
          )}
        </div>
      </Container>
    </>
  );
}

export default Admin;
