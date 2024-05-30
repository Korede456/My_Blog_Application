import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CategoryPosts = () => {
  const { tagId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/blog/api/tags/${tagId}/posts/`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts");
        setLoading(false);
      });
  }, [tagId]);

  if (loading) {
    return <Spinner size="xl" />;
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
    <Box p="4">
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
    </Box>
  );
};

export default CategoryPosts;
