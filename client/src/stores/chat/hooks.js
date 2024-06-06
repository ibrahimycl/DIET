import { useSelector } from "react-redux";


export const useActiveChat = () => useSelector(state => state.chatData.activeChat)
export const useChats = () => useSelector(state => state.chatData.chats)
export const useIsLogin = () => useSelector(state => state.chatData.isLogin)
export const useNotifications = () => useSelector(state => state.chatData.notifications)