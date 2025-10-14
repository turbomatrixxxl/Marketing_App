import { useSelector } from "react-redux";
import {
  selectUser,
  selectAvatarURL,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsisRegistered,
  selectIsRefreshing,
  selectError,
  selectIsemailResendStatus,
  selectIsLoggedOut,
  selectTheme,
  selectMessage,
} from "../redux/auth/selectorsAuth";

export const useAuth = () => {
  const user = useSelector(selectUser);
  const avatarURL = useSelector(selectAvatarURL);
  const isLoadingAuth = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRegistered = useSelector(selectIsisRegistered);
  const isRefreshing = useSelector(selectIsRefreshing);
  const errorAuth = useSelector(selectError);
  const emailResendStatus = useSelector(selectIsemailResendStatus);
  const isLoggedOut = useSelector(selectIsLoggedOut);
  const theme = useSelector(selectTheme);
  const message = useSelector(selectMessage);

  return {
    isLoggedIn,
    user,
    errorAuth,
    isRefreshing,
    isLoadingAuth,
    isRegistered,
    emailResendStatus,
    isLoggedOut,
    avatarURL,
    theme,
    message,
  };
};
