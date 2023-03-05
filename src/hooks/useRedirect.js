import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

/**
 * Checks the user login status with refresh token
 * Redirects user to the homepage
 * Credits- CI's Moments walthrough 
 */
export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    handleMount();
  }, [history, userAuthStatus]);
};
