import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {

  return (
    <>
      <Router>

        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

      </Router>
    </>
  )
}

export default App
