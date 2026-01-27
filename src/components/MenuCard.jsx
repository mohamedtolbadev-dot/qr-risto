import React from 'react';

const MenuCard = ({ item, onAddToCart, count }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* ------------------------------------------- */}
      {/* 1. قسم الصورة (Professional Image Display) */}
      {/* ------------------------------------------- */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        
        {/* الصورة نفسها مع تأثير Zoom بطيء */}
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />

        {/* طبقة تظليل متدرجة (Gradient Overlay) لإبراز النصوص فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />

        {/* شارة "موصى به" في الأعلى */}
        {item.popular && (
          <div className="absolute top-3 right-3 bg-orange-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-lg flex items-center gap-1 border border-white/20">
            <span>✨</span>
            <span>الأكثر طلباً</span>
          </div>
        )}

        {/* السعر والاسم يظهران فوق الصورة ليعطي شكلاً مثل "Instagram Stories" */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex justify-between items-end">
             {/* السعر بتصميم بارز */}
            <span className="text-2xl font-black text-white drop-shadow-md">
              {item.price} <span className="text-sm font-medium text-orange-200">DH</span>
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------- */}
      {/* 2. التفاصيل والأزرار (Content Section)     */}
      {/* ------------------------------------------- */}
      <div className="p-5 flex flex-col flex-grow bg-white relative">
        
        {/* العنوان */}
        <h3 className="text-lg font-extrabold text-gray-800 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        
        {/* الوصف */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
          {item.description}
        </p>

        {/* زر الإضافة (Floating Action Style) */}
        <div className="mt-auto">
          {count > 0 ? (
            // حالة المنتج مضاف: عداد أنيق
            <div className="flex items-center justify-between bg-orange-50 rounded-2xl p-1.5 border border-orange-100 shadow-inner">
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, -1); }}
                className="w-10 h-10 flex items-center justify-center bg-white text-orange-600 rounded-xl shadow-sm font-bold text-lg hover:bg-orange-100 transition-colors active:scale-90"
              >
                −
              </button>
              <span className="font-bold text-gray-800 text-lg w-8 text-center">{count}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, 1); }}
                className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-xl shadow-md shadow-orange-200 font-bold text-lg hover:bg-orange-600 transition-colors active:scale-90"
              >
                +
              </button>
            </div>
          ) : (
            // حالة الإضافة: زر كبير وواضح
            <button
              onClick={() => onAddToCart(item, 1)}
              className="group/btn w-full bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-gray-200 flex items-center justify-center gap-3 active:scale-95"
            >
              <span>إضافة للطلب</span>
              <span className="bg-white/20 p-1 rounded-md group-hover/btn:rotate-90 transition-transform duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;