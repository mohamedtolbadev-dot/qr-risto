import React, { useState } from 'react';
// استيراد Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/WhatsAppButton';
import { menuData, categories } from '../data/menuData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [cart, setCart] = useState([]);

  // صور السلايدر (أطباق مغربية مميزة)
  const sliderImages = [
    "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600",
    "https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg",
    "https://al3omk.com/wp-content/uploads/2020/05/image-1489336765.jpg"
  ];

  const handleAddToCart = (item, amount = 1) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      const newQty = existing.quantity + amount;
      if (newQty <= 0) {
        setCart(cart.filter(c => c.id !== item.id));
      } else {
        setCart(cart.map(c => c.id === item.id ? { ...c, quantity: newQty } : c));
      }
    } else if (amount > 0) {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const filteredMenu = activeCategory === 'الكل' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fdfaf7] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-fixed">
      <Navbar />

      {/* --- Section 1: Hero Slider --- */}
      <div className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img src={img} className="w-full h-full object-cover" alt="Moroccan Dish" />
                {/* تدرج لوني محسّن */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-center justify-center">
                  <div className="text-center text-white px-4 sm:px-6 md:px-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 md:mb-4 drop-shadow-2xl leading-tight animate-fade-in">
                      تذوق الأصالة المغربية
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium opacity-90 drop-shadow-lg">أطباق تقليدية بلمسة عصرية</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Section 2: Filters --- */}
      <div className="sticky top-0 z-40">
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* --- Section 3: Menu Grid --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* عنوان القسم محسّن */}
        <div className="relative mb-8 md:mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 sm:gap-0 border-r-4 border-orange-500 pr-3 sm:pr-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 italic">
              {activeCategory}
            </h3>
            <span className="text-sm sm:text-base text-orange-600 font-bold bg-orange-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
              {filteredMenu.length} طبق
            </span>
          </div>
          {/* خط زخرفي */}
          <div className="mt-3 sm:mt-4 h-1 w-20 sm:w-24 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-lg border-2 border-dashed border-gray-300 italic mx-2 sm:mx-0">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🍽️</div>
            <p className="text-lg sm:text-xl text-gray-600 px-4">قريباً.. أطباق جديدة في هذا القسم</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {filteredMenu.map(item => (
              <MenuCard 
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                count={cart.find(c => c.id === item.id)?.quantity || 0}
              />
            ))}
          </div>
        )}
      </div>

      {/* --- Section 4: Sidebar Cart --- */}
      <CartSidebar 
        cart={cart} 
        onClearCart={() => setCart([])} 
        onUpdateQuantity={(id, amt) => handleAddToCart({id}, amt)} 
      />

      {/* Footer محسّن مع روابط التواصل */}
      <footer className="relative py-12 sm:py-14 md:py-16 bg-gradient-to-b from-transparent to-orange-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* شعار المطعم */}
          <div className="text-center mb-6 sm:mb-8">
            <h4 className="text-2xl sm:text-3xl font-black text-orange-600 mb-2">مطعم الزاوية</h4>
            <p className="text-sm sm:text-base text-gray-600 font-medium">أصالة المطبخ المغربي</p>
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Google Maps */}
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-red-600"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C7.589 0 4 3.589 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
              </svg>
            </a>
          </div>

          {/* معلومات الاتصال */}
          <div className="text-center space-y-2 mb-6 sm:mb-8">
            <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center gap-2 px-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span dir="ltr" className="font-medium">+212 XXX-XXXXXX</span>
            </p>
            <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center gap-2 px-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span className="font-medium">فاس، المغرب</span>
            </p>
          </div>

          {/* خط فاصل زخرفي */}
          <div className="flex items-center justify-center mb-5 sm:mb-6">
            <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>
            <div className="mx-3 sm:mx-4 text-orange-500">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent via-orange-300 to-transparent"></div>
          </div>

          {/* حقوق النشر */}
          <p className="text-center text-gray-400 text-xs sm:text-sm font-medium px-4">
            © 2024 مطعم الزاوية - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;