// import { createAsyncThunk } from "@reduxjs/toolkit";

// import axios from "axios";

// // Set the base URL for axios
// axios.defaults.baseURL = "http://localhost:5000";
// // axios.defaults.baseURL = "https://taskpro-nodejs.onrender.com";

// const setAuthHeader = (token) => {
//   if (token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//     localStorage.setItem("token", JSON.stringify(token));
//   } else {
//     delete axios.defaults.headers.common.Authorization;
//   }
// };

// const setRefreshToken = (refreshToken) => {
//   if (refreshToken) {
//     localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
//   } else {
//     localStorage.removeItem("refreshToken");
//   }
// };

// const clearAuthHeader = () => {
//   delete axios.defaults.headers.common.Authorization;
//   localStorage.removeItem("token");
//   localStorage.removeItem("refreshToken");
// };

// // Thunk for logging in
// export const logIn = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/users/login", credentials);
//       const { user } = response.data; // controller returns { user }

//       if (!user.verify) {
//         // don't set headers for unverified accounts
//         clearAuthHeader();
//         return user; // return user object (not wrapped)
//       }

//       const token = user.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(token);
//       setRefreshToken(refreshToken);

//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Thunk for registering
// export const register = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/users/signup", credentials);
//       const { user } = response.data;

//       if (user.verify === false) {
//         return { user };
//       }

//       const token = user.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(token);
//       setRefreshToken(refreshToken);

//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
//   const token = JSON.parse(localStorage.getItem("token"));

//   if (token === null || !token) {
//     return thunkAPI.rejectWithValue("No token found");
//   }

//   try {
//     setAuthHeader(token);

//     await axios.post("/api/users/logout");

//     clearAuthHeader();

//     return null;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     const token = JSON.parse(localStorage.getItem("token"));

//     if (token === null || !token) {
//       return thunkAPI.rejectWithValue("Unable to fetch user: No token found");
//     }
//     try {
//       setAuthHeader(token);
//       const response = await axios.get("/api/users/current");
//       // console.log(response.data);

//       const { user } = response.data;

//       const newToken = user?.token || null;
//       const newRefreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(newToken);
//       setRefreshToken(newRefreshToken);

//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// // resend verification mail
// export const resendVerificationEmail = createAsyncThunk(
//   "auth/resendVerificationEmail",
//   async (email, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/users/verify", { email });
//       return response.data.message; // Return success message
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Update User Info
// export const updateUserInfo = createAsyncThunk(
//   "auth/updateUserInfo",
//   async (userData, thunkAPI) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const response = await axios.patch("/api/users/update", userData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const { user } = response.data;

//       const newToken = user?.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(newToken);
//       setRefreshToken(refreshToken);

//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Update User Avatar
// export const updateUserAvatar = createAsyncThunk(
//   "auth/updateUserAvatar",
//   async (formData, thunkAPI) => {
//     // console.log("formData from ops :", formData);

//     // Manually log FormData entries to check the contents
//     // for (let [key, value] of formData.entries()) {
//     //   console.log(key, value); // Log key-value pairs in FormData
//     //   console.log("ops");
//     // }

//     try {
//       const token = JSON.parse(localStorage.getItem("token"));

//       const response = await axios.patch("/api/users/avatar", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // console.log("Form data:", formData);
//       // console.log("Headers:", {
//       //   Authorization: `Bearer ${token}`,
//       //   "Content-Type": "multipart/form-data",
//       // });

//       const { user } = response.data;

//       const newToken = user?.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(newToken);
//       setRefreshToken(refreshToken);

//       return user; // Return the new avatar URL
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Update theme
// export const updateTheme = createAsyncThunk(
//   "user/updateTheme",
//   async (theme, { rejectWithValue }) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const response = await axios.patch(
//         "/api/users/theme",
//         { theme },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { user } = response.data;

//       const newToken = user?.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(newToken);
//       setRefreshToken(refreshToken);

//       return user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// // Thunk for OAuth login/registration
// export const oAuthlLogInRegister = createAsyncThunk(
//   "auth/oauthLoginRegister",
//   async (credentials, thunkAPI) => {
//     try {
//       const response = await axios.post("/api/users/oauth", credentials);
//       const { user } = response.data; // controller returns { user }

//       if (!user.verify) {
//         // don't set headers for unverified accounts
//         clearAuthHeader();
//         return user; // return user object (not wrapped)
//       }

//       const token = user.token || null;
//       const refreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(token);
//       setRefreshToken(refreshToken);

//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message
//       );
//     }
//   }
// );

// // Refresh token
// export const refreshAccesToken = createAsyncThunk(
//   "user/refreshToken",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = JSON.parse(localStorage.getItem("token"));
//       const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

//       const response = await axios.post(
//         "/api/users/refresh-token",
//         { refreshToken },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const { user } = response.data;

//       const newToken = user?.token || null;
//       const newRefreshToken = user?.refreshToken?.token || null;

//       setAuthHeader(newToken);
//       setRefreshToken(newRefreshToken);

//       return user;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../assets/api"; // axios cu baseURL și withCredentials

// --- Thunk for logging in ---
export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/users/login", credentials);
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Thunk for registering ---
export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/users/signup", credentials);
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Log out ---
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.post("/api/users/logout"); // backend șterge cookie-urile
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message
    );
  }
});

// --- Refresh user info ---
export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/users/current"); // trimite cookie automat
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Resend verification email ---
export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (email, thunkAPI) => {
    try {
      const response = await api.post("/api/users/verify", { email });
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Update user info ---
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (userData, thunkAPI) => {
    try {
      const response = await api.patch("/api/users/update", userData);
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Update user avatar ---
export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (formData, thunkAPI) => {
    try {
      const response = await api.patch("/api/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Update theme ---
export const updateTheme = createAsyncThunk(
  "user/updateTheme",
  async (theme, thunkAPI) => {
    try {
      const response = await api.patch("/api/users/theme", { theme });
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- OAuth login/register ---
export const oAuthlLogInRegister = createAsyncThunk(
  "auth/oauthLoginRegister",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/users/oauth", credentials);
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Refresh access token ---
export const refreshAccesToken = createAsyncThunk(
  "user/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/api/users/refresh-token"); // cookie-ul refresh token
      const { user } = response.data;
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Forgot password ---
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post(
        "/api/users/forgot-password",
        credentials
      );
      const { message } = response.data;
      return message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// --- Reset password ---
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post("/api/users/reset-password", credentials);
      const data = response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
