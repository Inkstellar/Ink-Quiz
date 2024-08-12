// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { fetchPlayerState } from "../features/gameSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { playerName } = useSelector((state) => state.game);

  const handleLogin = async () => {
    if (username.trim()) {
      const updatePlayername = await dispatch(fetchPlayerState(username));
      console.log(updatePlayername);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        {playerName && <Navigate to="/" replace={true} />}
      </Box>
    </Container>
  );
};

export default Login;
