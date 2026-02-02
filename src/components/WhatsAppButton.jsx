import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { restaurantInfo } from '../data/menuData';



// --- مكتبة الأيقونات (SVG) ---

const Icons = {

  WhatsApp: () => (

    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">

      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>

    </svg>

  ),

  Close: () => (

    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>

      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />

    </svg>

  ),

  Trash: () => (

    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>

      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

    </svg>

  ),

  Cart: () => (

    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>

      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />

    </svg>

  ),

  Spinner: () => (

    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

    </svg>

  )

};



const SidebarCart = ({ cart, onClearCart }) => {

  const navigate = useNavigate();

  const [isSending, setIsSending] = useState(false);

  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === 'Escape') setIsOpen(false);

    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);

  }, []);



  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);



  const sendToWhatsApp = async () => {

    if (cart.length === 0) return;

    setIsSending(true);



    let message = `*🍽️ طلب جديد من ${restaurantInfo.name}*\n\n`;

    message += `━━━━━━━━━━━━━━━━\n`;

    cart.forEach((item, index) => {

      message += `\n*${index + 1}. ${item.name}* (x${item.quantity})\n`;

      message += `   └ ${item.price * item.quantity} درهم\n`;

    });

    message += `\n━━━━━━━━━━━━━━━━\n`;

    message += `*💰 المجموع الكلي: ${getTotalPrice()} درهم*\n`;

    message += `📦 عدد العناصر: ${getTotalItems()}\n`;



    try {

      // ✅ تصحيح: استخدام المسار النسبي ليعمل على استضافة Vercel

      const response = await fetch('/api/send-whatsapp', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({

          phone: restaurantInfo.phone,

          message: message,

          orderDetails: {

            items: cart,

            total: getTotalPrice(),

            date: new Date().toISOString()

          }

        })

      });



      const contentType = response.headers.get("content-type");

      let data;

      if (contentType && contentType.includes("application/json")) {

        data = await response.json();

      } else {

        throw new Error('Backend returned invalid response');

      }



      if (response.ok && data.success) {

        localStorage.setItem('lastOrder', JSON.stringify({

          items: cart,

          total: getTotalPrice(),

          date: new Date().toISOString(),

          messageSent: true

        }));

        onClearCart();

        setIsOpen(false);

        navigate('/success');

      } else {

        alert(`حدث خطأ: ${data.error || 'يرجى المحاولة مرة أخرى'}`);

      }

    } catch (error) {

      console.error('Error sending WhatsApp:', error);

      alert('❌ فشل الاتصال بالسيرفر. تأكد من إعدادات الاستضافة.');

    } finally {

      setIsSending(false);

    }

  };



  if (cart.length === 0) return null;

  return (
    <>
      {/* 1. زر الفتح العائم (Floating Trigger Button) */}
      {/* يظهر فقط عندما تكون السلة مغلقة */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open Cart"
        >
          <div className="relative">
            <Icons.Cart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-gray-900 group-hover:border-orange-600 transition-colors">
              {getTotalItems()}
            </span>
          </div>
        </button>
      )}

      {/* 2. الخلفية المظللة (Overlay) */}
      {/* تظهر عند فتح السلة لتغطية باقي الموقع */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* 3. القائمة الجانبية (Left Sidebar) */}
      <div 
        className={`fixed top-0 left-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        
        {/* Header - رأس القائمة */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
              <Icons.Cart />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">سلة الطلبات</h2>
              <p className="text-xs text-gray-500">{getTotalItems()} منتجات مضافة</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icons.Close />
          </button>
        </div>

        {/* Body - قائمة المنتجات (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 animate-fade-in">
              {/* صورة المنتج المصغرة (إذا وجدت) */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                  <span className="font-bold text-gray-900 text-sm">{item.price * item.quantity} DH</span>
                </div>
                
                <div className="flex justify-between items-end mt-2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                     الكمية: {item.quantity}
                  </span>
                  {/* السعر الإفرادي */}
                  <span className="text-[10px] text-gray-400">
                    {item.price} DH / للقطعة
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer - الجزء السفلي الثابت */}
        <div className="bg-white border-t border-gray-100 p-6 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          {/* الملخص المالي */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي</span>
              <span>{getTotalPrice()} DH</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-200">
              <span className="font-bold text-lg text-gray-900">الإجمالي</span>
              <span className="font-extrabold text-xl text-orange-600">{getTotalPrice()} DH</span>
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="space-y-3">
            <button
              onClick={sendToWhatsApp}
              disabled={isSending}
              className="w-full bg-[#25D366] hover:bg-[#1faa53] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSending ? <Icons.Spinner /> : <Icons.WhatsApp />}
              <span>إتمام الطلب عبر واتساب</span>
            </button>
            
            <button
              onClick={() => {
                if(window.confirm('هل أنت متأكد من حذف السلة؟')) onClearCart();
              }}
              className="w-full py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Icons.Trash />
              <span>إفراغ السلة</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default SidebarCart;