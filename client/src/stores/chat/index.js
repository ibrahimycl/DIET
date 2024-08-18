import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiService } from '../../api/apiService';

const initialState = {
  chats: [],
  activeChat: '',
  isLoading: false,
  notifications: [],
};

export const fetchChats = createAsyncThunk('redux/chats', async () => {
    apiService.get('/chat')
    .then(res =>{
      if (res.success) {
        return res.data;
      }
    })
});

const chatData = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    _setActiveChat: (state, { payload }) => {
      state.activeChat = payload;
    },
    _setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, { payload }) => {
        state.chats = payload;
        state.isLoading = false;
      })
      .addCase(fetchChats.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { _setActiveChat, _setNotifications } = chatData.actions;
export default chatData.reducer;
