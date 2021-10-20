import './App.css';
import FileUpload from './components/Fileupload'
import Signup from "./components/Signup"
import Login from "./components/Login"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Getfiles from './components/Getfiles';

// import Login from "./components/Login"
// import PrivateRoute from "./PrivateRoute"
// import ForgotPassword from "./components/ForgotPassword"

const App=()=> {
  return(
    <Router>
  
    <div>
      <Switch>
        <Route path='/signup'>
      <Signup/>
      </Route>
      <Route  path='/login'>
      <Login/>
      </Route>
      <Route path='/fileupload'>
       <div className='container mt-4'>
          <h4 className='display-4 text-center mb-4'>
            <i className='fab fa-react' /> File Dash
           </h4>
           <FileUpload />
        </div>
      </Route>
      <Route path='/getfiles'>
        <Getfiles />
      </Route>
      </Switch>
    </div>
    
    </Router>








  )
}

export default App;
