import { useRouter } from "next/router";

export default function FirstPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <h1>
      Exibir aqui um card com os dados do deputado, rota
      https://dadosabertos.camara.leg.br/api/v2/deputados/204554
    </h1>
  );
}
