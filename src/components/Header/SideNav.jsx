import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  List,
  ListItem,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://korede456.pythonanywhere.com/blog/api/tags/")
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <GiHamburgerMenu />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#fff" />
          <DrawerBody>
            <Box p="4">
              <List spacing={3}>
                {tags.map((tag) => (
                  <ListItem key={tag.id} color="#fff">
                    <Link to={`/tag/${tag.name}/posts`} onClick={onClose}>
                      {tag.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
