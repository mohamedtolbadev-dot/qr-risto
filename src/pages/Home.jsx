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
import CartSidebar from '../components/WhatsAppButton'; // تأكد من تسمية الملف بشكل صحيح (CartSidebar أم WhatsAppButton)
import { menuData, categories } from '../data/menuData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [cart, setCart] = useState([]);

  const sliderImages = [
    "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600",
    "https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg",
    "https://al3omk.com/wp-content/uploads/2020/05/image-1489336765.jpg"
  ];

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

      {/* --- Section 1: Hero Slider --- */}
{/* أضفنا md:mb-24 لزيادة المسافة في الحاسوب و mb-12 للموبايل */}
<div className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] w-full overflow-hidden mb-12 md:mb-24">
  <Swiper
    modules={[Autoplay, Pagination, EffectFade]}
    effect="fade"
    speed={1000}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    pagination={{ clickable: true, dynamicBullets: true }}
    className="h-full w-full"
  >
    {sliderImages.map((img, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-full w-full">
          {/* الصورة */}
          <img 
            src={img} 
            className="w-full h-full object-cover animate-pan-image" 
            alt="Moroccan Cuisine" 
          />
          
          {/* تدرج لوني سينمائي */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
            <div className="text-center text-white px-6 max-w-3xl translate-y-4">
              <span className="inline-block py-1 px-3 border border-orange-400/50 rounded-full text-orange-300 text-[10px] sm:text-sm font-bold mb-4 backdrop-blur-sm tracking-widest">
                مرحباً بكم في فاس • WELCOME TO FES
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] leading-tight">
                أصالة المطبخ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">المغربي</span>
              </h2>
              <p className="text-sm sm:text-lg md:text-xl text-gray-200 font-medium max-w-lg mx-auto leading-relaxed opacity-90 drop-shadow-md">
                نقدم لكم أطباقاً محضرة بعناية وحب، تمزج بين تقاليد الأجداد ولمسات العصر.
              </p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
  
  {/* تموج في أسفل السلايدر (تم زيادة قوته md:h-32) لدمج أنعم مع المسافة الجديدة */}
  <div className="absolute bottom-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#fdfaf7] via-[#fdfaf7]/50 to-transparent z-10" />
</div>

      {/* --- Section 2: Filters --- */}
      {/* هنا يظهر الفلتر (Sticky في الدسكتاوب، وزر عائم في الموبايل حسب مكون CategoryFilter الذي طورناه سابقاً) */}
      <div className="relative z-30 -mt-8 sm:-mt-12 mb-8">
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
                style={{ animationDelay: `${index * 50}ms` }} // تأثير ظهور متتابع
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