import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import { USER_API_ENDPOINT } from "../utils/Constants";

export const useGetProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/profile/${id}`, {
          withCredentials: true,
        });
        // Only dispatch the user object, not the whole response
        dispatch(getMyProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchMyProfile();
  }, [id]);
};
