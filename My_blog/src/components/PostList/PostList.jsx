import {
  Box,
  Flex,
  Heading,
  Card,
  Text,
  Image,
  Stack,
  Skeleton,
  Button,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = (page) => {
    setLoading(true);
    fetch(`http://localhost:8000/blog/api/posts/?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.results);
        setHasNextPage(data.next !== null);
        setHasPreviousPage(data.previous !== null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  if (loading) {
    return (
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} my="50">
        <Flex w="100%" align="center" justify="space-evenly" wrap="wrap">
          {Array.from({ length: 12 }).map((_, index) => (
            <Stack
              key={index}
              w={{ sm: "100%", md: "48%", lg: "32%" }}
              gap="20px"
              my="10px"
            >
              <Skeleton height="200px" w="100%" />
              <Skeleton height="20px" w="100%" />
              <Skeleton height="20px" w="100%" />
            </Stack>
          ))}
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }}>
        Error: {error.message}
      </Box>
    );
  }

  return (
    <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} my="50">
      <Heading align="center">Posts</Heading>
      <Flex justify="space-between" mt="20px">
        {hasPreviousPage && (
          <Button color="teal" onClick={handlePreviousPage}>
            Previous
          </Button>
        )}
        {hasNextPage && (
          <Button color="teal" onClick={handleNextPage}>
            Next
          </Button>
        )}
      </Flex>
      <Flex w="100%" align="stretch" justify="space-between" wrap="wrap">
        {posts.map((post) => (
          <Card
            key={post.id}
            display="flex"
            direction="column"
            align="center"
            w={{ sm: "100%", md: "48%", lg: "32%" }}
            my="10px"
            p="2"
            bg="inherit"
            color="black"
            gap="20px"
          >
            <Link to={`/post/${post.id}`} w="100%" h="250px">
              <Image
                w="100%"
                src={`data:image/jpeg;base64,${post.thumbnail}`}
                alt={post.title}
                borderRadius="10px"
                h="100%"
              />
            </Link>
            <Box w="100%" align="left">
              {post.category && (
                <Button color="#63B3ED" colorScheme="blackAlpha">
                  {post.category}
                </Button>
              )}
            </Box>
            <Heading size="sm" px="20px" weight="bold">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </Heading>
            <Spacer />
            <Flex
              w="100%"
              align="center"
              justify="space-between"
              direction="row"
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
          </Card>
        ))}
      </Flex>
      <Flex justify="space-between" mt="20px">
        {hasPreviousPage && (
          <Button color="teal" onClick={handlePreviousPage}>
            Previous
          </Button>
        )}
        {hasNextPage && (
          <Button color="teal" onClick={handleNextPage}>
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default PostList;
