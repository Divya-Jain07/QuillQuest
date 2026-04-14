import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/quiz/:id" element={<div>Quiz coming up!!!</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;