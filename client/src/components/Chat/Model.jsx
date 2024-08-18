import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import { fetchChats } from '../../stores/chat/index';
import { getChatName, getChatPhoto } from '../../utils/logics.js';
import { useActiveChat } from '../../stores/chat/hooks';
import { useAuthData } from '../../stores/auth/hooks';
import { apiService } from '../../api/apiService.js';

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <RxCross2 />
        </button>
        {children}
      </div>
    </div>
  );
};

function Model(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const activeChat = useActiveChat();
  const activeUser = useAuthData();

  const handleOpen = () => {
    setOpen(true);
    setName(getChatName(activeChat, activeUser));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e) => {
    if (members.includes(e)) {
      return;
    }
    apiService.post('/chat/groupAdd',{ userId: e?._id, chatId: activeChat?._id })
    .then(()=>{
      setMembers([...members, e]);
    })
  };

  const updateBtn = async () => {
    if (name) {
      apiService.post('/chat/group/rename', { chatId: activeChat._id, chatName: name })
      .then(res =>{
        if (res.data) {
          dispatch(fetchChats());
          setOpen(false);
        }
      })
    }
    setOpen(false);
  };

  const deleteSelected = async (ele) => {
    apiService.post('/chat/groupRemove',{ chatId: activeChat._id, userId: ele._id })
    .then(res =>{
      if (res.data._id) {
        setMembers(members.filter((e) => e._id !== ele._id));
        dispatch(fetchChats());
        setOpen(false);
      }
    })
    
  };

  const leaveGroup = async () => {
    apiService.post('/chat/groupRemove',{ chatId: activeChat._id, userId: activeUser.id })
    .then(res =>{
      if (res.data._id) {
        dispatch(fetchChats());
      setOpen(false);
      }
    })
  };

  useEffect(() => {
    setMembers(activeChat?.users.map((e) => e));
  }, [activeChat]);

  return (
    <>
      <button onClick={handleOpen}>
        <img className='w-[40px] h-[40px] rounded-[25px]' alt="Profile Pic" src={getChatPhoto(activeChat, activeUser)} />
      </button>
      {activeChat?.isGroup ? (
        <Modal open={open} onClose={handleClose}>
          <h5 className='text-[22px] font-semibold tracking-wide text-center text-[#111b21]'>{getChatName(activeChat, activeUser)}</h5>
          <div>
            <h6 className='text-[14px] text-[#111b21] tracking-wide font-semibold'>Members</h6>
            <div className='flex flex-wrap gap-y-2'>
              {members.length > 0 && members.map((e) => (
                <button className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400' >
                  <span className='text-[10px]'>{e._id === activeUser.id ? "You" : e.name}</span>
                  <RxCross2 onClick={() => deleteSelected(e)} />
                </button>
              ))}
            </div>
            <div>
              <form className='mt-5 flex flex-col gap-y-3' onSubmit={(e) => e.preventDefault()}>
                <input onChange={(e) => setName(e.target.value)} value={name} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
              </form>
              <div className='flex justify-end gap-x-3 mt-3'>
                <button onClick={updateBtn} className='bg-[#0086ea] transition hover:bg-[#00A1C9] px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Update</button>
                <button onClick={() => leaveGroup()} className='bg-[#880808] hover:bg-[#A52A2A] transition delay-150 px-4 py-1 text-[10.6px] tracking-wide text-[#fff]'>Leave</button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <div className='w-[250px] h-[250px] flex flex-col items-center justify-center -mt-4'>
            <img className='w-[70px] h-[70px] rounded-[35px] shadow-lg' src={getChatPhoto(activeChat, activeUser)} alt="" />
            <h2 className='text-[17px] tracking-wider font-semibold text-[#313439]'>{getChatName(activeChat, activeUser)}</h2>
            <h3 className='text-[14px] font-semibold text-[#268d61]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser._id ? activeChat?.users[1]?.email : activeChat?.users[0]?.email}</h3>
            <div className='flex flex-col items-start'>
              <h5 className='text-[13px]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.bio : activeChat?.users[0]?.bio}</h5>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Model;
