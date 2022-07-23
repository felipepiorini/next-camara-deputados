import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

export default function ToolbarCustom({ title = "API Deputados" }) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">{title}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
