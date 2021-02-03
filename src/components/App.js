import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header/Header';
import Login from './Candidates/Auth/Login';
import UserContextProvider from '../contexts/UserContext';
import Feed from './Candidates/Feed';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import CV from './Candidates/CV';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div className="App">
          <header>
            <Header />
          </header>
          <main>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/candidate/login" component={Login} />
              <Route path="/candidate/feed" component={Feed} />
              <Route path="/candidate/cv" component={CV} />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;
