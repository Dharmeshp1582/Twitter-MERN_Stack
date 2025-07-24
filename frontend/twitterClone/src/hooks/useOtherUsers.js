import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getOtherUsers,
  getOtherUsersLoading,
  getOtherUsersError,
} from "../redux/userSlice";
import { USER_API_ENDPOINT } from "../utils/Constants";

export const useOtherUsers = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      dispatch(getOtherUsersLoading());
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/otheruser/${id}`, {
          withCredentials: true,
        });
        if (res.data && res.data.success) {
          dispatch(getOtherUsers(res.data.otherUser));
        } else {
          dispatch(
            getOtherUsersError(
              res.data?.message || "Failed to fetch other users"
            )
          );
        }
      } catch (error) {
        dispatch(
          getOtherUsersError(error.message || "Error fetching other users")
        );
      }
    };
    if (id) {
      fetchOtherUsers();
    }
  }, [id, dispatch]);
};
