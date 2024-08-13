// features/gameSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

const localhost_ = "http://localhost:3001";
const serverUrl_ =
  "https://inkexpdb-h3g6dqhqh3ayhvdg.southindia-01.azurewebsites.net";

const initialState = {
  selectedCategory: "",
  selectedSubCategory: "",
  playerName: "",
  games: [],
  activeGame: {},
  questions: [],
};

//create a action
export const fetchPlayerState = createAsyncThunk(
  "games/fetchPlayerState",
  async (playerName) => {
    try {
      const resp = await fetch(`${serverUrl_}/users/${playerName}`, {
        method: "get",
      });
      return playerName;
    } catch (err) {
      return err;
    }
  }
);
export const fetchAllGames = createAsyncThunk(
  "games/fetchAllGames",
  async () => {
    try {
      const resp = await fetch(`${serverUrl_}/getgames`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);
export const createNewGame = createAsyncThunk(
  "games/createNewGame",
  async (newGame) => {
    try {
      const resp = await fetch(`${serverUrl_}/games`, {
        method: "post",
        body: JSON.stringify(newGame),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const updateGameFeed = createAsyncThunk(
  "games/updateGameFeed",
  async (gameData) => {
    try {
      const resp = await fetch(`${serverUrl_}/games/addplayer`, {
        method: "post",
        body: JSON.stringify(gameData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());
      return resp.data[0];
    } catch (err) {
      return err;
    }
  }
);
export const leavingGame = createAsyncThunk(
  "games/leavingGame",
  async (gameData) => {
    console.log(gameData);
    try {
      const resp = await fetch(`${serverUrl_}/games/removePlayer`, {
        method: "post",
        body: JSON.stringify(gameData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());
      return false;
    } catch (err) {
      return false;
    }
  }
);
export const updateTeams = createAsyncThunk(
  "games/updateTeams",
  async (gameData) => {
    console.log(gameData);
    try {
      const resp = await fetch(`${serverUrl_}/updateTeams`, {
        method: "post",
        body: JSON.stringify(gameData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());

      return resp.data[0];
    } catch (err) {
      return false;
    }
  }
);
export const fetchQuestions = createAsyncThunk(
  "games/fetchQuestions",
  async () => {
    try {
      const resp = await fetch(`${serverUrl_}/questions`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((r) => r.json());
      return resp.data;
    } catch (err) {
      return false;
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    setPlayerName: (state, action) => {
      localStorage.setItem("inkQuiz", action.payload);
      state.playerName = action.payload;
    },
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
    },
    unsetActiveGame: (state, action) => {
      state.activeGame = {};
    },
    gameUpdates: (state, action) => {
      state.games = action.payload;
    },
    logout: (state, action) => {
      localStorage.removeItem("inkQuiz");
      state.playerName = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayerState.fulfilled, (state, action) => {
      localStorage.setItem("inkQuiz", action.payload);
      state.playerName = action.payload;
    });
    builder.addCase(fetchPlayerState.rejected, (state, action) => {
      state.playerName = "";
    });

    builder.addCase(fetchAllGames.fulfilled, (state, action) => {
      state.games = action.payload;
    });
    builder.addCase(createNewGame.fulfilled, (state, action) => {
      state.games = action.payload;
    });
    builder.addCase(updateGameFeed.fulfilled, (state, action) => {
      state.activeGame = action.payload;
    });
    builder.addCase(updateTeams.fulfilled, (state, action) => {});
    builder.addCase(leavingGame.fulfilled, (state, action) => {
      state.activeGame = {};
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
  },
});

export const {
  setSelectedCategory,
  setSelectedSubCategory,
  setPlayerName,
  setActiveGame,
  unsetActiveGame,
  gameUpdates,
  logout,
} = gameSlice.actions;

export default gameSlice.reducer;
