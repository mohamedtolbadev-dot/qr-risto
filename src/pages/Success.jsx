import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import GoogleReviewCTA from '../components/GoogleReviewCTA';

const Success = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrderDetails(JSON.parse(lastOrder));
    }
  }, []);

  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <div 
      className="min-h-screen bg-[#fcfcfc] text-right" 
      dir="rtl"
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')`,
        backgroundRepeat: 'repeat'
      }}
    >
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* أيقونة النجاح */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-green-600 p-4 sm:p-6 rounded-full shadow-lg">
              <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* الرسالة الأساسية */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
              شكراً لك!
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 px-2">
              تم إرسال طلبك بنجاح عبر واتساب. سنتواصل معك قريباً لتأكيد الطلب وتحديد موعد التوصيل.
            </p>

            {/* ملخص الطلب */}
            {orderDetails && (
              <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-5 sm:p-7 mb-6 sm:mb-8 border border-orange-100">
                <div className="flex items-center gap-2 mb-4 sm:mb-5 justify-start border-b border-orange-200 pb-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="font-black text-gray-900 text-base sm:text-lg">ملخص الطلب</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-bold whitespace-nowrap">
                          {item.quantity}×
                        </span>
                        <span className="font-bold text-gray-700 text-sm sm:text-base truncate">{item.name}</span>
                      </div>
                      <span className="font-black text-gray-900 text-sm sm:text-base whitespace-nowrap">
                        {item.price * item.quantity} درهم
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t border-orange-200 pt-3 sm:pt-4 mt-2">
                    <div className="flex justify-between items-center font-black">
                      <span className="text-gray-900 text-base sm:text-lg lg:text-xl">المجموع الكلي</span>
                      <span className="text-orange-600 text-lg sm:text-xl lg:text-2xl">{orderDetails.total} درهم</span>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <button
              onClick={handleBackToMenu}
              className="w-full bg-orange-600 text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>العودة إلى القائمة الرئيسية</span>
            </button>
          </div>

          {/* Google Review CTA */}
          <div className="mb-6">
            <GoogleReviewCTA />
          </div>

          {/* معلومات مهمة */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6 justify-start border-b border-gray-100 pb-3 sm:pb-4">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-black text-gray-900 text-base sm:text-lg lg:text-xl">معلومات مهمة</h3>
            </div>
            
            <ul className="space-y-3 sm:space-y-4">
              {[
                "سيتم تأكيد طلبك خلال 5-10 دقائق",
                "مدة التوصيل المتوقعة: 30-45 دقيقة",
                "الدفع عند الاستلام أو عبر التحويل البنكي",
                "في حالة عدم توفر أي منتج سنتواصل معك لتقديم بدائل"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 text-gray-600 font-bold text-sm sm:text-base">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;