import { Box, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <Box
      w="100%"
      px={{ base: "2%", sm: "5%", md: "10%" }}
      pt="50"
      bg="rgba(0,0,0,0.1)"
    >
      <Flex
        direction={{ sm: "column", md: "row" }}
        w="100%"
        justify="space-between"
      >
        <Box w={{ sm: "100%", md: "30%" }}>
          <Heading size="sm">About</Heading>
          <Text>
            Welcome to DEVSTACK-IMPROVE, your go-to source for the latest
            insights and trends in the ever-evolving world of technology. At
            Tech Nich, we are passionate about exploring the cutting-edge
            advancements that are shaping our digital future. Our mission is to
            provide you with in-depth articles, expert analyses, and practical
            guides on a wide range of topics, including cybersecurity,
            artificial intelligence, software development, and more.
          </Text>
          <Text>Email: info@devstack-improve.com</Text>
          <Text>Phone: +2347033300647</Text>
        </Box>
        <Flex direction="row" gap="20px">
          <Box>
            <Heading size="sm">Quick Link</Heading>
            <VStack>
              <Link>Home</Link>
              <Link>About</Link>
            </VStack>
          </Box>
          <Box>
            <Heading size="sm">Category</Heading>
            <VStack>
              <Link>Home</Link>
              <Link>About</Link>
            </VStack>
          </Box>
        </Flex>
        <Box>
          <Subscribe />
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
