export const selectUser = (state) => state.authSlice.user;
export const selectAvatarURL = (state) => state.authSlice.avatarURL;
export const selectIsLoading = (state) => state.authSlice.isLoading;
export const selectIsLoggedIn = (state) => state.authSlice.isLoggedIn;
export const selectIsisRegistered = (state) => state.authSlice.isRegistered;
export const selectIsRefreshing = (state) => state.authSlice.isRefreshing;
export const selectError = (state) => state.authSlice.error;
export const selectIsemailResendStatus = (state) =>
  state.authSlice.emailResendStatus;
export const selectIsLoggedOut = (state) => state.authSlice.isLoggedOut;
export const selectTheme = (state) => state.authSlice.user?.theme || "light";
export const selectMessage = (state) => state.authSlice.message;
