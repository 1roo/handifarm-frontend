import './App.css';
import './Custom.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/user/Login';
import Join from './components/user/Join';

import { Reset } from 'styled-reset'; 
import BoardList from './components/board/BoardList';


function App() {
  return (
    <Router>
      <Reset />
      <Header />

        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/join" element={ <Join /> } />
          <Route path="/board" element={ <BoardList /> } />
        </Routes>
        
      <Footer />  
    </Router>
  );
}

export default App;
