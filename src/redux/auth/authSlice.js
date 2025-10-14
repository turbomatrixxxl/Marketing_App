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
  forgotPassword,
  resetPassword,
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
  message: null,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
  state.message = null;
  if (!state.isLoggedIn) {
    state.user = null;
  }
  state.isRefreshing = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.message = null;
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
        state.message = null;
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
        state.message = null;
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
        state.message = null;
      })
      .addCase(logOut.rejected, handleRejected)

      // Refresh User
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
        state.message = null;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isRefreshing = false;
        state.isLoggedOut = false;
        state.message = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload;
        state.message = null;
      })

      // Resend Verification Email
      .addCase(resendVerificationEmail.pending, (state) => {
        state.emailResendStatus = null;
        state.error = null;
        state.message = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, { payload }) => {
        state.emailResendStatus = payload;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.emailResendStatus = null;
        state.error = action.payload;
        state.message = null;
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
        state.message = null;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Update User Avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, { payload }) => {
        // console.log("Avatar payload :", payload);
        state.user = payload;
        state.avatarURL = payload.avatarURL; // Set the new avatar URL
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.message = null;
      })
      // Update User Avatar Rejected
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Update Theme
      .addCase(updateTheme.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateTheme.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.message = null;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // OAuth login/registration
      .addCase(oAuthlLogInRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(oAuthlLogInRegister.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoggedIn = payload.verify ? true : false;
        state.isRegistered = true;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.message = null;
      })
      .addCase(oAuthlLogInRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Refresh acces token
      .addCase(refreshAccesToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(refreshAccesToken.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
        state.message = null;
      })
      .addCase(refreshAccesToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.message = payload;
        state.isLoading = false;
        state.error = null;
        state.isLoggedOut = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.message = payload.message;
        state.avatarURL = payload.avatarURL || null;
        state.isLoading = false;
        state.error = null;

        state.isLoggedIn = false;
        state.isLoggedOut = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { reset, clearUpdateUser, clearIsRegistered } = authSlice.actions;
export const authReducer = authSlice.reducer;
