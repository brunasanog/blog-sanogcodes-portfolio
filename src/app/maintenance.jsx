import Head from "next/head";

export default function Maintenance() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <Head>
        <title>Em Manutenção</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Estamos em Manutenção</h1>
      <p>Voltaremos em breve com novidades! Agradecemos a sua paciência.</p>
    </div>
  );
}
