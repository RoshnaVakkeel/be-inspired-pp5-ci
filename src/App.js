import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route,Switch } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h2>Home Page</h2>} />
          <Route exact path="/signup" render={() => <h2>Sign Up</h2>} />
          <Route exact path="/signin" render={() => <h2>Sign in</h2>} />
          <Route render={() => <h2>Page not found</h2>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;