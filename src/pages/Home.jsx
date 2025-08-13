import React from "react";
import { Helmet } from "react-helmet-async";
import HeaderBottom from "@/components/HeaderBottom";
import Trabajos from "@/components/Trabajos/Trabajos";
import Beneficios from "@/components/Beneficios/Beneficios";
import Layout from "@/components/Layout";
import Testimonials from "@/components/Testimonios/Testimonials";
import Header from "@/components/Header/Header";

const Home = () => {
  return (
    <Layout>
      <Helmet>
        <title>Logística Argentina - Soluciones de Transporte</title>
        <meta
          name="description"
          content="Optimiza tu logística con transporte eficiente, seguimiento y cobertura nacional."
        />
        <meta property="og:title" content="Logística Argentina" />
        <meta
          property="og:description"
          content="Expertos en distribución y transporte en todo el país."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.logistica-argentina.com" />
        <meta property="og:image" content="https://www.logistica-argentina.com/og-image.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Header />
      <HeaderBottom />
      <Trabajos />
      <Beneficios />
      <Testimonials />
    </Layout>
  );
};

export default Home;
