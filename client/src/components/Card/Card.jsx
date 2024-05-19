import React, { useState } from 'react';

function Card({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex justify-center items-center mb-6"> 
      <div className="bg-gray rounded-lg shadow-md p-6 w-full max-w-md md:max-w-lg lg:max-w-xl h-auto flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-gray-800">ibrahimycll <span className='text-lighterGreen'>İbrahim Yücel</span></div>
        </div>
        {post.imagePath && (
          <div className="h-64 overflow-hidden flex justify-center items-center mb-4">
            <img src={`/images/${post.imagePath}`} alt="image" className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`overflow-hidden ${isExpanded ? '' : 'h-20'}`}> 
          <p className="text-first mb-4">
            {isExpanded ? post.description : `${post.description.substring(0, 150)}`}
            {post.description.length > 150 && (
              <span className="text-blue-500 cursor-pointer" onClick={toggleReadMore}>
                {isExpanded ? ' Show less' : ' Read more'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
