import React, { useState } from 'react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Components
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/WhatsAppButton';
import SocialSidebar from '../components/SocialSidebar';
import { menuData, categories } from '../data/menuData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [cart, setCart] = useState([]);

  // دالة ذكية لإدارة السلة (تمنع الأخطاء عند الضغط السريع)
  const handleAddToCart = (item, amount = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(c => c.id === item.id);
      
      if (existingItem) {
        const newQty = existingItem.quantity + amount;
        // إزالة العنصر إذا أصبحت الكمية 0 أو أقل
        if (newQty <= 0) {
          return prevCart.filter(c => c.id !== item.id);
        }
        // تحديث الكمية
        return prevCart.map(c => c.id === item.id ? { ...c, quantity: newQty } : c);
      }
      
      // إضافة عنصر جديد
      if (amount > 0) {
        return [...prevCart, { ...item, quantity: 1 }];
      }
      
      return prevCart;
    });
  };

  const filteredMenu = activeCategory === 'الكل' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <div dir="rtl" className="min-h-screen bg-[#fdfaf7] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-fixed selection:bg-orange-500 selection:text-white">
      <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />

      {/* الأيقونات الاجتماعية الثابتة على اليسار */}
      <SocialSidebar />

  {/* --- Section 1: Restaurant Profile (Facebook/Instagram Style) --- */}
<div className="relative w-full mb-8 md:mb-16">
  {/* صورة الغلاف (Cover Photo) */}
  <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] w-full overflow-hidden">
    <img 
      src="https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg" 
      className="w-full h-full object-cover" 
      alt="Restaurant Cover" 
    />
    {/* تدرج لوني خفيف */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
  </div>

  {/* Container للبروفايل والمعلومات */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative -mt-16 sm:-mt-20 md:-mt-24">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          
          {/* صورة البروفايل الدائرية */}
          <div className="relative flex-shrink-0 -mt-20 sm:-mt-24 md:-mt-28">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P9RA3o4VO0WIcHUtducAPCXGQqkH0tWlwQ&s" 
                className="w-full h-full object-cover" 
                alt="Restaurant Logo" 
              />
            </div>
            {/* علامة التحقق */}
            <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2 shadow-lg border-2 border-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
          </div>

          {/* معلومات المطعم وأوقات العمل */}
          <div className="flex-1 w-full text-center md:text-right">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                    مطعم الزاوية
                  </h1>
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    مُوصى به
                  </span>
                </div>
                <p className="text-base sm:text-lg text-gray-600 font-medium">
                  أصالة المطبخ المغربي 🇲🇦 | مطعم تقليدي في قلب فاس
                </p>
              </div>

              {/* قسم "مفتوح الآن" بتصميم عصري */}
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-700 font-bold text-sm sm:text-base">مفتوح الآن للاستقبال</span>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm sm:text-base text-gray-500 mb-8">
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-bold text-gray-800">4.8</span>
                <span className="text-gray-400">(+200 تقييم)</span>
              </div>
              <span className="hidden sm:block text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
                <span className="font-medium text-gray-800">500+ طلب ناجح</span>
              </div>
            </div>

            {/* --- قسم أوقات العمل الجديد --- */}
            <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100 mt-4">
              <div className="flex items-center gap-2 mb-4 text-gray-800">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="font-bold text-lg">أوقات العمل الرسمية</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">الإثنين - الخميس</span>
                  <span className="text-gray-900 font-bold">11:00 AM - 11:30 PM</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">الجمعة</span>
                  <span className="text-gray-900 font-bold">02:30 PM - 12:00 AM</span>
                </div>
                <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium">السبت - الأحد</span>
                  <span className="text-gray-900 font-bold">11:00 AM - 12:00 AM</span>
                </div>
                <div className="flex items-center justify-center sm:justify-end">
                   <p className="text-xs text-orange-500 italic">* متاح خدمة التوصيل طوال ساعات العمل</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     <div
  className="
    z-40
    bg-[#f8f9fa]/95 backdrop-blur-sm
    py-2

    fixed bottom-0 left-0 w-full
    md:sticky md:top-0

    border-t md:border-t-0
    shadow-[0_-4px_15px_rgba(0,0,0,0.05)]
    md:shadow-none
  "
>
  <CategoryFilter 
    categories={categories}
    activeCategory={activeCategory}
    onCategoryChange={setActiveCategory}
  />
</div>


      {/* --- Section 3: Menu Grid --- */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* عنوان القسم */}
        <div className="flex items-end justify-between mb-8 sm:mb-12 border-b-2 border-orange-100 pb-4">
          <div>
            <h3 className="text-2xl sm:text-4xl font-black text-gray-900 mb-1">
              {activeCategory}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              استمتع بأشهى الاختيارات من قائمة {activeCategory}
            </p>
          </div>
          <span className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100 text-orange-600 font-bold text-sm">
            {filteredMenu.length} خيارات
          </span>
        </div>

        {/* شبكة المنتجات */}
        {filteredMenu.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-white p-6 rounded-full shadow-lg mb-4">
              <span className="text-4xl">🧑‍🍳</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800">جاري التحضير...</h4>
            <p className="text-gray-500 mt-2">سنقوم بإضافة أطباق جديدة هنا قريباً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredMenu.map((item, index) => (
              <div 
                key={item.id} 
                className="h-full animate-fade-in-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MenuCard 
                  item={item}
                  onAddToCart={handleAddToCart}
                  count={cart.find(c => c.id === item.id)?.quantity || 0}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Section 4: Sidebar/Cart --- */}
      <CartSidebar 
        cart={cart} 
        onClearCart={() => setCart([])} 
        onUpdateQuantity={(id, amt) => handleAddToCart({id}, amt)} 
      />

      
    </div>
  );
};

export default Home;