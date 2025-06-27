import AuthForm from './pages/AuthForm'
import { Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import About from './pages/About';
import Home from './pages/Home';
const App = () => {
  return (


    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<AuthForm mode="signup"/>} />

// Login route
        <Route path="/login" element={<AuthForm mode="login" />} />

        <Route path='/aboutus' element={<About />} />
        <Route path='/home' element= {<Home />}/>
      </Routes>
      <Footer />

    </>

  )
};

export default App;
