import { Box, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Anuncio from "../components/Anuncio/Anuncio";
import Masonry from "react-masonry-css";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import hora from "../utils/hora";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await axios.get(`${process.env.API_URL}/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await fetch(`${process.env.API_URL}/posts`);
  //     const json = await res.json();

  //     if (res.ok) {
  //       setPosts(json);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const titulos = Array.from({ length: 4 }, (_, i) => "Titulo " + (i + 1));

  const tarjetas = () => {
    if (posts.length > 0) {
      return posts.map((post) => {
        return (
          <div key={post._id}>
            <Anuncio
              name={post.user.name}
              numCasa={post.user.numcasa}
              title={post.title}
              desc={post.desc}
              likes={post.likes}
              dislikes={post.dislikes}
              numComments={post.numComments}
              hora={hora(post.createdAt)}
            ></Anuncio>
            ;
          </div>
        );
      });
    }
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Navbar></Navbar>
      <Center>
        <Box mt={"30px"} px={"30px"}>
          <Masonry
            breakpointCols={posts.length == 1 ? 1 : breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {tarjetas()}
          </Masonry>
        </Box>
      </Center>
    </div>
  );
}
