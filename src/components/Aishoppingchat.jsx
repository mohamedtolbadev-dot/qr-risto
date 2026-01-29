import React, { useState, useEffect, useRef } from 'react';
import { Send, ShoppingBag, X, User, MapPin, Phone, CheckCircle, Loader2, Package, Sparkles, ChevronLeft } from 'lucide-react';

/**
 * بيانات المنتجات الوهمية (المخزون)
 */
const PRODUCTS = [
  {
    id: 1,
    name: "ساعة كرونوس إليت",
    price: 450,
    category: "إلكترونيات فاخرة",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "هيكل من التيتانيوم، زجاج سافير، وتتبع صحي دقيق بذكاء اصطناعي."
  },
  {
    id: 2,
    name: "سماعات ستوديو برو",
    price: 320,
    category: "صوتيات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "تجربة صوتية غامرة مع عزل ضوضاء نشط وتصميم مريح للأذن."
  },
  {
    id: 3,
    name: "حقيبة أكسفورد الجلدية",
    price: 180,
    category: "موضة",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    description: "جلد إيطالي طبيعي مدبوغ يدوياً، رفيقك المثالي في رحلات العمل."
  },
  {
    id: 4,
    name: "نظارة بايلوت كلاسيك",
    price: 120,
    category: "إكسسوارات",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    description: "عدسات مستقطبة تحمي عينيك بأناقة خالدة لا تبطل موضتها."
  },
  {
    id: 5,
    name: "عطر ليالي العود الملكي",
    price: 250,
    category: "عطور نيش",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "تركيبة نادرة من العود الكمبودي والزعفران، ثبات يدوم طويلاً."
  }
];

const API_KEY = "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";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'مرحباً بك في "المستقبل" - وجهتك للفخامة.\nأنا مستشارك الشخصي للتسوق. هل تبحث عن شيء يضيف لمسة أناقة ليومك؟',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: '',
    isComplete: false
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // --- Logic: Cart Management ---
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  // --- Logic: AI Communication ---
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    
    const newMessages = [...messages, { role: 'user', content: userText, type: 'text' }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const systemPrompt = `
        أنت مساعد مبيعات ذكي ومحترف لمتجر "المستقبل" الفاخر.
        شخصيتك: لبق، ذو ذوق رفيع، وتستخدم لغة عربية فصحى عصرية وجذابة.
        
        قائمة المنتجات:
        ${JSON.stringify(PRODUCTS)}

        السلة الحالية (مهم جداً):
        ${JSON.stringify(cart)}

        القواعد الصارمة (السيناريوهات):
        
        1. **سيناريو عرض المنتجات**:
           - إذا طلب العميل رؤية منتجات، استخدم JSON لعرضها:
           <<<JSON
           {
             "action": "show_products",
             "productIds": [1, 2] 
           }
           JSON>>>

        2. **سيناريو بدء إتمام الطلب (Checkout)**:
           - إذا قال العميل "أريد إتمام الطلب" أو "شراء" أو "الدفع":
             أولاً: قم بسرد محتويات السلة له نصياً (أسماء المنتجات والمجموع) لتأكيد ما سيشتريه.
             ثانياً: أخبره بأسلوب لبق أنك بحاجة لبعض المعلومات لإكمال الطلب، وابدأ بسؤاله عن (الاسم الكريم).
        
        3. **سيناريو جمع البيانات**:
           - استمر في جمع البيانات الناقصة (الاسم، ثم رقم الهاتف، ثم العنوان) واحداً تلو الآخر في رسائل منفصلة.

        4. **سيناريو التأكيد النهائي**:
           - فقط عندما تكتمل جميع البيانات (الاسم، الهاتف، والعنوان)، اعرض ملخص الطلب للتأكيد باستخدام JSON:
           <<<JSON
           {
             "action": "show_summary",
             "customer": { "name": "...", "phone": "...", "address": "..." }
           }
           JSON>>>
        
        اجعل ردودك قصيرة، ذكية، وتشجع على الشراء.
      `;

      const apiMessages = [
        { role: "system", content: systemPrompt },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: apiMessages,
          temperature: 0.7,
        })
      });

      const data = await response.json();
      let aiContent = data.choices[0].message.content;

      let type = 'text';
      let extraData = null;

      const jsonMatch = aiContent.match(/<<<JSON([\s\S]*?)JSON>>>/);

      if (jsonMatch) {
        try {
          const jsonStr = jsonMatch[1];
          const parsedData = JSON.parse(jsonStr);
          aiContent = aiContent.replace(jsonMatch[0], '').trim();

          if (parsedData.action === 'show_products') {
            type = 'product-grid';
            extraData = PRODUCTS.filter(p => parsedData.productIds.includes(p.id));
          } else if (parsedData.action === 'show_summary') {
            type = 'order-summary';
            extraData = parsedData.customer;
            setCustomerData(prev => ({ ...prev, ...parsedData.customer, isComplete: true }));
          }
        } catch (e) {
          console.error("Error parsing AI JSON", e);
        }
      }

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiContent, 
        type: type,
        data: extraData 
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'نعتذر، واجهنا انقطاعاً بسيطاً. هل يمكنك إعادة المحاولة؟', type: 'text' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOrder = () => {
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `تهانينا ${customerData.name}! 🎉\nتم تأكيد طلبك بنجاح. سنقوم بتجهيزه بعناية وإرساله إلى ${customerData.address}.`, 
      type: 'text' 
    }]);
    setCart([]);
    setCustomerData({ name: '', phone: '', address: '', isComplete: false });
  };

  // --- Refined UI Components ---

  // بطاقة المنتج بتصميم فخم وكبير
  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100/50 overflow-hidden w-72 md:w-80 flex-shrink-0 snap-center transform transition-all duration-300 hover:-translate-y-2 relative">
      <div className="relative h-64 bg-gray-50 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-sm tracking-wide text-gray-800">
          {product.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>
          <span className="font-serif text-xl font-bold text-black flex items-start gap-1">
            {product.price} <span className="text-xs font-sans mt-1 text-gray-500">ر.س</span>
          </span>
        </div>
        
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        
        <button 
          onClick={() => addToCart(product)}
          className="mt-2 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 group-active:scale-95 shadow-lg shadow-gray-200"
        >
          <ShoppingBag size={18} />
          <span>إضافة للسلة</span>
        </button>
      </div>
    </div>
  );

  const OrderSummary = ({ customer }) => (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-sm w-full mx-auto mt-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-green-50 p-2 rounded-xl text-green-600">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">ملخص الطلب</h3>
          <p className="text-xs text-gray-500">الرجاء المراجعة قبل التأكيد</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
           <div className="flex items-start gap-3 text-sm text-gray-700">
            <User size={18} className="text-gray-400 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">العميل</span>
              <span className="font-semibold">{customer.name || customerData.name}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <Phone size={18} className="text-gray-400 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">الهاتف</span>
              <span className="font-semibold">{customer.phone || customerData.phone}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <MapPin size={18} className="text-gray-400 mt-0.5" />
             <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">العنوان</span>
              <span className="font-semibold">{customer.address || customerData.address}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm text-gray-900 mb-3 px-1">المنتجات المختارة</h4>
          <div className="space-y-2">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-200 text-gray-700 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.qty}</span>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{item.price * item.qty} ر.س</span>
              </div>
            ))}
          </div>
          <div className="border-t border-dashed border-gray-200 mt-4 pt-4 flex justify-between items-center">
            <span className="font-bold text-gray-600">الإجمالي الكلي</span>
            <span className="font-bold text-2xl text-gray-900">{calculateTotal()} <span className="text-sm text-gray-500 font-normal">ر.س</span></span>
          </div>
        </div>
      </div>

      <button 
        onClick={confirmOrder}
        className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
      >
        <CheckCircle size={20} />
        تأكيد وإتمام الطلب
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[#FDFDFD] font-sans text-right text-gray-900" dir="rtl">
      {/* --- Elegant Glass Header --- */}
      <header className="absolute top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 px-6 py-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <Sparkles size={20} className="text-yellow-400" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-gray-900">المستقبل</h1>
            <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Luxury Store</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative group p-2.5 rounded-full hover:bg-gray-100 transition-all duration-300"
        >
          <ShoppingBag className="text-gray-800 w-6 h-6 group-hover:scale-105 transition-transform" strokeWidth={1.5} />
          {cart.length > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow ring-2 ring-white transform scale-100 animate-in zoom-in">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          )}
        </button>
      </header>

      {/* --- Main Chat Area --- */}
      <main className="flex-1 overflow-y-auto pt-24 pb-4 px-4 md:px-6 space-y-8 scroll-smooth">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} group animate-in slide-in-from-bottom-2 duration-500`}>
            
            {/* User Bubble */}
            {msg.role === 'user' && (
              <div className="bg-gray-900 text-white px-6 py-4 rounded-[2rem] rounded-tr-none shadow-xl shadow-gray-200/50 max-w-[85%] md:max-w-[70%] text-sm md:text-base leading-relaxed tracking-wide">
                {msg.content}
              </div>
            )}

            {/* AI Assistant Bubble */}
            {msg.role === 'assistant' && (
              <div className="flex flex-col items-end w-full">
                <div className="flex items-start gap-3 max-w-full flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-white shadow-md flex-shrink-0 flex items-center justify-center overflow-hidden mt-1">
                    <span className="text-[10px] font-black text-gray-500">AI</span>
                  </div>
                  
                  <div className="space-y-4 flex flex-col items-end w-full">
                    {/* The Text Bubble */}
                    {msg.content && (
                      <div className="bg-white border border-gray-100 text-gray-800 px-6 py-4 rounded-[2rem] rounded-tl-none shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-line max-w-[90%] md:max-w-[80%]">
                        {msg.content}
                      </div>
                    )}
                    
                    {/* Horizontal Product Scroller - Improved */}
                    {msg.type === 'product-grid' && msg.data && (
                      <div className="w-full relative group/slider">
                        <div className="flex gap-4 overflow-x-auto pb-8 pt-2 snap-x px-1 w-full scrollbar-hide">
                          {msg.data.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                          {/* مساحة فارغة في النهاية للتمرير المريح */}
                          <div className="w-4 flex-shrink-0" />
                        </div>
                        {/* تلميح للتمرير (Gradient Fade) */}
                        <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-[#FDFDFD] to-transparent pointer-events-none md:block hidden" />
                      </div>
                    )}

                    {/* Order Summary */}
                    {msg.type === 'order-summary' && msg.data && (
                      <OrderSummary customer={msg.data} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-end w-full px-12">
            <div className="bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="text-gray-400 text-xs font-medium">يكتب الآن...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* --- Elegant Cart Drawer --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/10 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white z-10">
              <div>
                <h2 className="font-bold text-xl text-gray-900">سلتك</h2>
                <p className="text-xs text-gray-500 mt-1">{cart.length} منتجات مختارة</p>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="text-gray-400 hover:text-red-500 transition-colors" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-gray-400">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <p className="font-medium">السلة فارغة حالياً</p>
                  <p className="text-xs mt-2 text-gray-400">اطلب من المساعد الذكي عرض المنتجات لتبدأ التسوق.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="group flex gap-4 items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="text-sm font-bold text-black">{item.price} ر.س</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 pl-1">
                       <span className="text-xs font-bold bg-gray-100 px-2.5 py-1 rounded-lg">x{item.qty}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-white border-t border-gray-50 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
              <div className="flex justify-between items-end mb-6">
                <span className="text-gray-500 text-sm">المجموع الكلي</span>
                <span className="font-black text-2xl text-gray-900">{calculateTotal()} <span className="text-sm font-normal text-gray-400">ر.س</span></span>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setInput("أريد إتمام الطلب");
                  sendMessage();
                }}
                disabled={cart.length === 0}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all flex justify-between px-6 items-center group"
              >
                <span>إتمام الشراء</span>
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Floating Input Area --- */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-10">
        <div className="max-w-3xl mx-auto relative flex items-center gap-3 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 ring-4 ring-gray-50">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="اكتب هنا.. (مثال: أرني العطور الفاخرة)"
            className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 px-4 py-2 focus:outline-none text-base"
            disabled={isLoading}
            autoFocus
          />
          <button 
            onClick={sendMessage} 
            disabled={!input.trim() || isLoading}
            className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-90"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
          </button>
        </div>
      </footer>
    </div>
  );
}