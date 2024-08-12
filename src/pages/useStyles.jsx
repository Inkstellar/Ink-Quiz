import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  heroSection: {
    position: "relative",
    textAlign: "center",
    padding: theme.spacing(10, 2),
    color: theme.palette.common.white,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    overflow: "hidden",
    height: "200px",
    margin: " 16px 0",
    borderRadius: "16px",
    fontSize: "48px",
    fontWeight: "bolder",
    display: "flex",
    placeItems: "center",
    justifyContent: "center",
  },
  glowAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
    filter: "blur(5px)",
    animation: "$glow 5s infinite alternate",
  },
  "@keyframes glow": {
    from: {
      transform: "scale(1)",
      opacity: 0.5,
    },
    to: {
      transform: "scale(1.5)",
      opacity: 0,
    },
  },
  ctaButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 4),
    fontSize: "1.2rem",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    "&:hover": {
      background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
    },
  },
}));
