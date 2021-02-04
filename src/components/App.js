import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import Home from './Home/Home';
import Header from './Header/Header';
import Login from './Auth/Login';
import UserContextProvider from '../contexts/UserContext';
import Feed from './Candidates/Feed';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import CV from './Candidates/CV';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import Offers from './Offers/Offers';
import OffersList from './Offers/OffersList';
import OfferView from './Offers/OfferView';
import OffersSearch from './Candidates/OffersSearch';
import Applies from './Candidates/Applies';
import CVView from './Companies/CVView';
import Meetings from './Meetings/Meetings';

function App() {
  return (
    <ToastProvider placement="top-center">
      <Router>
        <UserContextProvider>
          <div className="App">
            <header>
              <Header />
            </header>
            <main>
              <NavBar />
              <div className="feed-container">
                <Switch>
                  <ProtectedRoute exact path="/" component={Feed} />
                  <Route path="/companies/offers/create" component={Offers} />
                  <Route
                    exact
                    path="/companies/offers"
                    component={OffersList}
                  />
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/candidates/feed" component={Feed} />
                  <Route path="/candidates/cv" component={CV} />
                  <Route path="/offers/:offer_id" component={OfferView} />
                  <Route path="/candidates/offers" component={OffersSearch} />
                  <Route
                    exact
                    path="/:environment/applies"
                    component={Applies}
                  />
                  <Route
                    path="/companies/offers/:offer_id/candidate/:candidate_id"
                    component={CVView}
                  />
                </Switch>
              </div>
              <Meetings />
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </UserContextProvider>
      </Router>
    </ToastProvider>
  );
}

export default App;
