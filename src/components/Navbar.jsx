import { restaurantInfo } from '../data/menuData';

// أيقونات SVG
const Icons = {
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  MapPin: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  ),
  GoogleMaps: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  )
};

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 shadow-lg">
      
      {/* الشريط الرئيسي (Orange Bar) */}
      <nav 
        className="bg-orange-600 text-white relative py-3"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')",
          backgroundRepeat: 'repeat'
        }}
      >
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-md">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none">
                  {restaurantInfo.name}
                </h1>
                <span className="text-[10px] font-bold text-orange-200 mt-1 uppercase tracking-widest">
                  Fes Heritage Kitchen
                </span>
              </div>
            </div>

            {/* Action Button */}
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-xs md:text-sm hover:bg-black transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <Icons.Phone />
              <span className="hidden sm:inline">طلب مساعدة</span>
            </a>
            
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;