import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <h2>Home Page</h2>
        <h2>Sign In</h2>
        <h2>Sign Up</h2>
      </Container>
    </div>
  );
}

export default App;