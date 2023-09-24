import './App.css';
import SignIn from './components/SignIn';
import Otp from './components/Otp';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route exact path='/otp' element={<Otp />} />
          <Route exact path='/welcome' element={<Welcome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
