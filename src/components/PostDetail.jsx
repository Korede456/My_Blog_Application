import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Image,
  Avatar,
  Flex,
  Spinner,
  Spacer,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import PropTypes from "prop-types";

//what is wrong with the bellow code
const PostDetail = () => {
  const { post_slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  useEffect(() => {
    fetchPostsByTag(post_slug);
  }, [post_slug]);

  const fetchPostsByTag = (slug) => {
    fetch(`https://korede456.pythonanywhere.com/blog/api/posts/${slug}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
        fetchRelatedPosts(data.id);
        fetchComments(data.id);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const fetchRelatedPosts = (postId) => {
    fetch(`https://korede456.pythonanywhere.com/blog/api/posts/${postId}/related/`)
      .then((response) => response.json())
      .then((data) => setRelatedPosts(data))
      .catch((error) => console.error("Error fetching related posts:", error));
  };

  const fetchComments = (postId) => {
    fetch(`https://korede456.pythonanywhere.com/blog/api/posts/${postId}/comments/`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`https://korede456.pythonanywhere.com/blog/api/posts/${post.id}/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setComments([data, ...comments]);
        setNewComment({ name: "", email: "", body: "" });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  function AboutPage() {
    useEffect(() => {
      document.title = `${post.title}`;
    }, [post]);

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
      <Box w="100%" px={{ base: "2%", sm: "5%", md: "10%" }}>
        <Header />
        <Text pt="150">
          The page you&#39;re trying to access does not exist
        </Text>
        <Text py="10">
          {" "}
          Click{" "}
          <Text color="blue" display="inline">
            <Link to="/">here</Link>
          </Text>{" "}
          to go back to the home page
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box w="100%" px={{ base: "2%", sm: "5%" }} mb="50" pt="150">
        <Flex dir="row" display={{base:"block", md:"flex"}}>
          <Box w={{ base: "100%", md: "65%" }}>
            <Heading align="center"mb="3">{post.title}</Heading>
            <Flex align="center" gap="10px" my="10px">
              <Avatar src={`data:image/jpeg;base64,${post.author_avatar}`} />
              <Text mr="10">{post.author_name}</Text>
              <Text>{post.formatted_date}</Text>
              {post.category && (
                <Text
                  ml="auto"
                  p="10px"
                  bg="teal"
                  borderRadius="5px"
                  color="white"
                >
                  <Link to={`/tag/${post.category}/posts`}>
                    {post.category}
                  </Link>
                </Text>
              )}
            </Flex>
            <Image
              src={`data:image/jpeg;base64,${post.thumbnail}`}
              alt={post.title}
              borderRadius="10px"
              mb="20px"
              w="100%"
              h={{base:"200", sm:"250", md:"400"}}
            />
            <Box my="20" className="markdown">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {post.body}
              </ReactMarkdown>
            </Box>
            <Box mt="40px" w={{ base: "100%", md: "60%", lg: "50%" }}>
              <Heading size="md" mb="20px">
                Comments
              </Heading>
              {comments.map((comment) => (
                <Box
                  key={comment.id}
                  mb="20px"
                  p="10px"
                  borderWidth="1px"
                  borderRadius="lg"
                >
                  <Text fontWeight="bold">{comment.name}</Text>
                  <Text>{comment.body}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(comment.created).toLocaleString()}
                  </Text>
                </Box>
              ))}
              <Box>
                <Heading size="md" mt="40px" mb="20px">
                  Add a Comment
                </Heading>
                <form onSubmit={handleCommentSubmit}>
                  <FormControl mb="20px">
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={newComment.name}
                      onChange={handleCommentChange}
                      required
                      border="1px solid grey"
                    />
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={newComment.email}
                      onChange={handleCommentChange}
                      required
                      border="1px solid grey"
                    />
                  </FormControl>
                  <FormControl mb="20px">
                    <FormLabel>Comment</FormLabel>
                    <Textarea
                      name="body"
                      value={newComment.body}
                      onChange={handleCommentChange}
                      required
                      border="1px solid grey"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="teal">
                    Submit
                  </Button>
                </form>
              </Box>
            </Box>
          </Box>
          <Spacer />
          <Box w={{ base: "100%", md: "30%" }} >
            <Heading w="100%" mb="20px" align="center">
              Similar Posts
            </Heading>
            {relatedPosts.map((relatedPost) => (
              <Box key={relatedPost.id} my="20">
                <Link to={`/post/${relatedPost.slug}`}>
                  <Image
                    src={`data:image/jpeg;base64,${relatedPost.thumbnail}`}
                    alt={post.title}
                    borderRadius="10px"
                    mb="20px"
                    w="100%"
                    h={{base:"200", md:"250"}}
                  />
                </Link>
                <Heading size="sm" align="center">{relatedPost.title}</Heading>
                <hr />
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

const MarkdownComponent = ({ markdownContent }) => {
  return <ReactMarkdown>{markdownContent}</ReactMarkdown>;
};

MarkdownComponent.propTypes = {
  markdownContent: PropTypes.string.isRequired,
};
export default PostDetail;
