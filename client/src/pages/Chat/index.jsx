import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Model from '../../components/Chat/Model';
import { BsEmojiSmile, BsFillEmojiSmileFill } from "react-icons/bs";
import MessageHistory from '../../components/Chat/MessageHistory';
import io from "socket.io-client";
import "../home.css"; 
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { getChatName } from '../../utils/logics';
import Typing from '../../components/Chat/Typing';
import { useActiveChat, useChats } from '../../stores/chat/hooks';
import { setActiveChat, setNotification } from '../../stores/chat/actions';
import { useAuthData, useIsLogin } from '../../stores/auth/hooks';
import { apiService } from '../../api/apiService';
import { fetchChats } from '../../stores/chat/index';
import Layout from '../../layout';

let socket, selectedChatCompare;

function Chat() {
  const activeChat = useActiveChat();
  const notifications = useChats();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const login = useIsLogin();
  const [showPicker, setShowPicker] = useState(false);
  const activeUser = useAuthData();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!activeUser || !login) {
      setLoading(true);
    } else {
      setLoading(false);
      console.log(activeChat);
    }
  }, [activeUser, login]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await apiService.get("/profile/getUsers");
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleUserClick = async (userId) => {
    console.log(userId);
    apiService.post('/chat', { userId2: userId })
    .then(res =>{
      if(res.success){
        dispatch(fetchChats());
        setActiveChat(res.data);
      }
    })
  };

  const keyDownFunction = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && message) {
      setMessage("");
      socket.emit("stop typing", activeChat._id);
      await apiService.post('/message/', { chatId: activeChat._id, message })
      .then(res =>{
        if (res.success) {
          socket.emit("new message", res.data);
          setMessages([...messages, res.data]);
          dispatch(fetchChats());
        }
      })
    }
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    if (activeUser) {
      socket.emit("setup", activeUser);
      socket.on("connected", () => {
        setSocketConnected(true);
      });
    }
  }, [activeUser]);

  useEffect(() => {
    const fetchMessagesFunc = async () => {
      if (activeChat) {
        setLoading(true);
        apiService.get(`/message/${activeChat._id}`)
        .then(res =>{
          if(res.success){
            setMessages(res.data);
            socket.emit("join room", activeChat._id);
            setLoading(false);
          }
        })
      }
    };
    fetchMessagesFunc();
    selectedChatCompare = activeChat;
  }, [activeChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if ((!selectedChatCompare || selectedChatCompare._id) !== newMessageReceived.chatId._id) {
        if (!notifications.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notifications]);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
      dispatch(fetchChats());
    });
  }, []);

  if (loading) {
    return <div className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]">LOADING</div>;
  }

  return (
    <Layout>
      {activeChat ? (
        <div className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]">
          <div className='flex justify-between items-center px-5 bg-[#ffff] w-[100%]'>
            <div className='flex items-center gap-x-[10px]'>
              <div className='flex flex-col items-start justify-center'>
                <h5 className='text-[17px] text-[#2b2e33] font-bold tracking-wide'>{getChatName(activeChat, activeUser)}</h5>
              </div>
            </div>
            <div>
              <Model />
            </div>
          </div>
          <div className='scrollbar-hide w-[100%] h-[70vh] md:h-[66vh] lg:h-[69vh] flex flex-col overflow-y-scroll p-4'>
            <MessageHistory typing={isTyping} messages={messages} />
            <div className='ml-7 -mb-10'>
              {isTyping && <Typing width="100" height="100" />}
            </div>
          </div>
          <div className='absolute left-[31%] bottom-[8%]'>
            {showPicker && <Picker data={data} onEmojiSelect={(e) => setMessage(message + e.native)} />}
            <div className='border-[1px] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] h-[50px] lg:w-[400px] rounded-t-[10px]'>
              <form onKeyDown={(e) => keyDownFunction(e)} onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e) => {
                  setMessage(e.target.value);
                  if (!socketConnected) return;
                  if (!typing) {
                    setTyping(true);
                    socket.emit('typing', activeChat._id);
                  }
                  let lastTime = new Date().getTime();
                  var time = 3000;
                  setTimeout(() => {
                    var timeNow = new Date().getTime();
                    var timeDiff = timeNow - lastTime;
                    if (timeDiff >= time && typing) {
                      socket.emit("stop typing", activeChat._id);
                      setTyping(false);
                    }
                  }, time);
                }} className='focus:outline-0 w-[100%] bg-[#f8f9fa]' type="text" name="message" placeholder="Enter message" value={message} />
              </form>
            </div>
            <div className='border-x-[1px] border-b-[1px]bg-[#f8f9fa] border-[#aabac8] px-6 py-3 w-[360px] sm:w-[400px] md:w-[350px] lg:w-[400px] rounded-b-[10px] h-[50px]'>
              <div className='flex justify-between items-start'>
                <div className='cursor-pointer' onClick={() => setShowPicker(!showPicker)}>
                  {showPicker ? <BsFillEmojiSmileFill className='w-[20pxh-[20px] text-[#ffb02e] border-[black]' /> : <BsEmojiSmile className='w-[20px] h-[20px]' />}
                </div>
                <button onClick={(e) => keyDownFunction(e)} className='bg-[#f8f9fa] border-[2px] border-[#d4d4d4] text-[14px] px-2 py-[3px] text-[#9e9e9e] font-medium rounded-[7px] -mt-1'>Send</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-page relative lg:w-[100%] h-[100vh] bg-[#fafafa]">
          <div className='relative'>
            <div className='absolute top-[40vh] left-[44%] flex flex-col items-center justify-center gap-y-3'>
              <img className='w-[50px] h-[50px] rounded-[25px]' alt="User profile" src={`/images/profile_images/${activeUser?.imagePath}`} />
              <h3 className='text-[#111b21] text-[20px] font-medium tracking-wider'>Welcome <span className='text-[#166e48] text-[19px] font-bold'> {activeUser?.name}</span></h3>
            </div>
          </div>
        </div>
      )}
      <div className="user-list p-4">
        <h2 className="text-xl font-bold mb-4">Kullanıcılar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <div 
              key={user._id} 
              onClick={() => handleUserClick(user._id)} 
              className="cursor-pointer border rounded-lg p-4 bg-white shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg">{user.userName}</h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Chat;
