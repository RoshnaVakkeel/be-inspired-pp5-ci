import React from 'react';
import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import './api/axiosDefaults';
import LandingPage from './components/LandingPage';
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from './pages/posts/PostPage';
import PostEditForm from './pages/posts/PostEditForm';

import { useCurrentUser } from './contexts/CurrentUserContext';
import PostsListPage from './pages/posts/PostsListPage';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ProfilePasswordChange from './pages/profiles/ProfilePasswordChange';
import RecommendationCreateForm from './pages/recommendations/RecommendationCreateForm';
import RecommendationPage from './pages/recommendations/RecommendationPage';
import RecommendationsListPage from './pages/recommendations/RecommendationsListPage';
import FullListPage from './pages/posts_recommendations/fullListPage';
import RecommendationEditForm from './pages/recommendations/RecommendationEditForm';
import PageNotFound from './components/PageNotFound';


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>

      {!currentUser ? (
        <Switch>
          <Route exact path="/" render={() => <LandingPage />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route render={() => <LandingPage />} />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsListPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/recommendations"
            render={() => (
              <RecommendationsListPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <>
                <FullListPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              </>
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <>
                <FullListPage
                  message="No results found. Adjust the search keyword or like a post or a recommendation."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_on&`}
                />
              </>
            )}
          />

          <Route exact path="/posts/create" render={() => <PostCreateForm />} />
          <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
          <Route exact path="/posts/:id" render={() => <PostPage />} />

          <Route exact path="/recommendations/create" render={() => <RecommendationCreateForm />} />
          <Route exact path="/recommendations/:id/edit" render={() => <RecommendationEditForm/>} />
          <Route exact path="/recommendations/:id" render={() => <RecommendationPage />} />

          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <ProfilePasswordChange />} />

          <Route render={() => <PageNotFound />} />
        </Switch>
      )}
      </Container>
    </div>
  );
}


export default App;