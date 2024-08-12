import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Paper,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Box,
  Modal,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Card,
  Button,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TeamManagement from "../components/TeamManagement";
import {
  setSelectedCategory,
  setSelectedSubCategory,
  setActiveGame,
  leavingGame,
  fetchAllGames,
  updateGameFeed,
  fetchQuestions,
} from "../features/gameSlice";

import { Score } from "@mui/icons-material";
import Scores from "../components/Scores";
import Questions from "../components/Questions";
import { quizCategories } from "./quizCategories";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

function Game() {
  const questionsRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { playerName, activeGame, games } = useSelector((state) => state.game);
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [category, setCategory] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = React.useState("");
  const [activeGameId, setActiveGameId] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (games.length <= 0) {
      dispatch(fetchAllGames());
      const temp = window.location.pathname.replace("/game/", "");
      setActiveGameId(temp);
      console.log("..getting all games");
    }
    if (games.length > 0) {
      console.log("..setting active game");
      const currentGame = games.filter((game) => game.gameId === activeGameId);
      dispatch(setActiveGame(currentGame[0]));
    }
    return () => {
      dispatch(setActiveGame({}));
    };
  }, [games]);

  useEffect(() => {
    socket.connect();
    dispatch(fetchQuestions());

    return () => {
      socket.disconnect();
    };
  }, []);

  function onFooEvent(value) {
    if (value.data) {
      dispatch(setActiveGame(JSON.parse(value.data)[0]));
    }
    if (value.message) {
      setNotification(value.message);
    }
  }

  useEffect(() => {
    socket.on("allgames", onFooEvent);

    return () => {
      socket.off("allgames");
    };
  }, []);

  function leaveGame() {
    const gameData = JSON.parse(
      JSON.stringify({
        player: playerName,
        gameId: activeGame.gameId,
      })
    );
    dispatch(leavingGame(gameData));
    navigate("/");
  }

  const handleOpenModal = (category) => {
    setCategory(category);
    questionsRef.current.openDialog();
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDialog = (category, subCategory) => {
    dispatch(setSelectedCategory(category));
    dispatch(setSelectedSubCategory(subCategory));
    setOpenDialog(true);
    setOpenModal(false); // Close the modal as we open the dialog
  };

  const handleCloseDialog = () => setOpenDialog(false);

  if (activeGame !== undefined) {
    return (
      <>
        <>{activeGame.gameName}</>
        <Stack flexWrap={"wrap"} gap={2} flexDirection={"row"}>
          {quizCategories.map((category, index) => (
            <Card sx={{ width: 300 }} key={index}>
              <CardActionArea onClick={() => handleOpenModal(category.title)}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
        <Scores />
        <TeamManagement />
        <Questions ref={questionsRef} category={category} />
      </>
    );
  } else return <>failed to load</>;
}

export default Game;
