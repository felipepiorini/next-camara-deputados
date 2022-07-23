// React
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// API
import api from "../../services/v1";

// LIBS
import Moment from "moment";

// MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export default function DetalhesDeputado() {
  const router = useRouter();
  const id = router.query.id;

  const [deputado, setDeputado] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      setShowLoading(true);
      try {
        if (id) {
          await api
            .get(`deputados/${id}`)
            .then((response) => {
              setDeputado(response.data.dados);
              setShowLoading(false);
            })
            .catch((err) => {
              console.error("ops! ocorreu um erro" + err);
            });
        }
      } catch (error) {
        console.log(error);
        console.error("Ocorreu um erro ao buscar os items");
      }
    }
    getItems();
  }, [id]);

  return (
    <Container fixed>
      <Card variant="outlined" sx={{ minWidth: 275 }} key={deputado.id}>
        <CardContent>
          <Grid container>
            <Grid md={2}>
              <img alt="Remy Sharp" src={deputado.ultimoStatus?.urlFoto} />
            </Grid>
            <Grid md={8}>
              <h3>{deputado.nomeCivil}</h3>
              <p>
                <b>Partido:</b> {deputado.ultimoStatus?.siglaPartido}/
                {deputado.ultimoStatus?.siglaUf} -{" "}
                {deputado.ultimoStatus?.email}
              </p>
              <p>
                <b>CPF:</b> {deputado.cpf}
              </p>
              <p>
                <b>Data Nascimento:</b>{" "}
                {deputado.dataNascimento
                  ? Moment(deputado.dataNascimento).format("DD/MM/YYYY")
                  : "Data não fornecida"}
              </p>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="success"
            href={`despesas?id=${deputado.id}`}
          >
            Despesas
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            href={`discursos?id=${deputado.id}`}
          >
            Discursos
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            href={`frentes?id=${deputado.id}`}
          >
            Frentes Parlamentares
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
