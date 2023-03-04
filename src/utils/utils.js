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
    } catch (err) {}
  };

  export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
      ? // This is the profile I clicked on,
        // update its followers count and set its following id
        {
          ...profile,
          followers_count: profile.followers_count + 1,
          following_id,
        }
      : profile.is_owner
      ? // This is the profile of the logged in user
        // update its following count
        { ...profile, following_count: profile.following_count + 1 }
      : // this is not the profile the user clicked on or the profile
        // the user owns, so just return it unchanged
        profile;
  };