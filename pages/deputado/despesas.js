// React
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// API
import api from "../../services/v1";

// MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function DespesasDeputado() {
  const router = useRouter();
  const id = router.query.id;

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
    <>
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
                          {item.tipoDespesa} - {item.dataDocumento}
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
    </>
  );
}
