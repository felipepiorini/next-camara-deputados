import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function DetalhesDeputado() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <List>
        <ListItem>
          <ListItemText primary=" - Com base na tela inicial criar a tela de detalhes mostrando mais informações do deputado" />
        </ListItem>
        <ListItem>
          <ListItemText primary="- O parametro para filtrar o deputado ja esta nessa tela" />
        </ListItem>
        <ListItem>
          <ListItemText primary=" - Nesta tela deve conter a foto, nome, informaçoes de contato" />
        </ListItem>
        <ListItem>
          <ListItemText primary=" - Incluir botão para consultar despesas, frentes parlamentares e discursos" />
        </ListItem>
        <ListItem>
          <ListItemText
            primary=" Exibir aqui um card com os dados do deputado, rota
            https://dadosabertos.camara.leg.br/api/v2/deputados/idDoDeputado"
          />
        </ListItem>
      </List>
    </>
  );
}
