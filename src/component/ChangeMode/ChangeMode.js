import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { CssBaseline } from "@mui/material";
import { lightBlue, grey, purple } from "@mui/material/colors";

import { changeMode } from "../../redux/Mode/ModeSlice";

export function ChangeModeButton() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const md = useSelector((rootReducer) => rootReducer.changeMode.mode);

  const [mode, setMode] = useState(md);

  const handleChangeMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("MODE", "light");
    } else {
      setMode("dark");
      localStorage.setItem("MODE", "dark");
    }
  };

  useEffect(() => {
    dispatch(changeMode(mode));
  }, [mode]);

  return (
    <IconButton sx={{ ml: 1 }} onClick={handleChangeMode} color="inherit">
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}

export default function ChangeMode({ children }) {
  const md = useSelector((rootReducer) => rootReducer.changeMode.mode);
  const [mode, setMode] = useState("");

  useEffect(() => {
    // setMode(md);
    if (localStorage.getItem("MODE") === null) {
      setMode("light");
    } else {
      setMode(localStorage.getItem("MODE"));
    }
  }, [md]);

  const theme = React.useMemo(() => {
    return createTheme(
      mode && {
        palette: {
          mode,
          primary: {
            ...lightBlue,
            ...(mode === "light" && {
              main: lightBlue[800],
            }),
          },
          ...(mode === "dark" && {
            background: {
              default: grey[900],
              paper: grey[800],
            },
          }),
          ...(mode === "light" && {
            background: {
              default: grey[200],
              paper: grey[50],
            },
          }),
          text: {
            ...(mode === "light"
              ? {
                  primary: grey[900],
                  secondary: grey[800],
                }
              : {
                  primary: "#fff",
                  secondary: grey[500],
                }),
          },
        },
      }
    );
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </ThemeProvider>
  );
}
