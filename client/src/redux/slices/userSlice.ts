import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name:string
    email:string
    id:string
}

// Defining the initial state type
interface userState {
  user: User | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: userState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.clear();
    }
  },
});

export const {
  login,
  logout,
} = userSlice.actions;
export default userSlice.reducer;
