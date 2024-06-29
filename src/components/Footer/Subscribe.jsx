import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  Heading,
  Alert,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "https://korede456.pythonanywhere.com/blog/api/subscribe/",
        { email }
      );
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError(err.response.data.email[0]);
      setMessage("");
    }
  };

  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <Box my={{base:10}}>
      
      <Heading align="center" size="sm">Subscribe to Our News Letter</Heading>
      <FormControl id="email" my={{base:10}}>
        <Flex align="center" mt={3}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            border="1px solid white"
          />
          <Button onClick={handleSubscribe} colorScheme="teal">
            Subscribe
          </Button>
        </Flex>
      </FormControl>
      <Box>
        {message && (
          <Alert status="success" mt={4}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert status="error" mt={4}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Subscribe;
