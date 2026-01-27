
const MenuCard = ({ item, onAddToCart, count }) => {
  return (
    <div className="group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_8px_30px_-15px_rgba(0,0,0,0.1)] border border-gray-100/50 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(234,88,12,0.15)] transition-all duration-700 flex flex-col h-full transform hover:-translate-y-2">
      
      {/* 1. قسم الصورة - نسبة عرض متغيرة للتوافق */}
      <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />

        {/* طبقة حماية للنصوص فوق الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 sm:opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* شارة السعر: أصغر في الجوال لتوفير مساحة */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl shadow-xl border border-white/20 flex flex-col items-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
            <span className="text-lg sm:text-xl font-black leading-none">{item.price}</span>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tighter">DH</span>
          </div>
        </div>

        {/* وسم التميز: يختفي النص في الهواتف الصغيرة جداً ويبقى الرمز */}
        {item.popular && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-orange-500 text-white px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 sm:gap-2 border border-orange-400/50">
            <span className="animate-pulse text-xs">★</span>
            <span className="hidden xs:inline">الأكثر تميزاً</span>
          </div>
        )}
      </div>

      {/* 2. قسم المحتوى - مسافات مرنة (Responsive Padding) */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow bg-white z-20 -mt-5 sm:-mt-8 rounded-t-[1.5rem] sm:rounded-t-[2rem] relative shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.05)]">
        
        <span className="text-orange-600 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] mb-1 sm:mb-2 block">
           فاس الأصالة • Fes Tradition
        </span>

        <h3 className="text-base sm:text-xl font-black text-gray-900 mb-1.5 sm:mb-3 leading-tight tracking-tight group-hover:text-orange-600 transition-colors duration-300 line-clamp-1">
          {item.name}
        </h3>
        
        <p className="text-gray-500 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-8 line-clamp-2 font-medium">
          {item.description}
        </p>

        {/* 3. منطقة التحكم والطلب - أزرار سهلة اللمس (Touch Friendly) */}
        <div className="mt-auto pt-3 border-t border-gray-50">
          {count > 0 ? (
            <div className="flex items-center justify-between bg-gray-50 rounded-[1.2rem] sm:rounded-[1.5rem] p-1 border border-gray-100 shadow-inner">
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, -1); }}
                className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-gray-900 rounded-lg sm:rounded-xl shadow-sm font-black text-lg sm:text-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-90 border border-transparent hover:border-red-100"
              >
                −
              </button>
              
              <div className="flex flex-col items-center">
                <span className="font-black text-gray-900 text-base sm:text-xl leading-none">{count}</span>
                <span className="text-[7px] sm:text-[8px] font-bold text-gray-400 uppercase mt-0.5">الكمية</span>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, 1); }}
                className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-600 text-white rounded-lg sm:rounded-xl shadow-lg font-black text-lg sm:text-xl hover:bg-orange-700 transition-all active:scale-90"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item, 1)}
              className="group/btn relative overflow-hidden w-full bg-gray-900 text-white py-3 sm:py-4 rounded-[1.2rem] sm:rounded-[1.5rem] font-black text-[10px] sm:text-sm transition-all duration-300 flex items-center justify-center gap-2 sm:gap-4 hover:bg-orange-600 active:scale-95 shadow-xl shadow-gray-200"
            >
              <span className="relative z-10">إضافة للطلب</span>
              <div className="relative z-10 bg-white/10 p-1 rounded-md sm:rounded-lg">
                <svg width="14" height="14" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;