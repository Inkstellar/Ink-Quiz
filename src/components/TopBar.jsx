import { AppBar, Toolbar, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { useDispatch } from "react-redux";
import { leavingGame, logout } from "../features/gameSlice";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function leaveGame() {
    const gameData = JSON.parse(
      JSON.stringify({
        player: playerName,
        gameId: activeGame.gameId,
      })
    );
    dispatch(logout(gameData));
    navigate("/");
  }
  const { playerName, activeGame } = useSelector((state) => state.game);
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <img src={logo} alt="logo" style={{ height: "50px" }} />
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {playerName ? (
            <Button color="inherit" component={Link} to="/all-games">
              All Games
            </Button>
          ) : null}
        </div>
        {playerName ? (
          <div style={{ color: "white" }}>
            Hi {playerName} &nbsp;
            <Button color="inherit" onClick={() => leaveGame()}>
              Logout
            </Button>
          </div>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
