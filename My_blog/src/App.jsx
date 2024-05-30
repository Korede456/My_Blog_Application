import { Box } from "@chakra-ui/react";
import HomePage from "./components/home/homePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetail from "./components/postDetail/PostDetail";
import "./App.css";
import CategoryPosts from "./components/PostList/CategoryPost";

function App() {
  return (
    <Box bg="#fff" w="100vw">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/tag/:tagId/posts" element={<CategoryPosts />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
