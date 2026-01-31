import React, { useState } from 'react';

// Components
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import MenuCard from '../components/MenuCard';
import CartSidebar from '../components/WhatsAppButton'; // تأكد من المسار
import { menuData, categories } from '../data/menuData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [cart, setCart] = useState([]);

  // صور ثابتة للبروفايل والغلاف (يمكنك تغيير الروابط لاحقاً)
  const profileImages = {
    cover: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600", // صورة الغلاف (مطبخ مغربي)
    avatar: "https://cdn-icons-png.flaticon.com/512/6643/6643359.png" // لوجو المطعم (أو صورة طاجين)
  };

  // دالة ذكية لإدارة السلة
  const handleAddToCart = (item, amount = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(c => c.id === item.id);
      
      if (existingItem) {
        const newQty = existingItem.quantity + amount;
        if (newQty <= 0) {
          return prevCart.filter(c => c.id !== item.id);
        }
        return prevCart.map(c => c.id === item.id ? { ...c, quantity: newQty } : c);
      }
      
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
    <div dir="rtl" className="min-h-screen bg-[#f8f9fa] selection:bg-orange-500 selection:text-white pb-20">
      <Navbar cartCount={cart.reduce((a, b) => a + b.quantity, 0)} />
{/* --- Section 1: Restaurant Profile (Facebook/Instagram Style) --- */}
<div className="relative w-full mb-8 md:mb-16">
  {/* صورة الغلاف (Cover Photo) */}
  <div className="relative h-[35vh] sm:h-[40vh] md:h-[50vh] w-full overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600" 
      className="w-full h-full object-cover" 
      alt="Restaurant Cover" 
    />
    {/* تدرج لوني خفيف */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
  </div>

  {/* Container للبروفايل والمعلومات */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative -mt-16 sm:-mt-20 md:-mt-24">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          
          {/* صورة البروفايل الدائرية */}
          <div className="relative flex-shrink-0 -mt-20 sm:-mt-24 md:-mt-28">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-2xl overflow-hidden bg-white">
              <img 
                src="https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg" 
                className="w-full h-full object-cover" 
                alt="Restaurant Logo" 
              />
            </div>
            {/* علامة التحقق (اختياري) */}
            <div className="absolute bottom-2 right-2 bg-orange-500 rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
          </div>

          {/* معلومات المطعم */}
          <div className="flex-1 text-center md:text-right pb-2">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
                مطعم الزاوية
              </h1>
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                مُوصى به
              </span>
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 mb-4 font-medium">
              أصالة المطبخ المغربي 🇲🇦 | مطعم تقليدي في قلب فاس
            </p>

            {/* إحصائيات سريعة */}
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 text-sm sm:text-base text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-semibold">4.8</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="font-medium">500+ طلب</span>
              <span className="text-gray-300">•</span>
              <span className="font-medium">مفتوح الآن</span>
            </div>
          </div>

          {/* أيقونات التواصل الاجتماعي */}
<div className="flex-shrink-0 w-full md:w-auto">
  <div className="flex items-center justify-center gap-2 sm:gap-3">
    
    {/* Instagram */}
    <a 
      href="https://instagram.com/your_restaurant" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="تابعنا على Instagram"
    >
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </a>

    {/* Facebook */}
    <a 
      href="https://facebook.com/your_restaurant" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="تابعنا على Facebook"
    >
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>

    {/* Google Maps */}
    <a 
      href="https://maps.google.com/?q=Your+Restaurant+Location" 
      target="_blank" 
      rel="noopener noreferrer"
      className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      title="موقعنا على الخريطة"
    >
      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C7.589 0 4 3.589 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
      </svg>
    </a>

  </div>
</div>

        </div>
      </div>
    </div>
  </div>
</div>
      {/* --- Section 2: Sticky Filters --- */}
      {/* تم إزالة الهوامش السلبية لجعلها تتدفق بشكل طبيعي أسفل البروفايل */}
<div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-sm py-2 mb-6">
  <CategoryFilter 
    categories={categories}
    activeCategory={activeCategory}
    onCategoryChange={setActiveCategory}
  />
</div>

      {/* --- Section 3: Menu Grid --- */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-gray-800 border-r-4 border-orange-500 pr-3">
             {activeCategory}
           </h3>
           <span className="text-xs text-gray-400 font-bold bg-white px-2 py-1 rounded border">
             {filteredMenu.length} وجبة
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

      {/* --- Section 4: Sidebar/Cart (WhatsApp) --- */}
      <CartSidebar 
        cart={cart} 
        onClearCart={() => setCart([])} 
        onUpdateQuantity={(id, amt) => handleAddToCart({id}, amt)} 
      />

      {/* Footer بسيط (تم تبسيطه لأن البروفايل يحتوي على المعلومات) */}
      <footer className="bg-white border-t border-gray-100 py-8 text-center">
        <p className="text-gray-400 text-xs">
          © 2024 مطعم الزاوية - فاس
        </p>
      </footer>
    </div>
  );
};

export default Home;