import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Credit: Moments Walkthrough CI
 *   Renders and updates different types of data for the InfiniteScroll component
 *  Sends a request to the next page of results
 * Filters out any duplicates of the posts already displayed if new posts have been added in the meantime
*/
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next, // link to the next page of results
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) { }
};

/**
* Increases the followers_count and following_count variables by 1.
*/
export const followHelper = (profile, clickedProfile, following_id) => {
  return profile.id === clickedProfile.id
    ? {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    } : profile.is_owner
      ? {
        ...profile,
        following_count: profile.following_count + 1,
      } :
      profile;
}

/**
* Decreases the followers_count and following_count variables by 1.
*/
export const unfollowHelper = (profile, clickedProfile) => {
  return profile.id === clickedProfile.id
    ? {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    } :
    profile.is_owner
      ? {
        ...profile,
        following_count: profile.following_count - 1
      } :
      profile;
}

/**
 * Sets, refreshes and removes JSON Web Tokens.
 * The variables and logic have been created using the Moments walkthrough.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem('refreshTokenTimestamp', refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
  return !!localStorage.getItem('refreshTokenTimestamp');
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem('refreshTokenTimestamp');
} 