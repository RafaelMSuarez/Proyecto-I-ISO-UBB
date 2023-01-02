import { Box, Center } from "@chakra-ui/react";
import { useState, useEffect, useReducer } from "react";
import Anuncio from "../../components/Anuncio/Anuncio";
import Masonry from "react-masonry-css";
import Navbar from "../../components/Navbar/Navbar";
import hora from "../../utils/hora";
import { getPosts } from "../../data/anuncios";
import { useUserStore } from "../../store/userStore";
import { likesData } from "../../data/likes";
import { useRouter } from "next/router";
import { usePostsContext } from "../../hooks/usePostsContext";

export const getServerSideProps = async (context) => {
  try {
    const res = await getPosts(context.req.headers.cookie);
    const likes = await likesData();
    if (res.status === 200) {
      return {
        props: {
          anuncios: res.data,
          likesD: likes,
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function HomePage({ anuncios, likesD }) {
  const { posts, dispatch } = usePostsContext();
  // const [posts, setPosts] = useState(anuncios);
  const userName = useUserStore((state) => state.name);
  const [likes] = useState(likesD);
  const hasHydrated = useHasHydrated();
  const router = useRouter();

  useEffect(() => {
    dispatch({ type: "set_posts", payload: anuncios });
  }, []);

  function isLiked(postId, id) {
    if (likes.length > 0) {
      for (const like of likes) {
        if (like.post == postId && like.user._id == id) {
          return true;
        }
      }
      return false;
    }
  }

  const tarjetas = () => {
    if (posts && posts.length > 0) {
      return posts.map((post) => {
        return (
          <div key={post._id}>
            <Anuncio
              postId={post._id}
              name={post.user.name}
              numCasa={post.user.numcasa}
              title={post.title}
              desc={post.desc}
              numLikes={post.numLikes}
              numDislikes={post.numDislikes}
              numComments={post.numComments}
              hora={hora(post.createdAt)}
              isLiked={isLiked(post._id, router.query.HomePage)}
            ></Anuncio>
            ;
          </div>
        );
      });
    }
  };

  const breakpoints = () => {
    if (posts && posts.length == 1) {
      return 1;
    }
    if (posts && posts.length == 2) {
      return { default: 2, 766: 1 };
    } else {
      return { default: 3, 1100: 2, 766: 1 };
    }
  };

  return (
    <div>
      <Navbar nombre={hasHydrated && userName ? userName : ""} />
      <Center>
        <Box mt={"30px"} px={"30px"}>
          <Masonry
            breakpointCols={breakpoints()}
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
