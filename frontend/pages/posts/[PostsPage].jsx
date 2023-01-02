import { Box, Center, Text, Button, IconButton, Icon } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AnuncioUser from "../../components/Anuncio/AnuncioUser";
import Masonry from "react-masonry-css";
import Navbar from "../../components/Navbar/Navbar";
import hora from "../../utils/hora";
import { getUserPosts } from "../../data/anuncios";
import { useUserStore } from "../../store/userStore";
import { likesData } from "../../data/likes";
import { useRouter } from "next/router";
import { usePostsContext } from "../../hooks/usePostsContext";
import { MdAdd, MdDelete } from "react-icons/md";
import NewPostButton from "../../components/Alerts/NewPost";

export const getServerSideProps = async (context) => {
  try {
    const res = await getUserPosts(
      context.req.headers.cookie,
      context.params.PostsPage
    );
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

const getPosts = async () => {
  const res = await getUserPosts(
    // context.req.headers.cookie,
    context.params.PostsPage
  );
  if (res.status === 200) {
    console.log("eliminado");
    return res.data;
  }
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
            <AnuncioUser
              name={post.user.name}
              numCasa={post.user.numcasa}
              postId={post._id}
              title={post.title}
              desc={post.desc}
              numLikes={post.numLikes}
              numDislikes={post.numDislikes}
              numComments={post.numComments}
              hora={hora(post.createdAt)}
              isLiked={isLiked(post._id, router.query.HomePage)}
            ></AnuncioUser>
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
      return { default: 2, 750: 1 };
    } else {
      return { default: 3, 1100: 2, 750: 1 };
    }
  };

  return (
    <div>
      <Navbar nombre={hasHydrated && userName ? userName : ""}></Navbar>
      <Center>
        {posts && posts.length > 0 ? (
          <Box mt={"30px"} px={"30px"}>
            <Masonry
              breakpointCols={breakpoints()}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {tarjetas()}
            </Masonry>
          </Box>
        ) : (
          <Text
            mt={"4rem"}
            fontStyle={"italic"}
            fontSize={"1.5rem"}
            color={"whiteAlpha.600"}
          >
            No posee publicaciones
          </Text>
        )}
      </Center>
      <NewPostButton />
    </div>
  );
}
