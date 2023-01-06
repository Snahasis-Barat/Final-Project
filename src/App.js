import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import ShowUsers from './ShowUsers';
import EditEmployee from './EditEmployee';
import CreateUser from './CreateUser';
import Navigation from './Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      
      <Router>
   <Navigation/>
   <Routes>
    <Route path="/" element={<ShowUsers/>}/>
    <Route path="/CreateUser" element={<CreateUser/>}/>
    <Route path="/editEmployee/:empId" element={<EditEmployee/>}/>
    
   </Routes>
  </Router>
    </div>
  );
}

export default App;
