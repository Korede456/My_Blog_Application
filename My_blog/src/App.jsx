import { Box } from "@chakra-ui/react";
import HomePage from "./components/homePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import "./App.css";
import CategoryPosts from "./components/CategoryPost";

function App() {
  return (
    <Box bg="#fff" w="100vw">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:post_slug" element={<PostDetail />} />
          <Route path="/tag/:tag_name/posts" element={<CategoryPosts />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
