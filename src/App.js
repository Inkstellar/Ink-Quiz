// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Admin from "./pages/Admin";
import AllGames from "./pages/AllGames";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import { store } from "./app/store";
import { fetchAllGames, setPlayerName } from "./features/gameSlice";
import { socket } from "./socket";
import "./App.css";

const theme = createTheme();

function App() {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  React.useMemo(() => {
    const token = localStorage.getItem("inkQuiz");
    if (token) {
      store.dispatch(setPlayerName(token));
    }
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="App">
            <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/game/:id" element={<Game />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/all-games" element={<AllGames />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
