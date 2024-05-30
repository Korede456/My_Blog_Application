import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box w="100%" overflowX="hidden">
        <App />
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
