import React from 'react';
import { restaurantInfo } from '../data/menuData';

const GoogleReviewCTA = () => {
  const handleReviewClick = () => {
    window.open(restaurantInfo.googleMapsUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
      <div className="text-center mb-4">
        <span className="text-5xl mb-3 block">⭐</span>
        <h3 className="text-2xl font-bold text-dark mb-2">
          هل أعجبك طعامنا؟
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          رأيك يهمنا! شارك تجربتك مع الآخرين وساعدنا في تحسين خدماتنا
        </p>
      </div>

      <button
        onClick={handleReviewClick}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md flex items-center justify-center gap-3"
      >
        <svg 
          className="w-6 h-6" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span>قيمنا على Google Maps</span>
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <span>⏱️</span>
        <span>لن يستغرق الأمر أكثر من دقيقة واحدة</span>
      </div>
    </div>
  );
};

export default GoogleReviewCTA;