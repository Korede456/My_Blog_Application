import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Link,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";
import Subscribe from "./Subscribe";

const Footer = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/blog/api/tags/")
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  return (
    <Box
      w="100%"
      px={{ base: "2%", sm: "5%", md: "10%" }}
      pt="50"
      pb="20"
      bg="rgba(0,0,0,0.1)"
    >
      <Flex
        direction={{ sm: "column", md: "row" }}
        w="100%"
        justify="space-between"
        display={{ base: "block", md: "flex" }}
      >
        <Box w={{ base: "100%", md: "30%" }}>
          <Heading size="sm" m="auto" align="center">
            About
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            blanditiis facere corporis quod libero error non dolorum, illum
            laboriosam soluta atque facilis totam quas id commodi nostrum ab
            hic? Repellendus.
          </Text>
          <Text>
            <strong>Email:</strong> info@devstack-improve.com
          </Text>
          <Text>
            <strong>Phone:</strong> +0123456789
          </Text>
        </Box>

        <Box>
          <Subscribe />
        </Box>
        <Box>
          <Heading size="sm">Quick Link</Heading>
          <List spacing={3}>
            {tags.map((tag) => (
              <ListItem key={tag.id}>
                <Link to={`/tag/${tag.name}/posts`}>{tag.name}</Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
