import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

export default function ToolbarCustom({ title = "API Deputados", nomeDeputado = null}) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">{title} {nomeDeputado ? "- " + nomeDeputado : null}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
