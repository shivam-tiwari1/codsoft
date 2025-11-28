import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";
import QuizResult from "./pages/QuizResult";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/take/:id" element={<TakeQuiz />} />
        <Route path="/result/:id" element={<QuizResult />} />
        
      </Routes>
    </Router>
  );
}

export default App;
