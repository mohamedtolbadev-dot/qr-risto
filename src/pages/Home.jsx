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

      {/* --- Section 1: Restaurant Profile (Enhanced + Opening Hours) --- */}
<div className="relative w-full mb-8 md:mb-16">

  {/* Cover Photo */}
  <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
    <img
      src="https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg"
      alt="Restaurant Cover"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
  </div>

  {/* Profile Container */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative -mt-20 sm:-mt-24 md:-mt-28">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">

        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7P9RA3o4VO0WIcHUtducAPCXGQqkH0tWlwQ&s"
              alt="Restaurant Logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Verified Badge */}
          <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2 shadow-md">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="flex-1 text-center md:text-right space-y-3">

          {/* Name & Badge */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-2 md:gap-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              مطعم الزاوية
            </h1>
            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              مُوصى به
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg font-medium">
            أصالة المطبخ المغربي 🇲🇦 | مطعم تقليدي في قلب فاس
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center md:justify-start gap-2 sm:gap-6 text-sm sm:text-base text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-semibold">4.8</span>
            </div>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="font-medium">500+ طلب</span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="font-medium text-green-600">مفتوح الآن</span>
          </div>

          {/* Opening Hours */}
          <div className="mt-2 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4 text-gray-500 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v5l4 2"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>الإثنين - الجمعة: 09:00 - 22:00</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8v5l4 2"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
              <span>السبت - الأحد: 10:00 - 23:00</span>
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