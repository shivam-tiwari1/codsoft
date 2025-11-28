import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "20px", color: "#fff" }}>Home</Link>
      <Link to="/create" style={{ marginRight: "20px", color: "#fff" }}>Create Quiz</Link>
      <Link to="/quiz-list" style={{ color: "#fff" }}>Quiz List</Link>
    </nav>
  );
}
