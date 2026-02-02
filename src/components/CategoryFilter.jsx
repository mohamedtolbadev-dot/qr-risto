import { useState } from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // دالة ذكية لاختيار الأيقونة بناءً على الكلمات المفتاحية
  const getCategoryIcon = (name) => {
    const iconProps = {
      className: "w-5 h-5",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    };

    const n = name.toLowerCase();

    // 1. الكل - أيقونة شبكة
    if (n === 'الكل') return (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </svg>
    );
    
    // 2. طواجن / أطباق رئيسية - طبق مع بخار
    if (n.includes('طاجين') || n.includes('طبق') || n.includes('طواجن')) return (
      <svg {...iconProps}>
        <path d="M12 2v4"/>
        <path d="M9 2v4"/>
        <path d="M15 2v4"/>
        <circle cx="12" cy="14" r="8"/>
        <path d="M6 14h12"/>
      </svg>
    );
    
    // 3. مشويات - شواية
    if (n.includes('مشوي') || n.includes('لحم') || n.includes('كفتة')) return (
      <svg {...iconProps}>
        <path d="M3 11h18"/>
        <path d="M3 15h18"/>
        <path d="M6 6l1 14"/>
        <path d="M18 6l-1 14"/>
        <path d="M12 4v16"/>
      </svg>
    );
    
    // 4. مشروبات - كوب
    if (n.includes('عصير') || n.includes('مشروب') || n.includes('شاي')) return (
      <svg {...iconProps}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
        <line x1="6" x2="6" y1="2" y2="4"/>
        <line x1="10" x2="10" y1="2" y2="4"/>
        <line x1="14" x2="14" y1="2" y2="4"/>
      </svg>
    );
    
    // 5. حلويات - كعكة
    if (n.includes('حلو') || n.includes('تحلية') || n.includes('كعك')) return (
      <svg {...iconProps}>
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
        <path d="M2 21h20"/>
        <path d="M7 8v3"/>
        <path d="M12 8v3"/>
        <path d="M17 8v3"/>
        <path d="M7 4h.01"/>
        <path d="M12 4h.01"/>
        <path d="M17 4h.01"/>
      </svg>
    );
    
    // 6. سلطات - خضروات
    if (n.includes('سلطة') || n.includes('سلطات')) return (
      <svg {...iconProps}>
        <path d="M2 12h20"/>
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/>
        <path d="m4 8 16-4"/>
        <path d="m8.5 8.5-1 7"/>
        <path d="m15.5 8.5 1 7"/>
      </svg>
    );
    
    // 7. مقبلات - أطباق صغيرة
    if (n.includes('مقبلات') || n.includes('مقبل')) return (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8"/>
        <circle cx="12" cy="12" r="4"/>
        <line x1="12" y1="8" x2="12" y2="4"/>
        <line x1="12" y1="20" x2="12" y2="16"/>
        <line x1="8" y1="12" x2="4" y2="12"/>
        <line x1="20" y1="12" x2="16" y2="12"/>
      </svg>
    );
    
    // 8. معجنات - خبز
    if (n.includes('معجن') || n.includes('خبز') || n.includes('فطير')) return (
      <svg {...iconProps}>
        <path d="M17 21c.9 0 1.8-.3 2.5-1s1.2-1.6 1.2-2.5c0-1.9-1.2-3.5-2.9-4.2l-8-3.4C8.3 9.3 7 8.5 6 7.5 5 6.5 4.3 5.2 4.3 3.8c0-.9.3-1.8 1-2.5S7 .1 7.9.1c1.9 0 3.5 1.2 4.2 2.9l3.4 8c.6 1.5 1.4 2.8 2.4 3.8 1 1 2.3 1.7 3.7 1.7"/>
        <ellipse cx="12" cy="12" rx="10" ry="5"/>
      </svg>
    );
    
    // 9. شوربات - وعاء ساخن
    if (n.includes('شوربة') || n.includes('حساء') || n.includes('حريرة')) return (
      <svg {...iconProps}>
        <path d="M2 12h20"/>
        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/>
        <path d="M6 4v4"/>
        <path d="M10 4v4"/>
        <path d="M14 4v4"/>
      </svg>
    );
    
    // 10. مأكولات بحرية - سمكة
    if (n.includes('سمك') || n.includes('بحري') || n.includes('جمبري')) return (
      <svg {...iconProps}>
        <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/>
        <path d="M18 12v.5"/>
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86"/>
        <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"/>
        <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4"/>
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98"/>
      </svg>
    );

    // أيقونة افتراضية (سكينة وشوكة)
    return (
      <svg {...iconProps}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
      </svg>
    );
  };

  // دالة للحصول على صورة الخلفية بناءً على الفئة
  const getCategoryBackground = (name) => {
    const n = name.toLowerCase();
    
    if (n === 'الكل') return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
    if (n.includes('طاجين') || n.includes('طبق') || n.includes('طواجن')) return 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop';
    if (n.includes('مشوي') || n.includes('لحم') || n.includes('كفتة')) return 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop';
    if (n.includes('عصير') || n.includes('مشروب') || n.includes('شاي')) return 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop';
    if (n.includes('حلو') || n.includes('تحلية') || n.includes('كعك')) return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop';
    if (n.includes('سلطة') || n.includes('سلطات')) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop';
    if (n.includes('مقبلات') || n.includes('مقبل')) return 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop';
    if (n.includes('معجن') || n.includes('خبز') || n.includes('فطير')) return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop';
    if (n.includes('شوربة') || n.includes('حساء') || n.includes('حريرة')) return 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop';
    if (n.includes('سمك') || n.includes('بحري') || n.includes('جمبري')) return 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop';
    
    return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop';
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsFilterOpen(false);
  };

  return (
    <>
      {/* Desktop View - الشريط الأفقي */}
      <div className="hidden md:block sticky top-[72px] z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto">
          <div className="flex gap-4 overflow-x-auto px-6 py-4 no-scrollbar items-center">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              
              return (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`
                    relative flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-sm transition-all duration-300
                    whitespace-nowrap group
                    ${isActive 
                      ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 -translate-y-0.5' 
                      : 'bg-white text-gray-500 hover:text-orange-600 border border-gray-100 hover:border-orange-100'
                    }
                  `}
                >
                  {/* الأيقونة */}
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:rotate-12'}`}>
                    {getCategoryIcon(category)}
                  </span>

                  <span className="tracking-wide">{category}</span>

                  {/* نقطة الاختيار */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* تدرج جانبي */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/90 to-transparent pointer-events-none" />
      </div>

      {/* Mobile View - زر الفلتر الثابت */}
      <div className="md:hidden fixed bottom-20 right-6 z-50">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:bg-orange-700 transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
            />
          </svg>
          {/* Badge للفئة النشطة */}
          <span className="absolute -top-1 -left-1 bg-white text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
            {categories.indexOf(activeCategory) + 1}
          </span>
        </button>
      </div>

      {/* Mobile Modal - نافذة الفئات */}
      {isFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-b from-orange-50 to-white px-6 py-4 border-b border-orange-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-800">اختر الفئة</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="overflow-y-auto p-4 pb-8" style={{ maxHeight: 'calc(85vh - 80px)' }}>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  const backgroundImage = getCategoryBackground(category);
                  
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`
                        relative overflow-hidden rounded-2xl h-32 transition-all duration-300
                        ${isActive 
                          ? 'ring-4 ring-orange-500 shadow-2xl scale-105' 
                          : 'shadow-md hover:shadow-xl active:scale-95'
                        }
                      `}
                    >
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                      />
                      
                      {/* Overlay */}
                      <div className={`
                        absolute inset-0 transition-all duration-300
                        ${isActive 
                          ? 'bg-gradient-to-t from-orange-600/95 via-orange-500/80 to-orange-400/60' 
                          : 'bg-gradient-to-t from-black/70 via-black/40 to-transparent'
                        }
                      `} />
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center gap-2 p-4">
                        <div className={`
                          p-3 rounded-full transition-all duration-300
                          ${isActive ? 'bg-white/30 backdrop-blur-sm' : 'bg-white/20 backdrop-blur-sm'}
                        `}>
                          <div className="text-white">
                            {getCategoryIcon(category)}
                          </div>
                        </div>
                        
                        <span className="text-white font-black text-base text-center leading-tight drop-shadow-lg">
                          {category}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute top-2 right-2">
                            <div className="flex h-6 w-6">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-6 w-6 bg-white items-center justify-center">
                                <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS للأنيميشن */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default CategoryFilter;