import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Card,
  Button,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTeams } from "../features/gameSlice";
import { socket } from "../socket";

const Questions = forwardRef(({ category }, ref) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [currentQuestion, setQuestion] = useState();
  const { activeGame, questions } = useSelector((state) => state.game);
  const [clicked, setClicked] = useState(false);

  const handleCloseModal = () => {
    dispatch(
      updateTeams({
        gameId: activeGame.gameId,
        type: "roundClose",
      })
    );
    setOpenModal(false);
  };

  useImperativeHandle(ref, () => ({
    openDialog: () => setOpenModal(true),
    closeDialog: () => setOpenModal(false),
  }));

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const updateQuestion = (ques) => {
    dispatch(
      updateTeams({
        gameId: activeGame.gameId,
        type: "question",
        question: ques,
      })
    );
  };

  useEffect(() => {
    if (openModal === true && activeGame.nextQuestion === false) {
      const getCategory = questions[category.toString().toLowerCase()];
      var q;
      var counter = 0;
      do {
        var randomIndex = Math.floor(Math.random() * 10);
        q = getCategory[randomIndex];
        if (!activeGame.questionsAsked.includes(q.question)) {
          updateQuestion(q);
          setQuestion((prev) => q);
          break;
        } else {
          counter++;
        }
        if (counter == 9) break;
      } while (q);
      console.log(q);
      setQuestion((prev) => q);
    }
  }, [openModal]);

  const handleReveal = () => {
    dispatch(
      updateTeams({
        gameId: activeGame.gameId,
        type: "reveal",
      })
    );
  };
  function chooseAction(item) {
    return function () {
      dispatch(
        updateTeams({
          gameId: activeGame.gameId,
          type: "answer",
          answer: item,
        })
      );
    };
  }
  useEffect(() => {
    if (activeGame.nextQuestion) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
    return () => {};
  }, [activeGame]);
  function setCorrectAnswer(item) {
    if (activeGame.currentAnswer === item) {
      return "primary";
    }
  }
  return (
    <Dialog open={openModal} onClose={handleCloseModal}>
      <DialogTitle>Question for {activeGame.hotseat}</DialogTitle>
      {activeGame ? (
        <DialogContent>
          <DialogContentText>
            {activeGame.currentQuestion && activeGame.currentQuestion}
          </DialogContentText>
          {activeGame.currentOptions &&
            activeGame.currentOptions.map((item, index) => {
              return (
                <Chip
                  key={index}
                  label={item}
                  onClick={chooseAction(item)}
                  color={
                    activeGame.currentAnswer === item ? "primary" : "default"
                  }
                />
              );
            })}
          <Button onClick={handleReveal}>Reveal</Button>
          {activeGame.revealAnswer && activeGame.correctAnswer}
        </DialogContent>
      ) : null}
    </Dialog>
  );
});

export default Questions;
