// React
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// LIBS
import Moment from 'moment';

// API
import api from "../../services/v1";

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Compoentes
import ToolbarCustom from "../../componentes/toolbar";

export default function DespesasDeputado() {
  const router = useRouter();
  const id = router.query.id;
  const nomeDeputado = router.query.nomeDeputado;

  const [despesas, setDespesas] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      setShowLoading(true);
      try {
        if (id) {
          await api
            .get(`deputados/${id}/despesas`)
            .then((response) => {
              setDespesas(response.data.dados);
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

  const handleClick = (urlDocumento) => {
    window.open(urlDocumento);
  };

  return (
    <React.Fragment>
      <ToolbarCustom title="Despesas do deputado" nomeDeputado={nomeDeputado}/>

      <br />
      {despesas && !showLoading
        ? despesas.map(function (item, i) {
            return (
              <Container fixed>
                <Grid container spacing={2}>
                  <Grid md={12}>
                    <Box p={2}></Box>
                    <Card
                      variant="outlined"
                      sx={{ minWidth: 275 }}
                      key={item.numDocumento}
                    >
                      <CardContent>
                        <p>
                          <b>Fornecedor: </b> {item.nomeFornecedor}
                        </p>
                        <p>
                          <b>Tipo da despesa: </b>
                          {item.tipoDespesa} - {item.dataDocumento ? Moment(item.dataDocumento).format('DD/MM/YYYY') : "Data não fornecida"} 
                        </p>
                        <p>
                          <b>R$: </b>
                          {item.valorDocumento}
                        </p>
                        {item.urlDocumento ? (
                          <Chip
                            label="Documento"
                            variant="outlined"
                            onClick={() => handleClick(item.urlDocumento)}
                          />
                        ) : null}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Container>
            );
          })
        : ""}
  </React.Fragment>
  );
}
