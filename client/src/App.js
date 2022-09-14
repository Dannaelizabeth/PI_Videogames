import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/videogame' component={VideogameCreate}/>
        <Route path='/home/:id' component = {Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
