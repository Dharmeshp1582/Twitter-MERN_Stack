import axios from "axios";
import { LIKED_TWEETS_API_ENDPOINT } from "../utils/Constants.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";

const useGetLikedTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh } = useSelector((store) => store.tweet);

  const fetchLikedTweets = async () => {
    try {
      const res = await axios.get(`${LIKED_TWEETS_API_ENDPOINT}/${id}`, {
        withCredentials: true,
      });
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLikedTweets();
  }, [id, refresh]);
};
export default useGetLikedTweets;
