// React
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// API
import api from "../../services/v1";

// MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

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
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Avatar alt="Remy Sharp" src={deputado.ultimoStatus.urlFoto} />
          <h3>{deputado.nomeCivil}</h3>
        </CardContent>
        <CardActions>
          <Button size="small">Despesas</Button>
          <Button size="small">Discursos</Button>
          <Button size="small">Frentes Parlamentares</Button>
        </CardActions>
      </Card>
    </>
  );
}
