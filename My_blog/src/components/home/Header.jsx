import SideNav from "./SideNav";
import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
//import { IoSearchSharp } from "react-icons/io5";
import Search from "../Search";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box
      w="100vw"
      px={{ base: "2%", sm: "5%", md: "10%" }}
      pos="fixed"
      zIndex={2}
      bg="gray.50"
      top="0"
      left="0"
      borderBottom="1px solid gray"
    >
      <Flex align="center" w="100%" h="100px">
        <Heading size="md">
          <Link to="/"> DEVSTACK-IMPROVE</Link>
        </Heading>
        <Spacer />
        <Flex gap="10px">
          <Search />
          <SideNav />
        </Flex>
      </Flex>
    </Box>
  );
};
export default Header;
