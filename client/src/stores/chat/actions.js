import store from ".."
import { _setActiveChat,_setNotifications } from "."

export const setActiveChat = chat => store.dispatch(_setActiveChat(chat))
export const setNotification = notification => store.dispatch(_setNotifications(notification))
