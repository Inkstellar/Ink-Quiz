import React, { useState, useEffect } from "react";
import { Grid, Stack, Button, Chip, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTeams } from "../features/gameSlice";

function TeamManagement() {
  // Assuming allplayers is already defined
  const dispatch = useDispatch();
  const { activeGame } = useSelector((state) => state.game);
  // const [hotseat, setHotseat] = useState("");
  // console.log(activeGame);
  const [teamMembers, setTeamMembers] = useState({
    "Team A": [],
    "Team B": [],
  });

  useEffect(() => {
    console.log(activeGame);
  }, [activeGame]);

  const createTeams = () => {
    // Shuffle the allplayers array
    const shuffledPlayers = [...activeGame.activePlayers];
    //remove the player if the value is "Admin" from shuffledPlayers
    shuffledPlayers.splice(shuffledPlayers.indexOf("Admin"), 1);
    if (activeGame.activePlayers.length > 2) {
      for (let i = shuffledPlayers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPlayers[i], shuffledPlayers[j]] = [
          shuffledPlayers[j],
          shuffledPlayers[i],
        ]; // Swap elements
      }
    }

    // Split the shuffled array into two teams
    const midpoint = Math.ceil(shuffledPlayers.length / 2);
    const teamA = shuffledPlayers.slice(0, midpoint);
    const teamB = shuffledPlayers.slice(midpoint);
    setTeamMembers({ "Team A": teamA, "Team B": teamB });
    dispatch(
      updateTeams({
        gameId: activeGame.gameId,
        type: "shuffleTeams",
        teamA: teamA,
        teamB: teamB,
      })
    );
  };

  const updateHotSeat = (player) => {
    dispatch(
      updateTeams({
        gameId: activeGame.gameId,
        type: "hotseat",
        hotseat: player,
      })
    );
  };

  return (
    <>
      <Stack
        flexDirection={"row"}
        gap={1}
        sx={{ marginTop: 2, paddingLeft: 2 }}
      >
        <Box sx={{ flex: 1 }}>
          <Stack flexDirection={"column"} gap={1}>
            {activeGame.teamA &&
              activeGame.teamA.players.map((member, index) => (
                <Chip
                  key={index}
                  label={member}
                  color={activeGame.hotseat === member ? "primary" : "default"}
                />
              ))}
          </Stack>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Stack flexDirection={"column"} gap={1}>
            {activeGame.teamB &&
              activeGame.teamB.players.map((member, index) => (
                <Chip
                  key={index}
                  label={member}
                  color={activeGame.hotseat === member ? "primary" : "default"}
                />
              ))}
          </Stack>
        </Box>
      </Stack>

      <h2>Players Joined</h2>
      {activeGame.activePlayers ? (
        <>
          <Stack gap={1} flexDirection={"row"}>
            {activeGame.activePlayers.map((member, index) => (
              <Chip
                key={index}
                label={member}
                onClick={() => updateHotSeat(member)}
                color={activeGame.hotseat === member ? "primary" : "default"}
              />
            ))}
          </Stack>{" "}
          <br />
          <Button onClick={createTeams}>Shuffle Team</Button>
        </>
      ) : null}
    </>
  );
}

export default TeamManagement;
