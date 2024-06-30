// LatestPostsCarousel.js
import { useState, useEffect } from "react";
import Slider from "react-slick";
import {
  Box,
  Image,
  Heading,
  Skeleton,
  VStack,
  Text,
  Spacer,
  Avatar,
  Flex,
  Button,
} from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://korede456.pythonanywhere.com/blog/api/trending/")
      .then((response) => {
        console.log("Response:", response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} pt="150px">
        <Skeleton height="250px" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} pt="150px">
        Error: {error.message}
      </Box>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} pt="150px">
      <Heading pb="10px">Trending Posts</Heading>
      <Slider {...settings}>
        {posts.map((post) => (
          <Box
            key={post.id}
            position="relative"
            textAlign="center"
            borderRadius="10px"
          >
            <Link to={`/post/${post.slug}`}>
              <Image
                src={`data:image/jpeg;base64,${post.thumbnail}`}
                alt={post.title}
                borderRadius="10px"
                h={{ base:"250", sm:"300", md: "350px", lg: "500px" }}
                m="auto"
                w="100%"
              />
            </Link>
            <VStack
              position="absolute"
              bottom="20px"
              left="20px"
              color="white"
              bg="rgba(0, 0, 0, 0.5)"
              p="10px"
              borderRadius="10px"
              align="left"
            >
              <Box w="auto" align="left">
                {post.category && (
                  <Button color="#63B3ED" colorScheme="blackAlpha">
                    {post.category}
                  </Button>
                )}
              </Box>
              <Heading size="sm" my="10px">
                {post.title}
              </Heading>
              <Flex
                w="100%"
                align="center"
                justify="space-between"
                direction="row"
                gap="10px"
              >
                <Flex align="center" gap="10px">
                  <Avatar
                    size="sm"
                    name="Kent Dodds"
                    src={`data:image/jpeg;base64,${post.author_avatar}`}
                  />
                  <Text color="grey">{post.author_name}</Text>
                </Flex>
                <Spacer />
                <Text color="grey">{post.formatted_date}</Text>
              </Flex>
            </VStack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;

