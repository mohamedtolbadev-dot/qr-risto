import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, ShoppingBag, X, User, MapPin, Phone, 
  CheckCircle, Loader2, Package, Sparkles, 
  ChevronLeft, Eye, Plus, Minus, CreditCard, Trash2,
  Star, TrendingUp, Menu, HelpCircle, MessageCircle, ArrowRight
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
    description: "تحفة هندسية تجمع بين هيكل التيتانيوم الصلب وزجاج السافير المقاوم للخدش. مزودة بمستشعرات حيوية دقيقة مدعومة بالذكاء الاصطناعي لمراقبة صحتك على مدار الساعة.",
    rating: 4.9,
    reviews: 234
  },
  {
    id: 2,
    name: "سماعات ستوديو برو",
    price: 320,
    category: "صوتيات",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "انغمس في عالمك الخاص مع تقنية إلغاء الضوضاء النشطة التكيفية. وسائد أذن مريحة من الجلد الطبيعي توفر راحة فائقة لساعات طويلة من الاستماع.",
    rating: 4.8,
    reviews: 189
  },
  {
    id: 3,
    name: "حقيبة أكسفورد الجلدية",
    price: 180,
    category: "موضة",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
    description: "رفيقك المثالي للسفر والعمل. مصنوعة يدوياً من الجلد الإيطالي الفاخر الذي يزداد جمالاً مع مرور الزمن. مساحات ذكية لتنظيم أجهزتك وأوراقك.",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "نظارة بايلوت كلاسيك",
    price: 120,
    category: "إكسسوارات",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    description: "تصميم خالد لا يبطل مع الزمن. عدسات مستقطبة توفر حماية 100% من الأشعة فوق البنفسجية مع إطار معدني خفيف الوزن ومتين.",
    rating: 4.6,
    reviews: 98
  },
  {
    id: 5,
    name: "عطر ليالي العود الملكي",
    price: 250,
    category: "عطور نيش",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "سيمفونية عطرية نادرة تجمع بين دهن العود الكمبودي المعتق وزعفران كشمير. عطر يترك انطباعاً لا ينسى وثبات يدوم لأكثر من 24 ساعة.",
    rating: 5.0,
    reviews: 312
  },
  {
    id: 6,
    name: "كاميرا لوميكس الرقمية",
    price: 850,
    category: "تصوير",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    description: "التقط تفاصيل الحياة بدقة 4K. مستشعر كامل الإطار يوفر أداءً مذهلاً في الإضاءة المنخفضة مع نظام تركيز بؤري تلقائي فائق السرعة.",
    rating: 4.9,
    reviews: 145
  },
  {
    id: 7,
    name: "ماكينة قهوة باريستا",
    price: 540,
    category: "أجهزة منزلية",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    description: "استمتع بمذاق القهوة المختصة في منزلك. ضغط 19 بار ومطحنة سيراميك مدمجة تضمن لك كوب إسبريسو مثالي بكل مرة.",
    rating: 4.8,
    reviews: 210
  },
  {
    id: 8,
    name: "حذاء ألترا ران الرياضي",
    price: 165,
    category: "رياضة",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "مصمم لتحطيم أرقامك القياسية. نعل أوسط بتقنية التبطين السحابي يوفر استجابة طاقة مذهلة وراحة تدوم للمسافات الطويلة.",
    rating: 4.7,
    reviews: 423
  },
  {
    id: 9,
    name: "مصباح ذكي لوموس",
    price: 85,
    category: "إضاءة",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=600&q=80",
    description: "تحكم في أجواء غرفتك عبر هاتفك. 16 مليون لون متاح مع إمكانية المزامنة مع الموسيقى والأفلام لتجربة غامرة.",
    rating: 4.5,
    reviews: 112
  },
  {
    id: 10,
    name: "كرسي مكتب إرجونوميك",
    price: 390,
    category: "أثاث",
    image: "https://images.unsplash.com/photo-1505798517354-bc0b7fd70123?auto=format&fit=crop&w=600&q=80",
    description: "وداعاً لآلام الظهر. تصميم هندسي يدعم العمود الفقري بالكامل مع مساند ذراع قابلة للتعديل وقماش شبكي يسمح بمرور الهواء.",
    rating: 4.8,
    reviews: 175
  }
];

const API_KEY = "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"; // اتركه فارغاً في Canvas

// اقتراحات سريعة لمساعدة العميل
const SUGGESTIONS = [
    { text: "أرني الساعات الفاخرة ⌚️", query: "أرني الساعات الفاخرة المتوفرة لديكم" },
    { text: "أبحث عن عطر مميز 🌸", query: "أقترح علي عطور نيش مميزة" },
    { text: "إكسسوارات رجالية 🕶️", query: "أرني النظارات والإكسسوارات" },
    { text: "كيف يمكنني الطلب؟ 📝", query: "اشرح لي كيف يمكنني إتمام الطلب" },
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'مرحباً بك في "المستقبل" - وجهتك للفخامة 💎\nأنا مستشارك الشخصي. كيف يمكنني مساعدتك في اختيار ما يليق بك اليوم؟',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false); // حالة نافذة المساعدة
  
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
    setSelectedProduct(null);
    
    // Show success message
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `تم إضافة "${product.name}" إلى سلتك بنجاح ✨`, 
      type: 'text' 
    }]);
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
    } else {
        // إذا كان اقتراحاً، نضيفه للمحادثة أيضاً
        setMessages(prev => [...prev, { role: 'user', content: userText, type: 'text' }]);
    }
    
    setIsLoading(true);

    try {
      const systemPrompt = `
أنت مساعد مبيعات ذكي ومحترف لمتجر "المستقبل" الفاخر.
شخصيتك: لبق، ذكي، تستخدم لغة عربية فصحى عصرية، ودود وداعم.

قائمة المنتجات المتوفرة:
${JSON.stringify(PRODUCTS, null, 2)}

حالة السلة الحالية للعميل:
${cart.length > 0 ? JSON.stringify(cart, null, 2) : 'السلة فارغة'}

بيانات العميل الحالية:
${JSON.stringify(customerData, null, 2)}

⚠️ قواعد مهمة جداً:
1. **لا تعرض أبداً كود JSON للمستخدم** - استخدمه فقط للتحكم في الواجهة
2. اجعل ردودك طبيعية ومحادثاتية وودودة
3. عند طلب عرض منتجات، أرسل JSON ثم أضف تعليق قصير ودود

السيناريوهات:

**1. عرض المنتجات:**
عندما يطلب العميل رؤية منتجات، استخدم هذا التنسيق بالضبط:
<<<JSON
{"action": "show_products", "productIds": [1, 2, 3]}
JSON>>>

ثم أضف تعليق قصير مثل: "اخترت لك مجموعة رائعة من أفضل منتجاتنا، تفضل بالاطلاع عليها! 😊"

**2. مراجعة السلة:**
عندما يريد إتمام الطلب:
<<<JSON
{"action": "review_cart"}
JSON>>>

ثم قل شيئاً مثل: "ممتاز! هذا ما اخترته. هل يمكنني الحصول على اسمك الكريم لإتمام الطلب؟"

**3. جمع البيانات:**
اطلب البيانات واحدة تلو الأخرى بشكل طبيعي ومهذب.

**4. الملخص النهائي:**
<<<JSON
{"action": "show_final_summary", "customer": {"name": "...", "phone": "...", "address": "..."}}
JSON>>>

ثم قل: "رائع! تحقق من تفاصيل طلبك أعلاه وأكد عندما تكون جاهزاً 🎉"

تذكر: JSON للتحكم فقط، النص للعميل يجب أن يكون طبيعياً تماماً.
`;

      const apiMessages = [
        { role: "user", content: systemPrompt }
      ];

      const recentMessages = messages.slice(-10);
      recentMessages.forEach(msg => {
        if (msg.type === 'text' && msg.content) {
          apiMessages.push({ 
            role: msg.role === 'user' ? 'user' : 'assistant', 
            content: msg.content 
          });
        }
      });

      apiMessages.push({ role: "user", content: userText });

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://luxury-store.local", 
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: apiMessages,
          temperature: 0.8,
          max_tokens: 500
        })
      });

      const data = await response.json();
      let aiContent = data.choices?.[0]?.message?.content || "عذراً، حدث خطأ غير متوقع. جرب مرة أخرى.";

      let type = 'text';
      let extraData = null;

      const jsonMatch = aiContent.match(/<<<JSON\s*([\s\S]*?)\s*JSON>>>/);

      if (jsonMatch) {
        try {
          const jsonStr = jsonMatch[1].trim();
          const parsedData = JSON.parse(jsonStr);
          
          aiContent = aiContent.replace(/<<<JSON\s*[\s\S]*?\s*JSON>>>/g, '').trim();

          if (parsedData.action === 'show_products') {
            type = 'product-grid';
            extraData = PRODUCTS.filter(p => parsedData.productIds.includes(p.id));
          } else if (parsedData.action === 'review_cart') {
            type = 'cart-review';
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
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'نعتذر، واجهنا انقطاعاً بسيطاً. هل يمكنك إعادة المحاولة؟ 🙏', 
        type: 'text' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmOrder = () => {
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: `🎊 تهانينا ${customerData.name}!\n\nتم تأكيد طلبك بنجاح بقيمة ${calculateTotal()} ريال سعودي.\nسنقوم بتجهيزه بعناية فائقة وإرساله إلى:\n📍 ${customerData.address}\n\nشكراً لثقتك في "المستقبل" 💎`, 
      type: 'text' 
    }]);
    setCart([]);
    setCustomerData({ name: '', phone: '', address: '', isComplete: false });
  };

  // --- Components ---

  // 0. Help Modal (دليل الاستخدام)
  const HelpModal = () => {
      if (!isHelpOpen) return null;
      return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsHelpOpen(false)} />
            <div className="bg-white rounded-3xl w-full max-w-md relative z-10 p-8 shadow-2xl animate-in zoom-in-95">
                <button onClick={() => setIsHelpOpen(false)} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                    <X size={20} />
                </button>
                
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-100 p-3 rounded-full">
                        <HelpCircle className="text-emerald-600" size={24} />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">كيف تتسوق بذكاء؟</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div>
                            <h3 className="font-bold text-gray-900">تحدث مع المساعد</h3>
                            <p className="text-gray-500 text-sm mt-1">اكتب ما تبحث عنه (مثلاً: "ساعات رجالية") وسيقترح المساعد أفضل الخيارات.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div>
                            <h3 className="font-bold text-gray-900">اختر وأضف للسلة</h3>
                            <p className="text-gray-500 text-sm mt-1">اضغط على المنتجات التي تعجبك لإضافتها لسلة التسوق.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div>
                            <h3 className="font-bold text-gray-900">أتمم الطلب بالمحادثة</h3>
                            <p className="text-gray-500 text-sm mt-1">عند الانتهاء، فقط أخبر المساعد "أريد إتمام الطلب" وسيقوم بجمع بياناتك وتأكيد الطلب.</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsHelpOpen(false)}
                    className="w-full mt-8 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition"
                >
                    فهمت، لنبدأ التسوق!
                </button>
            </div>
        </div>
      );
  };

  // 1. Product Modal
  const ProductModal = () => {
    if (!selectedProduct) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        />
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg relative z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
          
          <button 
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full hover:bg-white transition-all z-20 shadow-lg"
          >
            <X size={20} />
          </button>

          <div className="h-72 bg-gray-100 relative">
             <img 
               src={selectedProduct.image} 
               alt={selectedProduct.name} 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500" />
                {selectedProduct.category}
             </div>
             
             <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                {selectedProduct.rating} ({selectedProduct.reviews})
             </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col flex-1 overflow-y-auto">
             <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-black text-gray-900">{selectedProduct.name}</h2>
                <span className="text-2xl font-serif font-bold text-emerald-700 whitespace-nowrap">
                   {selectedProduct.price} ر.س
                </span>
             </div>
             
             <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                {selectedProduct.description}
             </p>

             <button 
               onClick={() => addToCart(selectedProduct)}
               className="mt-auto w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
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
    <div className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden w-64 flex-shrink-0 snap-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative">
      <div 
        className="relative h-48 bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => setSelectedProduct(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur p-1.5 rounded-full shadow-md">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
        </div>
        
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
           <Eye size={14} className="text-gray-700" />
        </div>
        
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/95 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-center">
            {product.rating} ★ ({product.reviews} تقييم)
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-1">{product.category}</p>
        
        <div className="flex items-center justify-between mt-3">
          <span className="font-black text-lg text-gray-900">{product.price} <span className="text-xs text-gray-500 font-normal">ر.س</span></span>
          <button 
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="bg-gradient-to-r from-black to-gray-800 text-white p-2.5 rounded-xl hover:shadow-lg transition-all active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const CartReviewBubble = () => (
    <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-3xl shadow-xl border border-gray-200 w-full max-w-sm mt-2">
       <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
         <ShoppingBag size={20} className="text-emerald-600" />
         <h3 className="font-bold text-gray-800">مراجعة السلة</h3>
         <span className="mr-auto bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">
           {cart.length} منتجات
         </span>
       </div>
       
       {cart.length === 0 ? (
         <p className="text-gray-400 text-sm text-center py-6">السلة فارغة</p>
       ) : (
         <div className="space-y-3 max-h-64 overflow-y-auto">
           {cart.map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
               <img src={item.image} className="w-14 h-14 rounded-xl object-cover" alt="" />
               <div className="flex-1 min-w-0">
                 <p className="font-bold text-xs text-gray-800 truncate">{item.name}</p>
                 <p className="text-xs text-gray-500">{item.price} ر.س × {item.qty}</p>
               </div>
               <div className="text-left">
                 <p className="text-sm font-black text-gray-900">{item.price * item.qty} ر.س</p>
               </div>
             </div>
           ))}
         </div>
       )}

       <div className="mt-4 pt-4 border-t border-dashed border-gray-300 flex justify-between items-center">
         <span className="text-sm text-gray-600 font-medium">الإجمالي الكلي</span>
         <span className="font-black text-2xl text-gray-900">{calculateTotal()} <span className="text-sm text-gray-500 font-normal">ر.س</span></span>
       </div>
    </div>
  );

  const FinalOrderSummary = ({ customer }) => (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 p-6 rounded-3xl shadow-xl border-2 border-emerald-200 w-full max-w-sm mt-4 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl"></div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-2xl text-white shadow-lg">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-lg">جاهز للتأكيد</h3>
          <p className="text-xs text-gray-500">تحقق من البيانات</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6 relative z-10">
        <div className="bg-white/80 backdrop-blur p-5 rounded-2xl space-y-3 text-sm border border-emerald-100 shadow-sm">
           <div className="flex justify-between items-center">
             <span className="text-gray-500 flex items-center gap-2">
               <User size={14} />
               الاسم:
             </span>
             <span className="font-bold text-gray-900">{customer.name}</span>
           </div>
           <div className="flex justify-between items-center">
             <span className="text-gray-500 flex items-center gap-2">
               <Phone size={14} />
               الهاتف:
             </span>
             <span className="font-bold text-gray-900" dir="ltr">{customer.phone}</span>
           </div>
           <div className="pt-2 border-t border-gray-100">
             <span className="text-gray-500 block text-xs mb-2 flex items-center gap-2">
               <MapPin size={14} />
               العنوان:
             </span>
             <span className="font-bold text-gray-900 block leading-relaxed">{customer.address}</span>
           </div>
        </div>

        <div className="flex justify-between items-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-2xl shadow-lg">
          <span className="font-medium">المبلغ المستحق</span>
          <span className="font-black text-2xl">{calculateTotal()} ر.س</span>
        </div>
      </div>

      <button 
        onClick={confirmOrder}
        className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 rounded-2xl font-bold hover:shadow-2xl transition-all active:scale-95 relative z-10 flex items-center justify-center gap-2 text-lg"
      >
        <span>تأكيد الطلب</span>
        <Package size={20} />
      </button>
    </div>
  );

  // Main UI Render
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-right text-gray-900 overflow-hidden" dir="rtl">
      <ProductModal />
      <HelpModal />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 md:px-6 py-4 z-40 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-black to-gray-700 text-white rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform">
            <Sparkles size={20} className="text-yellow-400" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-gray-900">المستقبل</h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">Luxury Edition</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            {/* Help Button - جديد */}
            <button 
                onClick={() => setIsHelpOpen(true)}
                className="p-2.5 rounded-2xl hover:bg-gray-100 transition-all text-gray-600 flex items-center gap-2"
                title="كيف أتسوق؟"
            >
                <HelpCircle size={20} />
                <span className="hidden sm:inline text-sm font-bold">دليل الاستخدام</span>
            </button>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden relative group p-3 rounded-2xl hover:bg-gray-100 transition-all duration-300"
            >
              <ShoppingBag className="text-gray-800 w-6 h-6" strokeWidth={1.5} />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] min-w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold shadow-lg ring-2 ring-white animate-in zoom-in">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
        </div>
      </header>

      {/* Main Chat Area - Takes most space */}
      <main className="flex-1 flex flex-col pt-20 pb-0 lg:ml-96 overflow-hidden">
        {/* Messages Container with proper spacing */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-6 scroll-smooth mb-36 sm:mb-28">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} group animate-in slide-in-from-bottom-2 duration-500`}>
              
              {msg.role === 'user' && (
                <div className="bg-gradient-to-r from-black to-gray-800 text-white px-6 py-4 rounded-[2rem] rounded-tr-none shadow-xl max-w-[85%] md:max-w-[70%] text-sm md:text-base leading-relaxed">
                  {msg.content}
                </div>
              )}

              {msg.role === 'assistant' && (
                <div className="flex flex-col items-end w-full">
                  <div className="flex items-start gap-3 max-w-full flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-white border-2 border-emerald-200 shadow-md flex-shrink-0 flex items-center justify-center mt-1">
                      <Sparkles size={16} className="text-emerald-600" />
                    </div>
                    
                    <div className="space-y-4 flex flex-col items-end w-full max-w-[95%] md:max-w-[85%]">
                      
                      {msg.content && (
                        <div className="bg-white border border-gray-200 text-gray-800 px-6 py-4 rounded-[2rem] rounded-tl-none shadow-md text-sm md:text-base leading-relaxed whitespace-pre-line">
                          {msg.content}
                        </div>
                      )}
                      
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
               <div className="flex gap-1.5 bg-white px-5 py-3 rounded-2xl shadow-md border border-gray-100">
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                 <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area with Suggestions - Fixed at bottom */}
        <footer className="fixed bottom-0 left-0 right-0 lg:left-96 z-30 bg-gradient-to-t from-white via-white to-transparent pb-safe">
          <div className="max-w-4xl mx-auto px-4 pb-4">
            
            {/* Suggestions Bar - جديد */}
            {!isLoading && (
                <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-3 pb-1">
                    {SUGGESTIONS.map((suggestion, idx) => (
                        <button 
                            key={idx}
                            onClick={() => sendMessage(suggestion.query)}
                            className="flex-shrink-0 bg-white/90 backdrop-blur border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm transition-all active:scale-95 whitespace-nowrap"
                        >
                            {suggestion.text}
                        </button>
                    ))}
                </div>
            )}

            <div className="relative flex items-center gap-3 bg-white p-2 rounded-full shadow-[0_10px_40px_rgb(0,0,0,0.1)] border-2 border-gray-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="اكتب رسالتك... (مثال: أرني الساعات الفاخرة)"
                className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 px-5 py-3 focus:outline-none text-base"
                disabled={isLoading}
              />
              <button 
                onClick={() => sendMessage()} 
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-black to-gray-800 text-white w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg flex-shrink-0"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* Right Sidebar Cart - Fixed on Desktop, Drawer on Mobile */}
      <aside 
        className={`
          fixed top-0 bottom-0 left-0 w-96 bg-white border-r border-gray-100 shadow-2xl z-50
          flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 pt-24 border-b border-gray-100 flex justify-between items-center bg-gradient-to-b from-white to-gray-50">
          <div>
            <h2 className="font-black text-xl text-gray-900">سلة التسوق</h2>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <TrendingUp size={12} />
              {cart.length} منتجات مختارة
            </p>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)} 
            className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X className="text-gray-400" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
              <ShoppingBag className="w-16 h-16 opacity-20 mb-4" />
              <p className="font-medium">السلة فارغة</p>
              <p className="text-xs mt-1">ابدأ بإضافة منتجات رائعة!</p>
              
              <button 
                onClick={() => {
                    setIsMobileSidebarOpen(false);
                    sendMessage("أرني المنتجات الأكثر مبيعاً");
                }}
                className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"
              >
                تصفح المنتجات الآن
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-sm font-bold">{item.price} ر.س</span>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
                      <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Minus size={14}/>
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-emerald-600 transition-colors">
                        <Plus size={14}/>
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="self-start p-1.5 hover:bg-red-50 rounded-lg transition-colors group"
                >
                  <Trash2 size={16} className="text-gray-300 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer - Checkout */}
        <div className="p-6 bg-white border-t border-gray-100 shadow-2xl">
          <div className="flex justify-between items-end mb-5">
            <span className="text-gray-600 text-sm font-medium">الإجمالي الكلي</span>
            <span className="font-black text-3xl text-gray-900">
              {calculateTotal()} 
              <span className="text-sm font-normal text-gray-400 mr-1">ر.س</span>
            </span>
          </div>
          <button 
            onClick={() => {
              setIsMobileSidebarOpen(false);
              sendMessage("أريد إتمام الطلب والدفع");
            }}
            disabled={cart.length === 0}
            className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-2xl font-bold disabled:opacity-50 hover:shadow-2xl transition-all flex justify-between px-6 items-center active:scale-95"
          >
            <span>إتمام الشراء</span>
            <CreditCard size={20} />
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
}