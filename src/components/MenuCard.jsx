import React from 'react';

const MenuCard = ({ item, onAddToCart, count }) => {
  return (
    <div className="group relative bg-[#FCFBFA] rounded-[2.5rem] overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] border border-stone-100 flex flex-col h-full transform hover:-translate-y-3">
      
      {/* 1. قسم الصورة - مع تأثير زووم ناعم */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />

        {/* تدرج ظلي علوي وسفلي للفخامة */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-stone-900/40 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
        
        {/* شارة السعر - تصميم Minimalist */}
        <div className="absolute top-6 left-6 z-10">
          <div className="backdrop-blur-xl bg-white/80 px-4 py-2 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center">
            <span className="text-stone-900 text-lg font-light tracking-tight">
              {item.price}<span className="text-[10px] ml-0.5 font-medium opacity-70">DH</span>
            </span>
          </div>
        </div>

        {/* وسم التميز - تصميم رفيع */}
        {item.popular && (
          <div className="absolute top-6 right-6 bg-amber-500/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Most Loved
          </div>
        )}
      </div>

      {/* 2. قسم المحتوى - تركيز على التايبوجرافي */}
      <div className="p-8 flex flex-col flex-grow relative bg-white">
        
        {/* خط زخرفي علوي صغير */}
        <div className="w-8 h-[1px] bg-amber-500 mb-4 transition-all duration-700 group-hover:w-16" />

        <span className="text-amber-700 text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block opacity-80">
          Fes Authentic Collection
        </span>

        <h3 className="text-2xl font-serif text-stone-800 mb-3 leading-tight transition-colors duration-500 group-hover:text-amber-700">
          {item.name}
        </h3>
        
        <p className="text-stone-500 text-sm leading-relaxed mb-8 font-light italic">
          {item.description}
        </p>

        {/* 3. منطقة التحكم - أزرار نحيفة وأنيقة */}
        <div className="mt-auto">
          {count > 0 ? (
            <div className="flex items-center justify-between bg-stone-50 rounded-2xl p-1.5 border border-stone-100">
              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, -1); }}
                className="w-10 h-10 flex items-center justify-center bg-white text-stone-600 rounded-xl shadow-sm hover:text-red-500 transition-all active:scale-90 border border-stone-100"
              >
                <span className="text-xl font-light">−</span>
              </button>
              
              <div className="flex flex-col items-center">
                <span className="font-medium text-stone-800 text-lg leading-none">{count}</span>
                <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest mt-1">Qty</span>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); onAddToCart(item, 1); }}
                className="w-10 h-10 flex items-center justify-center bg-stone-800 text-white rounded-xl shadow-md hover:bg-amber-600 transition-all active:scale-90"
              >
                <span className="text-xl font-light">+</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item, 1)}
              className="group/btn relative w-full overflow-hidden bg-stone-900 text-white py-4 rounded-2xl font-medium text-xs uppercase tracking-[0.2em] transition-all duration-500 hover:bg-amber-700 hover:shadow-2xl hover:shadow-amber-900/20 active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>Add to Selection</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 group-hover/btn:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>

      {/* لمسة نهائية: حدود مضيئة عند التحويم */}
      <div className="absolute inset-0 border-[1px] border-amber-500/0 group-hover:border-amber-500/10 rounded-[2.5rem] transition-all duration-700 pointer-events-none" />
    </div>
  );
};

export default MenuCard;