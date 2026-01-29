import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, ShoppingBag, X, User, MapPin, Phone, 
  CheckCircle, Loader2, Package, Sparkles, 
  ChevronLeft, Eye, Plus, Minus, CreditCard
} from 'lucide-react';

/**
 * بيانات المنتجات (المخزون)
 */
const PRODUCTS = [
  {
    id: 1,
    name: "ساعة كرونوس إليت",
    price: 450,
    category: "إلكترونيات فاخرة",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "تحفة هندسية تجمع بين هيكل التيتانيوم الصلب وزجاج السافير المقاوم للخدش. مزودة بمستشعرات حيوية دقيقة مدعومة بالذكاء الاصطناعي لمراقبة صحتك على مدار الساعة."
  },
  {
    id: 2,
    name: "سماعات ستوديو برو",
    price: 320,
    category: "صوتيات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "انغمس في عالمك الخاص مع تقنية إلغاء الضوضاء النشطة التكيفية. وسائد أذن مريحة من الجلد الطبيعي توفر راحة فائقة لساعات طويلة من الاستماع."
  },
  {
    id: 3,
    name: "حقيبة أكسفورد الجلدية",
    price: 180,
    category: "موضة",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    description: "رفيقك المثالي للسفر والعمل. مصنوعة يدوياً من الجلد الإيطالي الفاخر الذي يزداد جمالاً مع مرور الزمن. مساحات ذكية لتنظيم أجهزتك وأوراقك."
  },
  {
    id: 4,
    name: "نظارة بايلوت كلاسيك",
    price: 120,
    category: "إكسسوارات",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    description: "تصميم خالد لا يبطل مع الزمن. عدسات مستقطبة توفر حماية 100% من الأشعة فوق البنفسجية مع إطار معدني خفيف الوزن ومتين."
  },
  {
    id: 5,
    name: "عطر ليالي العود الملكي",
    price: 250,
    category: "عطور نيش",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "سيمفونية عطرية نادرة تجمع بين دهن العود الكمبودي المعتق وزعفران كشمير. عطر يترك انطباعاً لا ينسى وثبات يدوم لأكثر من 24 ساعة."
  }
];

const API_KEY = "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";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'مرحباً بك في "المستقبل" - وجهتك للفخامة.\nأنا مستشارك الشخصي. كيف يمكنني مساعدتك في اختيار ما يليق بك اليوم؟',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    // Close modal if open
    setSelectedProduct(null);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(0, item.qty + delta) };
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  // --- Logic: AI Communication ---
  const sendMessage = async (overrideInput = null) => {
    const userText = overrideInput || input;
    if (!userText.trim()) return;

    if (!overrideInput) {
      setInput('');
      setMessages(prev => [...prev, { role: 'user', content: userText, type: 'text' }]);
    }
    
    setIsLoading(true);

    try {
      const systemPrompt = `
        أنت مساعد مبيعات ذكي ومحترف لمتجر "المستقبل" الفاخر.
        شخصيتك: لبق، ذكي، تستخدم لغة عربية فصحى عصرية، ولا تكثر من الكلام دون فائدة.
        
        قائمة المنتجات:
        ${JSON.stringify(PRODUCTS)}

        حالة السلة الحالية للعميل:
        ${JSON.stringify(cart)}

        السيناريوهات المطلوبة (Output Formats):

        1. **عندما يطلب العميل رؤية منتجات**:
           لا تصف المنتجات نصياً. فقط أرسل JSON:
           <<<JSON
           { "action": "show_products", "productIds": [1, 2] }
           JSON>>>

        2. **عندما يقرر العميل الشراء (Checkout/الدفع/إتمام الطلب)**:
           لا تسرد المنتجات نصياً أبداً. بدلاً من ذلك، اعرض بطاقة مراجعة السلة باستخدام JSON:
           <<<JSON
           { "action": "review_cart" }
           JSON>>>
           *ملاحظة: بعد عرض السلة، اطلب الاسم الكريم بلطف للبدء في إجراءات الشحن.*

        3. **جمع البيانات (الاسم، الهاتف، العنوان)**:
           اطلب البيانات الناقصة واحدة تلو الأخرى.

        4. **التأكيد النهائي**:
           عند اكتمال البيانات، اعرض ملخص الطلب النهائي:
           <<<JSON
           { 
             "action": "show_final_summary", 
             "customer": { "name": "...", "phone": "...", "address": "..." } 
           }
           JSON>>>
        
        اجعل ردك النصي قصيراً ومشجعاً دائماً.
      `;

      const apiMessages = [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content || "" })).slice(-10) // Keep context limited to last 10
      ];

      // Add the user's latest message if it wasn't added by state update yet (in case of override)
      if (overrideInput) {
         apiMessages.push({ role: "user", content: overrideInput });
      } else {
         const lastMsg = apiMessages[apiMessages.length - 1];
         if (lastMsg.role !== 'user' || lastMsg.content !== userText) {
             apiMessages.push({ role: "user", content: userText });
         }
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://luxury-store.local", 
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: apiMessages,
          temperature: 0.7,
        })
      });

      const data = await response.json();
      let aiContent = data.choices?.[0]?.message?.content || "عذراً، حدث خطأ غير متوقع.";

      let type = 'text';
      let extraData = null;

      // Parse Custom JSON Commands
      const jsonMatch = aiContent.match(/<<<JSON([\s\S]*?)JSON>>>/);

      if (jsonMatch) {
        try {
          const jsonStr = jsonMatch[1];
          const parsedData = JSON.parse(jsonStr);
          // Remove the JSON block from text shown to user
          aiContent = aiContent.replace(jsonMatch[0], '').trim();

          if (parsedData.action === 'show_products') {
            type = 'product-grid';
            extraData = PRODUCTS.filter(p => parsedData.productIds.includes(p.id));
          } else if (parsedData.action === 'review_cart') {
            type = 'cart-review'; // New Type for Visual Cart in Chat
            extraData = cart; 
          } else if (parsedData.action === 'show_final_summary') {
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

  // --- Components ---

  // 1. Product Modal
  const ProductModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        />
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
          
          {/* Close Button */}
          <button 
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors z-20"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="h-64 sm:h-80 bg-gray-100 relative">
             <img 
               src={selectedProduct.image} 
               alt={selectedProduct.name} 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                {selectedProduct.category}
             </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto">
             <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-black text-gray-900">{selectedProduct.name}</h2>
                <span className="text-xl font-serif font-bold text-emerald-700 whitespace-nowrap">
                   {selectedProduct.price} ر.س
                </span>
             </div>
             
             <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">
                {selectedProduct.description}
             </p>

             <button 
               onClick={() => addToCart(selectedProduct)}
               className="mt-auto w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
             >
               <ShoppingBag size={20} />
               إضافة إلى السلة
             </button>
          </div>
        </div>
      </div>
    );
  };

  // 2. Chat Bubble Components
  const ProductCard = ({ product }) => (
    <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden w-64 flex-shrink-0 snap-center transform transition-all duration-300 hover:-translate-y-1 relative">
      <div 
        className="relative h-48 bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        <div className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
           <Eye size={16} className="text-gray-700" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">{product.description}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900">{product.price} ر.س</span>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="bg-black text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors shadow-md"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const CartReviewBubble = () => (
    <div className="bg-white p-5 rounded-3xl shadow-lg border border-gray-100 w-full max-w-sm mt-2">
       <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
         <ShoppingBag size={20} className="text-emerald-600" />
         <h3 className="font-bold text-gray-800">مراجعة السلة</h3>
       </div>
       
       {cart.length === 0 ? (
         <p className="text-gray-400 text-sm text-center py-4">السلة فارغة</p>
       ) : (
         <div className="space-y-3">
           {cart.map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
               <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
               <div className="flex-1 min-w-0">
                 <p className="font-bold text-xs text-gray-800 truncate">{item.name}</p>
                 <p className="text-xs text-gray-500">{item.price} ر.س</p>
               </div>
               <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="text-xs font-bold">{item.qty}</span>
               </div>
             </div>
           ))}
         </div>
       )}

       <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
         <span className="text-sm text-gray-500">الإجمالي</span>
         <span className="font-black text-lg text-gray-900">{calculateTotal()} ر.س</span>
       </div>
    </div>
  );

  const FinalOrderSummary = ({ customer }) => (
    <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-3xl shadow-lg border border-emerald-100 w-full max-w-sm mt-4 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-white p-2.5 rounded-xl text-emerald-600 shadow-sm">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">ملخص نهائي</h3>
          <p className="text-xs text-gray-500">جاهز للتأكيد</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6 relative z-10">
        <div className="bg-white/60 p-4 rounded-2xl space-y-2 text-sm border border-emerald-50/50">
           <div className="flex justify-between">
             <span className="text-gray-500">الاسم:</span>
             <span className="font-bold text-gray-800">{customer.name}</span>
           </div>
           <div className="flex justify-between">
             <span className="text-gray-500">الهاتف:</span>
             <span className="font-bold text-gray-800">{customer.phone}</span>
           </div>
           <div className="block pt-1">
             <span className="text-gray-500 block text-xs mb-1">العنوان:</span>
             <span className="font-bold text-gray-800 block leading-tight">{customer.address}</span>
           </div>
        </div>

        <div className="flex justify-between items-center bg-emerald-600 text-white p-3 rounded-xl shadow-md">
          <span className="font-medium text-sm">المبلغ المستحق</span>
          <span className="font-bold text-lg">{calculateTotal()} ر.س</span>
        </div>
      </div>

      <button 
        onClick={confirmOrder}
        className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 relative z-10 active:scale-95"
      >
        <span>تأكيد الطلب</span>
        <ArrowRightIcon />
      </button>
    </div>
  );

  // Helper Icon
  const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );

  // Main UI Render
  return (
    <div className="flex flex-col h-screen font-sans text-right text-gray-900 relative" dir="rtl">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('https://www.retis.be/wp-content/uploads/2022/09/ecommerce-definition.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 z-0 bg-white/90 backdrop-blur-[2px]" />

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full">
        <ProductModal />

        {/* Header */}
        <header className="absolute top-0 w-full bg-white/60 backdrop-blur-md border-b border-white/50 px-6 py-4 z-40 flex justify-between items-center transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <Sparkles size={18} className="text-yellow-400" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-gray-900">المستقبل</h1>
              <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Luxury Edition</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative group p-3 rounded-2xl hover:bg-white/50 transition-all duration-300"
          >
            <ShoppingBag className="text-gray-800 w-6 h-6" strokeWidth={1.5} />
            {cart.length > 0 && (
              <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow ring-2 ring-white animate-in zoom-in">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </header>

        {/* Main Chat Area */}
        <main className="flex-1 overflow-y-auto pt-24 pb-4 px-4 md:px-6 space-y-6 scroll-smooth">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} group animate-in slide-in-from-bottom-2 duration-500`}>
              
              {/* User Message */}
              {msg.role === 'user' && (
                <div className="bg-black text-white px-6 py-3.5 rounded-[2rem] rounded-tr-none shadow-xl shadow-gray-200/50 max-w-[85%] md:max-w-[70%] text-sm md:text-base leading-relaxed">
                  {msg.content}
                </div>
              )}

              {/* Assistant Message */}
              {msg.role === 'assistant' && (
                <div className="flex flex-col items-end w-full">
                  <div className="flex items-start gap-3 max-w-full flex-row-reverse">
                    <div className="w-9 h-9 rounded-full bg-white/80 border border-white shadow-sm flex-shrink-0 flex items-center justify-center mt-1 backdrop-blur-sm">
                      <Sparkles size={14} className="text-emerald-600" />
                    </div>
                    
                    <div className="space-y-4 flex flex-col items-end w-full max-w-[95%] md:max-w-[85%]">
                      
                      {/* Text Bubble */}
                      {msg.content && (
                        <div className="bg-white/80 border border-white/50 text-gray-700 px-6 py-4 rounded-[2rem] rounded-tl-none shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-line backdrop-blur-sm">
                          {msg.content}
                        </div>
                      )}
                      
                      {/* Visual Components based on AI Action */}
                      {msg.type === 'product-grid' && msg.data && (
                        <div className="w-full overflow-x-auto pb-4 pt-2 px-1 scrollbar-hide">
                          <div className="flex gap-4 w-max">
                              {msg.data.map(product => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                          </div>
                        </div>
                      )}

                      {msg.type === 'cart-review' && (
                        <CartReviewBubble />
                      )}

                      {msg.type === 'order-summary' && msg.data && (
                        <FinalOrderSummary customer={msg.data} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-end w-full px-14">
              <div className="flex gap-1 bg-white/80 px-4 py-3 rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-0"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        {/* Input Area */}
        <footer className="fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent pb-6 pt-10">
          <div className="max-w-3xl mx-auto relative flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white ring-1 ring-white/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="اكتب هنا.. (مثال: أرني الساعات الفاخرة)"
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 px-4 py-2 focus:outline-none text-base"
              disabled={isLoading}
            />
            <button 
              onClick={() => sendMessage()} 
              disabled={!input.trim() || isLoading}
              className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:scale-105 disabled:opacity-50 transition-all"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="ml-0.5" />}
            </button>
          </div>
        </footer>

        {/* Cart Drawer (Side Panel) */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity" 
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-xl h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 border-r border-white/20">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/50">
                <div>
                  <h2 className="font-bold text-xl text-gray-900">سلتك</h2>
                  <p className="text-xs text-gray-500 mt-1">{cart.length} منتجات مختارة</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X className="text-gray-400" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                    <ShoppingBag className="w-12 h-12 opacity-20 mb-4" />
                    <p>السلة فارغة</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3 bg-white/80 p-3 rounded-2xl border border-gray-100 shadow-sm backdrop-blur-sm">
                      <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <span className="text-sm font-bold">{item.price} ر.س</span>
                          <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1">
                            <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-black"><Minus size={14}/></button>
                            <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-black"><Plus size={14}/></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-white/50 border-t border-gray-100">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-gray-500 text-sm">الإجمالي</span>
                  <span className="font-black text-2xl text-gray-900">{calculateTotal()} <span className="text-sm font-normal text-gray-400">ر.س</span></span>
                </div>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    sendMessage("أريد إتمام الطلب");
                  }}
                  disabled={cart.length === 0}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-gray-800 transition-all flex justify-between px-6 items-center shadow-lg"
                >
                  <span>إتمام الشراء</span>
                  <CreditCard size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}