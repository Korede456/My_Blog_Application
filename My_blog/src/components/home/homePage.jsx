import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Carousel from "../PostList/carousel";
import PostList from "../PostList/PostList";
import Footer from "./Footer";

const homePage = () => {
  return (
    <Box bg="#fff">
      <Header />
      <Carousel />
      <PostList />
      <Footer/>
    </Box>
  );
};

export default homePage;
