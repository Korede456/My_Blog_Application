import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  Avatar,
  Text,
  Spacer,
  Card,
  Image,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "../home/Header";
import Footer from "../home/Footer";

const CategoryPosts = () => {
  const { tag_name } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPostsByTag(tag_name);
  }, [tag_name]);

  const fetchPostsByTag = (tagName) => {
    setLoading(true);
    fetch(`http://localhost:8000/blog/api/tags/${tagName}/posts/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Box>
        <Header />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Spinner size="xl" />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Header />
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }} my="50">
        <Flex
          w="100%"
          align="stretch"
          justify="space-between"
          wrap="wrap"
          mt="100"
          pt="50"
        >
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
              <Image
                w="100%"
                src={`data:image/jpeg;base64,${post.thumbnail}`}
                alt={post.title}
                borderRadius="10px"
                h="200"
              />

              <Box w="100%" align="left">
                {post.category && (
                  <Button color="teal" colorScheme="blackAlpha">
                    {post.category}
                  </Button>
                )}
              </Box>
              <Heading size="sm" px="20px" weight="bold">
                <Link to={`/post/${post.slug}`}>{post.title}</Link>
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
      </Box>
      <Footer />
    </Box>
  );
};

export default CategoryPosts;

{
  /* <Box p="4" mt="100">
<Heading as="h2" size="lg" mb="4">
  Posts for Tag {tagId}
</Heading>
<List spacing={3}>
  {posts.map((post) => (
    <ListItem key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </ListItem>
  ))}
</List>
</Box> */
}
