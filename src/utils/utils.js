import { axiosReq } from "../api/axiosDefaults";

/**
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