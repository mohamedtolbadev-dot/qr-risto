import React, { useState } from 'react';
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

  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1600",
      title: "ضيافة ملكية",
      subtitle: "استمتع بأرقى فنون الطبخ المغربي"
    },
    {
      url: "https://cdn.youcan.shop/stores/980bd1d3766222ef4184b517eba9d88a/products/DiHYloqoyt7soiqUcryEg9wDmRwr2iamZmXPZuSH_lg.jpg",
      title: "أصالة المذاق",
      subtitle: "نكهات مغربية عريقة بلمسة عصرية"
    },
    {
      url: "https://al3omk.com/wp-content/uploads/2020/05/image-1489336765.jpg",
      title: "سحر التوابل",
      subtitle: "من فاس إلى مراكش.. رحلة في قلب التقاليد"
    }
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
    <div className="min-h-screen bg-[#FBF9F6] selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      {/* خلفية بنمط أرابيسك خفيف جداً */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <Navbar />

      {/* --- Section 1: Hero Slider - التنسيق الفاخر --- */}
      <section className="relative h-[65vh] lg:h-[85vh] w-full overflow-hidden shadow-2xl">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-full w-full"
        >
          {sliderImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full group">
                <img 
                  src={slide.url} 
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                  alt={slide.title} 
                />
                {/* Overlay متدرج ملكي */}
                <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-transparent to-stone-950/90 flex items-center justify-center">
                  <div className="text-center px-4 max-w-4xl">
                    <div className="inline-block w-12 h-[1px] bg-amber-400 mb-6 animate-pulse"></div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 drop-shadow-2xl animate-[fadeInUp_1s_ease-out]">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-2xl text-amber-50/90 font-light tracking-[0.1em] mb-8 animate-[fadeInUp_1.2s_ease-out]">
                      {slide.subtitle}
                    </p>
                    <button className="bg-transparent border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-stone-900 px-8 py-3 rounded-full transition-all duration-500 uppercase tracking-widest text-xs font-bold backdrop-blur-sm">
                      اكتشف القائمة
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- Section 2: Filters - شريط لاصق أنيق --- */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-stone-100 shadow-sm transition-all duration-500">
        <div className="max-w-7xl mx-auto">
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* --- Section 3: Menu Grid - تنسيق المحتوى --- */}
      <main className="container mx-auto px-6 lg:px-12 py-16 relative z-10">
        
        {/* رأس القسم الفاخر */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 md:w-16 bg-amber-600/30"></div>
            <span className="text-amber-700 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
              Selected Collection
            </span>
            <div className="h-[1px] w-8 md:w-16 bg-amber-600/30"></div>
          </div>
          
          <div className="flex items-baseline gap-6 mb-2">
            <h3 className="text-4xl md:text-5xl font-serif text-stone-800">
              {activeCategory}
            </h3>
            <span className="text-stone-400 font-light text-xl">/</span>
            <span className="text-stone-400 text-sm font-light tracking-widest">
              {filteredMenu.length} SPECIMENS
            </span>
          </div>
          <div className="w-12 h-[2px] bg-amber-500 mt-4"></div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-stone-50/50 rounded-[3rem] border border-stone-100 italic">
            <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-white rounded-full shadow-sm text-3xl">🍽️</div>
            </div>
            <p className="text-stone-400 text-lg tracking-wide">نعمل حالياً على إعداد أطباق استثنائية لهذا القسم</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredMenu.map(item => (
              <div key={item.id} className="animate-[fadeIn_0.5s_ease-out]">
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

      {/* --- Section 4: Sidebar Cart & Decor --- */}
      <CartSidebar 
        cart={cart} 
        onClearCart={() => setCart([])} 
        onUpdateQuantity={(id, amt) => handleAddToCart({id}, amt)} 
      />

      {/* Footer بسيط وفخم */}
      <footer className="py-12 border-t border-stone-100 flex flex-col items-center justify-center bg-white">
          <div className="text-amber-800 font-serif text-2xl mb-4 italic">
            Le Palais Marocain
          </div>
          <p className="text-stone-400 text-[10px] tracking-[0.2em] uppercase">
            © 2024 تجربة طعام استثنائية • فاس - المغرب
          </p>
      </footer>
    </div>
  );
};

export default Home;