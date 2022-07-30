// React
import * as React from "react";
import { useEffect, useState } from "react";

// API
import api from "../services/v1";

// MUI Componentes
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Compoentes
import ToolbarCustom from "../componentes/toolbar";

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
    <React.Fragment>
      <ToolbarCustom title="API Deputados" />

      <br />
      <Container fixed>
        {showLoading && <CircularProgress />}

        {/* {deputados && !showLoading
          ? deputados.map(function (item, i) {
              return (
                <List key={item.id}>
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
          : ""} */}

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {deputados.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia component="img" image={item.urlFoto} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {item.nome}
                    </Typography>
                    <Typography>
                      {item.siglaPartido} / {item.siglaUf}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      href={`deputado/detalhes?id=${item.id}`}
                    >
                      Consultar
                    </Button>
                  </CardActions>
                </Card>
                <Box p={2}></Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </React.Fragment>
  );
}
