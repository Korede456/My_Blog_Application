import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  Input,
  Flex,
  Spinner,
  List,
  ListItem,
  Container
} from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://korede456.pythonanywhere.com/blog/api/search/?query=${query}`)
        .then((response) => {
          setResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError("Error fetching search results");
          console.log(error);
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        align="center"
        bg="RGBA(0, 0, 0, 0.16)"
        rounded="5"
        cursor="pointer"
      >
        <Text px="5px">Search</Text>
        <Button bg="RGBA(0, 0, 0, 0.24)">
          <IoSearchSharp />
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="teal">
          <ModalBody>
            <Input
              value={query}
              onChange={handleInputChange}
              placeholder="Search posts..."
              mb="10px"
              color="#fff"
              border="2px solid white"
            />
            {loading && <Container align="center"><Spinner /></Container>}
            {error && <Text color="#fff" align="center">Search not found</Text>}
            <List spacing={2}>
              {results != null ? (
                results.map((post) => (
                  <ListItem
                    key={post.id}
                    p="10px"
                    borderWidth="1px"
                    borderRadius="md"
                    color="#fff"
                  >
                    <Link to={`/post/${post.id}`}>
                      <Text onClick={onClose}>
                        {post.title}
                      </Text>
                    </Link>
                  </ListItem>
                ))
              ) : (
                <Text>No results found</Text>
              )}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
