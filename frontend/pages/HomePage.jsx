import { Box, HStack, Stack, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Anuncio from "../components/Anuncio/Anuncio";
import Masonry from "react-masonry-css";
import Header from "../components/Navbar/Header";

export default function HomePage() {
  const titulos = Array.from({ length: 7 }, (_, i) => "Titulo " + (i + 1));

  const tarjetas = () => {
    return titulos.map((titulo) => {
      return (
        <div key={titulo}>
          <Anuncio titulo={titulo}></Anuncio>;
        </div>
      );
    });
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Header></Header>
      {/* <Center mt={"4rem"}> */}
        <Center mt={"30px"}>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {tarjetas()}
          </Masonry>
        </Center>
      {/* </Center> */}
    </div>
  );
}
