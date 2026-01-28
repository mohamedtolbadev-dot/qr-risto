import React from 'react';

const MenuCard = ({ item, onAddToCart, count }) => {
  return (
    <div className="group relative w-full h-full">
      
      {/* --- الخلفية الديكورية (تظهر عند التحويم أو النشاط) --- */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm group-hover:blur opacity-20" />
      
      <div className="relative flex flex-col h-full bg-white rounded-[2.2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(234,88,12,0.15)] transition-all duration-500 border border-gray-100">

        {/* 1. منطقة الصورة: منحنية وجذابة */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          {/* الصورة مع تأثير زووم بطيء */}
          <img 
            src={item.image} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
          />
          
          {/* طبقة تدرج لوني لضمان وضوح الأيقونات العلوية */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />

          {/* شارة السعر العائمة (تصميم زجاجي) */}
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-baseline gap-1 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-white/20">
              <span className="text-lg font-black text-gray-900">{item.price}</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase">DH</span>
            </div>
          </div>

          {/* أيقونة المفضلة / التميز */}
          {item.popular && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-orange-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white/30 animate-pulse-slow">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
            </div>
          )}
          
          {/* منحنى زخرفي في أسفل الصورة لفصلها عن النص (مهم جداً للمسة المغربية) */}
          <div className="absolute -bottom-1 left-0 right-0">
             <svg viewBox="0 0 1440 320" className="w-full h-12 text-white fill-current drop-shadow-sm transform scale-150">
                <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
          </div>
        </div>

        {/* 2. المحتوى والتفاصيل */}
        <div className="flex flex-col flex-grow px-5 pb-5 pt-1 relative">
          
          {/* زخرفة خلفية خفيفة جداً (Pattern) */}
          <div className="absolute top-10 right-0 w-24 h-24 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none" />

          {/* التصنيف */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">مذاق أصيل</span>
          </div>

          {/* العنوان */}
          <h3 className="text-xl font-black text-gray-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>

          {/* الوصف */}
          <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 mb-6 pl-2 border-l-2 border-gray-100">
            {item.description}
          </p>

          {/* 3. أزرار التحكم (Floating Action Bar style) */}
          <div className="mt-auto">
            {count > 0 ? (
              <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded-[1.2rem] border border-gray-200/60 shadow-inner transition-all duration-300">
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(item, -1); }}
                  className="w-11 h-11 flex items-center justify-center bg-white text-gray-900 rounded-2xl shadow-sm border border-gray-100 active:scale-90 transition-transform"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"/></svg>
                </button>

                <div className="flex flex-col items-center px-4 animate-in fade-in zoom-in duration-200">
                  <span className="text-lg font-black text-gray-900 tabular-nums">{count}</span>
                  <span className="text-[9px] font-bold text-gray-400">في الطلب</span>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(item, 1); }}
                  className="w-11 h-11 flex items-center justify-center bg-orange-600 text-white rounded-2xl shadow-lg shadow-orange-200 active:scale-90 transition-transform"
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAddToCart(item, 1)}
                className="group/btn relative w-full py-3.5 bg-gray-900 hover:bg-orange-600 text-white rounded-[1.2rem] transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-orange-200 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <span className="text-sm font-bold">أضف إلى المائدة</span>
                  <div className="bg-white/20 p-1 rounded-lg backdrop-blur-sm">
                    <svg className="w-4 h-4 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                  </div>
                </div>
                
                {/* تأثير الحركة الخلفية */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuCard;