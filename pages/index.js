// React
import * as React from "react";
import { useEffect, useState } from "react";

// API
import api from "../services/v1";

// MUI Componentes
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";
import Toolbar from "@mui/material/Toolbar";

export default function Deputados() {
  const [deputados, setDeputados] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      setShowLoading(true);
      try {
        await api
          .get(`deputados?ordem=ASC&ordenarPor=nome&pagina=1&itens=100`)
          .then((response) => {
            setDeputados(response.data.dados);
            setShowLoading(false);
          })
          .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
      } catch (error) {
        console.error("Ocorreu um erro ao buscar os items");
      }
    }
    getItems();
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">API Deputados</Toolbar>
      </AppBar>
      <br />
      <Container fixed>
       {showLoading && <CircularProgress /> }

        {deputados && !showLoading
          ? deputados.map(function (item, i) {
              return (
                <List
                  key={item.id}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemButton href={`deputado/detalhes?id=${item.id}`}>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={item.urlFoto} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.nome}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {item.siglaPartido}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </List>
              );
            })
          : ""}
      </Container>
    </>
  );
}
