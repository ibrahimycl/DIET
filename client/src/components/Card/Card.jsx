import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Card({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.like);

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

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-800">{post.userId.name} {post.userId.surname} <span className="text-green lowercase">@{post.userId.userName}</span></div>
        </div>
        {post.imagePath && (
          <div className="h-64 overflow-hidden flex justify-center items-center mb-4">
            <img src={`/images/${post.imagePath}`} alt="image" className="w-full h-full object-cover rounded-lg" />
          </div>
        )}
        <div className={`overflow-hidden ${isExpanded ? '' : 'h-20'} transition-height duration-300 ease-in-out`}>
          <p className="text-first mb-4">
            {isExpanded ? post.description : `${post.description.substring(0, 150)}...`}
            {post.description.length > 150 && (
              <span className="text-green cursor-pointer" onClick={toggleReadMore}>
                {isExpanded ? ' Daha az göster' : ' Devamını oku'}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-2 cursor-pointer" onClick={handleLikeClick} />
          <span className="text-gray-600">{likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
