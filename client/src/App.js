import './App.css';
import {Route, useLocation } from "react-router-dom"
import {LandingPage, Home, Detail, Form,} from "./views"
import NavBar from"./Components/NavBar/NavBar"
function App() {
  const location=useLocation()
  return (

    <div className="App">
      {location.pathname !== "/" && <NavBar/>}
      <div>
      <Route exact path="/" render={()=><LandingPage/>}/>
      <Route exact path="/home" render={()=><Home/>}/>
      <Route exact path="/Form" render={()=><Form/>}/>
      <Route exact path="/detail/:id" render={()=><Detail/>}/>
      </div>
    </div>

  );
}

export default App;
