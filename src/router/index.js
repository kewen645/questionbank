import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "@/App"
import Register from "@/views/Register/Register"
import Login from "@/views/Login/Login"
import Home from "@/views/Home/Home"
import Fast from "@/views/Fast/Fast"
import User from "@/views/User/User"
import Choose from "@/views/Choose/Choose"
import Practice from "@/views/Practice/Practice"

const BaseRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/fast" element={<Fast />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/choose/:code" element={<Choose />} />
          <Route path="/practice" element={<Practice />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default BaseRouter