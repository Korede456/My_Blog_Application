import { Box } from "@chakra-ui/react";
import Header from "./Header/Header";
import Carousel from "./carousel";
import PostList from "./PostList";
import Footer from "./Footer/Footer";

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
