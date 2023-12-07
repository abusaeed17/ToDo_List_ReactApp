
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CompletedTasks from "./containers/CompletedTasks";
import Home from "./containers/Home";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<CompletedTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;