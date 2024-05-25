import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt, faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';

function Card({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.like);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(post.description);
  const [editedDescription, setEditedDescription] = useState(post.description);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // State to handle UI update on delete
  const location = useLocation();
  const navigate = useNavigate();

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeClick = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];
      const response = await fetch('http://localhost:5000/api/community/changeLikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          _id: post._id,
        }),
      });
      const data = await response.json();
      setLikes(data.like);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      let token;
      const cookieString = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

      if (cookieString) {
        token = cookieString.split('=')[1];
      }

      await axios.post('http://localhost:5000/api/community/delete', {_id: post._id}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Deleted post:', post._id);
      setIsDeleted(true); // Update the state to remove the post from the UI
    } catch (error) {
      console.error('Error deleting the post:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      let token;
      const cookieString = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

      if (cookieString) {
        token = cookieString.split('=')[1];
      }

      await axios.post('http://localhost:5000/api/community/update', {
        _id: post._id,
        description: editedDescription
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      setDescription(editedDescription);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating the description:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditedDescription(description);
    setIsEditing(false);
  };

  const handleUsernameClick = () => {
    navigate(`/profile/id=${post.userId._id}`);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    handleDelete();
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  if (isDeleted) return null; // Return null to remove the component from the UI if deleted

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-darkGray">
            {post.userId.name} {post.userId.surname} <span className="text-green lowercase cursor-pointer" onClick={handleUsernameClick}>@{post.userId.userName}</span>
          </div>
          {location.pathname === '/profile' && (
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={() => setIsEditing(true)} />
              <FontAwesomeIcon icon={faTrashAlt} className="cursor-pointer" onClick={handleDeleteClick} />
            </div>
          )}
        </div>
        {post.imagePath && (
          <div className="h-48 sm:h-64 overflow-hidden flex justify-center items-center mb-4">
            <img src={`/images/community_images/${post.imagePath}`} alt="image" className="w-full h-full object-cover rounded-lg" />
          </div>
        )}
        {isEditing ? (
          <div>
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end space-x-2">
              <FontAwesomeIcon icon={faCheck} className="text-green-500 cursor-pointer" onClick={handleUpdate} />
              <FontAwesomeIcon icon={faTimes} className="text-red-500 cursor-pointer" onClick={handleCancelEdit} />
            </div>
          </div>
        ) : (
          <div className={`overflow-hidden ${isExpanded ? '' : 'h-20'} transition-all duration-300 ease-in-out`}>
            <p className="text-first mb-4">
              {isExpanded ? description : `${description.substring(0, 150)}...`}
              {description.length > 150 && (
                <span className="text-green cursor-pointer" onClick={toggleReadMore}>
                  {isExpanded ? ' Daha az göster' : ' Devamını oku'}
                </span>
              )}
            </p>
          </div>
        )}
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faHeart} className="mr-2 cursor-pointer" onClick={handleLikeClick} />
          <span className="text-gray-600">{likes}</span>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4">Silmek istediğinize emin misiniz?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Evet
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
