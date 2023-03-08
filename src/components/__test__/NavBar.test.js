import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import NavBar from '../NavBar'

import { CurrentUserProvider } from '../../contexts/CurrentUserContext';

test('Renders the NavBar and checks if all the links for logged out users are there', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    // screen.debug();


    const SignInLink = screen.getByRole('link', {name: 'Sign in'});
  
    expect(SignInLink).toBeInTheDocument();
});

// test('Renders the NavBar and checks if all the links for logged in users are there', async () => {
//     render(
//         <Router>
//             <CurrentUserProvider>
//                 <NavBar />
//             </CurrentUserProvider>
//         </Router>
//     );
//     const homeLink = await screen.findByRole('link', {name: 'Home'});
//     const recommendationsLink = await screen.findByRole('link', {name: 'Recommendations'});
//     const likedLink = await screen.findByRole('link', {name: 'Liked'});
//     const logOutLink = await screen.findByRole('link', {name: 'Log out'});
    
//     expect(homeLink).toBeInTheDocument();
//     expect(recommendationsLink).toBeInTheDocument();
//     expect(likedLink).toBeInTheDocument();
//     expect(logOutLink).toBeInTheDocument();
// });

// test('Renders the NavBar and checks if all the links for logged out users are there', async () => {
//     render(
//         <Router>
//             <CurrentUserProvider>
//                 <NavBar />
//             </CurrentUserProvider>
//         </Router>
//     );

//     const signOutLink = await screen.findByRole('link', {name: 'Sign out'});
//     fireEvent.click(signOutLink);
    
//     const homeLink = await screen.findByRole('link', {name: 'Home'});
//     const logInLink = await screen.findByRole('link', {name: 'Sign In'});
//     const signUpLink = await screen.findByRole('link', {name: 'Sign Up'});

//     expect(homeLink).toBeInTheDocument();
//     expect(logInLink).toBeInTheDocument();
//     expect(signUpLink).toBeInTheDocument();
});