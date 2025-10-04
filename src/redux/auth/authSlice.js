import { createSlice } from "@reduxjs/toolkit";
import {
  logIn,
  register,
  logOut,
  refreshUser,
  resendVerificationEmail,
  updateUserInfo,
  updateUserAvatar,
  updateTheme,
  oAuthlLogInRegister,
  refreshAccesToken,
} from "./operationsAuth";

const initialState = {
  user: null,
  avatarURL: null, // Add avatar URL here
  isLoading: false,
  isLoggedIn: false,
  isRegistered: false,
  isRefreshing: false,
  error: null,
  emailResendStatus: null,
  isLoggedOut: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
  if (!state.isLoggedIn) {
    state.user = null;
  }
  state.isRefreshing = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  if (!state.isRefreshing) {
    state.user = null;
    state.isLoggedIn = false;
  }
  state.isRefreshing = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      // Clear the entire auth state
      return { ...initialState };
    },
    clearUpdateUser(state) {
      state.emailResendStatus = null;
    },
    clearIsRegistered(state) {
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Log In
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.isRegistered = false;
      })
      .addCase(logIn.rejected, handleRejected)

      // Register
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isRegistered = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)

      // Log Out
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.avatarURL = null; // Clear avatar URL
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = true;
      })
      .addCase(logOut.rejected, handleRejected)

      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isRefreshing = false;
        state.isLoggedOut = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })

      // Resend Verification Email
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailResendStatus = null;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, { payload }) => {
        state.emailResendStatus = payload;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailResendStatus = null;
        state.error = action.payload;
      })

      // Update User Info
      .addCase(updateUserInfo.pending, handlePending)
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.emailResendStatus = "User updated suscesfully...!";
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update User Avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        // console.log("Avatar payload :", payload);
        state.user = payload;
        state.avatarURL = payload.avatarURL; // Set the new avatar URL
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      // Update User Avatar Rejected
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Theme
      .addCase(updateTheme.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // OAuth login/registration
      .addCase(oAuthlLogInRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(oAuthlLogInRegister.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isRegistered = true;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      .addCase(oAuthlLogInRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Refresh acces token
      .addCase(refreshAccesToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshAccesToken.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      .addCase(refreshAccesToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset, clearUpdateUser, clearIsRegistered } = authSlice.actions;
export const authReducer = authSlice.reducer;
