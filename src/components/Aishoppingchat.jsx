// App.js - متجر إلكتروني ذكي متطور
import React, { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  // === State Management ===
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [activeStep, setActiveStep] = useState('browsing');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // === بيانات المنتجات ===
  const products = [
    {
      id: 1,
      name: "ساعة ذكية لوكس",
      description: "ساعة ذكية بميزات متقدمة، مقاومة للماء، شاشة AMOLED، تتبع النوم واللياقة",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.5,
      tags: ["جديد", "الأكثر مبيعاً", "متوفر"]
    },
    {
      id: 2,
      name: "سماعات رأس لاسلكية",
      description: "سماعات رأس لاسلكية مع إلغاء الضوضاء النشط، بطارية تدوم 30 ساعة",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.3,
      tags: ["الأكثر مبيعاً", "عرض خاص"]
    },
    {
      id: 3,
      name: "هاتف ذكي فائق",
      description: "هاتف ذكي بمعالج سريع، كاميرا متطورة 108 ميجابكسل، وبطارية 5000 مللي أمبير",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.7,
      tags: ["جديد", "أفضل تقييم"]
    },
    {
      id: 4,
      name: "حقيبة لابتوب جلدية",
      description: "حقيبة أنيقة ومتينة للابتوب بجودة عالية، مزودة بحقيبة إضافية للشحن",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      category: "إكسسوارات",
      rating: 4.2,
      tags: ["عرض خاص", "متوفر"]
    },
    {
      id: 5,
      name: "كتاب الذكاء الاصطناعي",
      description: "كتاب شامل عن تقنيات الذكاء الاصطناعي وتطبيقاتها العملية في الأعمال",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      category: "كتب",
      rating: 4.6,
      tags: ["محدود", "الأكثر مبيعاً"]
    },
    {
      id: 6,
      name: "كاميرا احترافية",
      description: "كاميرا DSLR مع عدسات متعددة وحامل ثلاثي القوائم، دقة 24 ميجابكسل",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.8,
      tags: ["جديد", "الأكثر مبيعاً"]
    },
    {
      id: 7,
      name: "لوحة مفاتيح ميكانيكية",
      description: "لوحة مفاتيح ميكانيكية مع إضاءة RGB قابلة للتخصيص، مفاتيح سريعة الاستجابة",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.4,
      tags: ["متوفر", "الأكثر مبيعاً"]
    },
    {
      id: 8,
      name: "سماعات أذن رياضية",
      description: "سماعات أذن رياضية مقاومة للعرق والماء، مثالية للرياضة اليومية",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e8?w=400&h=400&fit=crop",
      category: "إلكترونيات",
      rating: 4.1,
      tags: ["عرض خاص", "جديد"]
    }
  ];

  // === التأثيرات ===
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      text: `مرحباً بك في متجرنا الذكي! 👋 أنا مساعدك الشخصي.

✨ **كيف يمكنني مساعدتك اليوم؟**
• أبحث عن منتج معين
• أعرض لك منتجاتنا المميزة
• أساعدك في إتمام عملية الشراء
• أقدم لك النصائح والتوصيات

ما الذي تبحث عنه؟`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // === الذكاء الاصطناعي المحسن ===
  const processUserMessage = useCallback((message) => {
    const aiResponse = {
      id: messages.length + 2,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // إجابة ذكية مع فهم السياق
    if (/(مرحبا|اهلا|السلام|السلام عليكم)/i.test(message)) {
      aiResponse.text = `أهلاً وسهلاً! 😊 يسرني خدمتك اليوم.

لدي ${products.length} منتج متنوع في المتجر. هل تريد:
1. استعراض جميع المنتجات
2. البحث عن شيء محدد
3. رؤية العروض الخاصة
4. الحصول على توصيات؟

أخبرني كيف يمكنني مساعدتك بشكل أفضل!`;
    }
    else if (/(عرض|شوف|ارني|ابغا اشوف|ابي اشوف)/i.test(message)) {
      if (/(منتجات|اشياء|سلع|بضاعة)/i.test(message)) {
        aiResponse.text = `🎯 **منتجاتنا المميزة**

لقد قمت بتصفية أفضل المنتجات من أجلك. كل منتج معروض يتضمن:
• التقييم ⭐
• السعر 💰
• التوصيف الكامل
• إمكانية الإضافة المباشرة للسلة

يمكنك تغيير طريقة العرض باستخدام الأزرار العلوية.`;
        aiResponse.showProducts = true;
        aiResponse.filteredProducts = getRecommendedProducts();
      } else {
        aiResponse.text = "أي نوع من المنتجات تريد رؤيته؟ يمكنني عرض:\n• الإلكترونيات 📱\n• الكتب 📚\n• الإكسسوارات 👜\n• العروض الخاصة 🎁\n\nأو يمكنني عرض كل شيء!";
      }
    }
    else if (/(سلة|عربة|المشتريات|الطلبات)/i.test(message)) {
      if (cart.length === 0) {
        aiResponse.text = `🛒 **سلة التسوق فارغة**

حالياً لا يوجد أي منتجات في سلة التسوق. جرب أن تقول:
• "اعرض المنتجات"
• "ابحث عن هاتف"
• "عروض اليوم"

ما رأيك أن نبدأ برحلة تسوق ممتعة؟ 😊`;
      } else {
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const total = calculateTotal();
        aiResponse.text = `🛍️ **سلة التسوق الخاصة بك**

لديك ${itemCount} عنصر${itemCount > 1 ? 'ات' : ''} في السلة بقيمة ${total.toFixed(2)} ريال.

**الخطوات التالية:**
1. مراجعة المنتجات ✅
2. إضافة المزيد أو التعديل
3. إتمام عملية الشراء

هل تريد المتابعة للشراء أم إضافة منتجات أخرى؟`;
        aiResponse.showCart = true;
        setActiveStep('cart');
      }
    }
    else if (/(بحث|ابحث|دور|عندكم)/i.test(message)) {
      const searchTerm = extractSearchTerm(message);
      const searchResults = searchProducts(searchTerm);
      
      if (searchResults.length > 0) {
        aiResponse.text = `🔍 **نتائج البحث عن "${searchTerm}"**

عثرت على ${searchResults.length} منتج${searchResults.length > 1 ? 'ات' : ''} تطابق بحثك. جرب استخدام الفلاتر لتحسين النتائج.

**نصائح للبحث:**
• استخدم كلمات محددة
• جرب البحث بالتصنيف
• استخدم مصطلحات عامة للمزيد من النتائج`;
        aiResponse.showProducts = true;
        aiResponse.filteredProducts = searchResults;
      } else {
        aiResponse.text = `🔍 **لم أعثر على نتائج لـ "${searchTerm}"**

**اقتراحات:**
1. جرب مصطلحات بحث مختلفة
2. استخدم كلمات أكثر عمومية
3. تصفح جميع المنتجات
4. اطلب مني التوصية بمنتجات مشابهة

مثلاً: "ما هو أفضل هاتف ذكي لديكم؟"`;
      }
    }
    else if (/(شراء|اشتري|طلب|إتمام|اختار)/i.test(message)) {
      if (cart.length === 0) {
        aiResponse.text = `🛒 **ابدأ بالتسوق أولاً**

قبل إتمام الشراء، تحتاج إلى إضافة منتجات للسلة. إليك بعض الأفكار:

**منتجات شائعة:**
• ${products[0].name} - ${products[0].price} ريال
• ${products[1].name} - ${products[1].price} ريال
• ${products[4].name} - ${products[4].price} ريال

ما رأيك نبدأ بعرض هذه المنتجات؟`;
      } else {
        aiResponse.text = `✅ **ممتاز! جاهز لإتمام الطلب**

لديك ${cart.length} منتج${cart.length > 1 ? 'ات' : ''} في السلة. الآن أحتاج بعض المعلومات البسيطة:

**المعلومات المطلوبة:**
1. الاسم الكامل
2. رقم الهاتف
3. العنوان للتوصيل

سأفتح نموذج البيانات لك. يمكنك أيضاً تعديل السلة إذا أردت.`;
        setShowCustomerForm(true);
        setActiveStep('customer');
      }
    }
    else if (/(سعر|تكلفة|ثمن|كم يكلف)/i.test(message)) {
      if (cart.length > 0) {
        const total = calculateTotal();
        aiResponse.text = `💰 **تفاصيل السعر**

المجموع الفرعي: ${total.toFixed(2)} ريال
الضريبة (15%): ${(total * 0.15).toFixed(2)} ريال
**المجموع الكلي:** ${(total * 1.15).toFixed(2)} ريال

**خيارات الدفع المتاحة:**
• الدفع عند الاستلام
• التحويل البنكي
• البطاقات الائتمانية (قريباً)

هل تريد المتابعة للشراء أم إضافة المزيد؟`;
      } else {
        aiResponse.text = "💸 **أسعار منتجاتنا متنوعة**\n\nالأسعار تبدأ من 34.99 ريال وتصل إلى 1299.99 ريال.\n\nلرؤية الأسعار التفصيلية، قل لي: \"اعرض المنتجات\" وسأظهر لك كل منتج مع سعره.";
      }
    }
    else if (/(مساعدة|مساعده|ساعدني|محتاج مساعده)/i.test(message)) {
      aiResponse.text = `🤝 **كيف يمكنني مساعدتك؟**

**أوامر سريعة يمكنك استخدامها:**
• "اعرض المنتجات" - رؤية جميع المنتجات
• "ابحث عن هاتف" - البحث المخصص
• "سلة التسوق" - عرض المحتويات
• "إتمام الشراء" - بدء عملية الطلب
• "التوصيات" - منتجات تناسبك
• "عروض اليوم" - العروض الخاصة

**ميزات إضافية:**
• تحديث الكميات في السلة
• إزالة المنتجات
• عرض التفاصيل الكاملة
• تغيير طريقة العرض (قائمة/شبكة)

ما الذي تحتاجه بالضبط؟`;
    }
    else if (/(توصيات|تنصح|افضل|مميز)/i.test(message)) {
      aiResponse.text = `🌟 **توصياتي لك**

بناءً على شعبية المنتجات وتقييمات العملاء، هذه أفضل الخيارات:

1. **${products[2].name}** ⭐ ${products[2].rating}/5
   السعر: ${products[2].price} ريال
   ${products[2].description}

2. **${products[0].name}** ⭐ ${products[0].rating}/5
   السعر: ${products[0].price} ريال
   ${products[0].description}

3. **${products[4].name}** ⭐ ${products[4].rating}/5
   السعر: ${products[4].price} ريال
   ${products[4].description}

هل تريد إضافة أي منها للسلة؟`;
      aiResponse.showProducts = true;
      aiResponse.filteredProducts = getRecommendedProducts();
    }
    else if (/(عروض|خصم|تنزيلات|عرض خاص)/i.test(message)) {
      const specialOffers = products.filter(p => p.tags.includes("عرض خاص"));
      if (specialOffers.length > 0) {
        aiResponse.text = `🎁 **العروض الخاصة**

لدي ${specialOffers.length} عرض خاص لك اليوم:

${specialOffers.map((p, i) => `${i+1}. **${p.name}** - ${p.price} ريال (${p.description.substring(0, 50)}...)`).join('\n')}

هذه العروض محدودة، هل تريد إضافة أي منها للسلة؟`;
        aiResponse.showProducts = true;
        aiResponse.filteredProducts = specialOffers;
      } else {
        aiResponse.text = "حالياً لا توجد عروض خاصة، لكن لدينا العديد من المنتجات المميزة. هل تريد رؤية أفضل المنتجات؟";
      }
    }
    else {
      // ردود ذكية متقدمة
      const smartResponses = [
        "أفهم أنك تبحث عن شيء محدد. هل يمكنك وصفه بشكل أكثر تفصيلاً؟ مثلاً: \"أبحث عن هاتف ذكي بسعر مناسب\" أو \"أريد سماعات لاسلكية للرياضة\"",
        `بناءً على حديثنا، أعتقد أن هذه المنتجات قد تناسبك: ${getRandomProductCategory()}. هل تريد أن أعرضها لك؟`,
        "سأكون سعيداً بمساعدتك في العثور على ما تبحث عنه. يمكنك:\n• وصف المنتج الذي تريده\n• تحديد ميزانيتك\n• ذكر الاستخدام المطلوب\nوهساعدك في العثور على الأنسب!",
        "أنا هنا لجعل تجربة التسوق سهلة وممتعة. جرب أن تسألني:\n\"ما هي أفضل كاميرا لديكم؟\"\n\"أحتاج هدية بميزانية 200 ريال\"\n\"عندكم أجهزة رياضية؟\""
      ];
      aiResponse.text = smartResponses[Math.floor(Math.random() * smartResponses.length)];
    }

    setMessages(prev => [...prev, aiResponse]);
  }, [messages.length, cart, products]);

  // === دعم بحث متقدم ===
  const extractSearchTerm = (message) => {
    const patterns = [
      /بحث عن (.+)/i,
      /ابحث عن (.+)/i,
      /عندكم (.+)/i,
      /ابغا (.+)/i,
      /أريد (.+)/i,
      /دور لي على (.+)/i
    ];
    
    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) return match[1].trim();
    }
    
    // استخراج الكلمات المفتاحية
    const keywords = ["هاتف", "سماعات", "كتاب", "كاميرا", "حقيبة", "ساعة", "إلكترونيات", "إكسسوارات"];
    for (const keyword of keywords) {
      if (message.includes(keyword)) return keyword;
    }
    
    return message;
  };

  const searchProducts = (term) => {
    if (!term || term.trim() === '') return products;
    
    const searchLower = term.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  };

  const getRecommendedProducts = () => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  };

  const getRandomProductCategory = () => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // === إدارة الرسائل ===
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      processUserMessage(inputText.toLowerCase());
      setIsLoading(false);
    }, 600);
  };

  // === إدارة السلة ===
  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    const confirmationMessage = {
      id: messages.length + 1,
      text: `✅ **تمت الإضافة بنجاح!**

**${product.name}**
تم إضافته إلى سلة التسوق.

**الخطوات التالية:**
• استمر في التسوق
• اذهب إلى السلة
• أبدأ عملية الشراء

سأكون هنا لمساعدتك في أي خطوة!`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // === بيانات العميل ===
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      const errorMessage = {
        id: messages.length + 1,
        text: "⚠️ **يرجى ملء الحقول المطلوبة**\n\nالاسم، الهاتف، والعنوان ضرورية لإتمام الطلب.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    setShowCustomerForm(false);
    setActiveStep('confirmation');
    
    const orderSummaryMessage = {
      id: messages.length + 1,
      text: `📋 **ملخص طلبك جاهز**\n\nراجع تفاصيل طلبك قبل التأكيد. يمكنك تعديل أي شيء إذا احتجت.`,
      sender: 'ai',
      showOrderSummary: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, orderSummaryMessage]);
  };

  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    setCart([]);
    
    const confirmationMessage = {
      id: messages.length + 1,
      text: `🎉 **تم تأكيد طلبك بنجاح!**

**رقم الطلب:** #${Math.floor(10000 + Math.random() * 90000)}
**طريقة الدفع:** الدفع عند الاستلام
**وقت التوصيل:** 2-3 أيام عمل

سيتم التواصل معك على ${customerInfo.phone} لتأكيد التفاصيل.

شكراً لثقتك بنا! نتمنى لك يومًا سعيداً 😊`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMessage]);
    setActiveStep('complete');
  };

  // === مكونات UI ===
  const ProductCard = ({ product, compact = false }) => (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${compact ? '' : 'hover:-translate-y-1'}`}>
      <div className={`relative ${compact ? 'p-3' : 'p-4'}`}>
        <div className="flex gap-4">
          <div className={`${compact ? 'w-20 h-20' : 'w-24 h-24'} flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden`}>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-bold text-gray-900 ${compact ? 'text-sm' : 'text-base'}`}>
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} ${compact ? 'text-xs' : 'text-sm'}`}>
                        ★
                      </span>
                    ))}
                    <span className={`text-gray-600 mr-1 ${compact ? 'text-xs' : 'text-sm'}`}>
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="text-left">
                <span className={`font-bold text-gray-900 ${compact ? 'text-base' : 'text-lg'}`}>
                  {product.price.toFixed(2)} ريال
                </span>
              </div>
            </div>
            
            <p className={`text-gray-600 mt-2 ${compact ? 'text-xs line-clamp-2' : 'text-sm line-clamp-2'}`}>
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {product.tags.slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx} 
                  className={`px-2 py-1 rounded-full ${compact ? 'text-xs' : 'text-xs'} 
                    ${tag === 'جديد' ? 'bg-blue-50 text-blue-600' : 
                      tag === 'الأكثر مبيعاً' ? 'bg-green-50 text-green-600' : 
                      tag === 'عرض خاص' ? 'bg-red-50 text-red-600' : 
                      'bg-gray-100 text-gray-600'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <button 
                onClick={() => addToCart(product)}
                className={`${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'} bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors`}
              >
                + أضف للسلة
              </button>
              
              <button 
                onClick={() => {
                  setInputText(`أخبرني عن ${product.name}`);
                  setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                }}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                المزيد من التفاصيل
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CartItem = ({ item }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center flex-1 min-w-0">
        <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="mr-3 flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
          <p className="text-gray-600 text-xs mt-1">{item.price.toFixed(2)} ريال للواحد</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="flex items-center bg-gray-100 rounded-lg">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-r-lg transition-colors"
          >
            <span className="text-gray-600">−</span>
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-l-lg transition-colors"
          >
            <span className="text-gray-600">+</span>
          </button>
        </div>
        
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 p-1"
          title="حذف"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );

  // === التصميم الرئيسي ===
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">المتجر الذكي</h1>
                <p className="text-gray-600 text-sm">تجربة تسوق ذكية مع مساعد شخصي</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-64 px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-right"
                  dir="rtl"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setInputText(`ابحث عن ${searchQuery}`);
                      handleSendMessage(e);
                      setSearchQuery('');
                    }
                  }}
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveStep('cart')}
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-gray-900"
                >
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline">السلة</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chat Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-180px)] flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-900">المساعد الذكي</h2>
                      <p className="text-gray-600 text-sm">متصل • يجيب فوراً</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-left' : 'text-right'}`}>
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none shadow-sm'}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {msg.sender === 'user' ? '👤' : '🤖'}
                          </div>
                          <span className={`text-sm ${msg.sender === 'user' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {msg.sender === 'user' ? 'أنت' : 'المساعد الذكي'}
                          </span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        
                        <div className="whitespace-pre-line text-sm leading-relaxed">
                          {msg.text.split('**').map((part, i) => 
                            i % 2 === 1 ? (
                              <strong key={i} className="font-bold">{part}</strong>
                            ) : (
                              part
                            )
                          )}
                        </div>

                        {/* عرض المنتجات */}
                        {msg.showProducts && (
                          <div className="mt-4">
                            <div className="grid gap-3">
                              {(msg.filteredProducts || getRecommendedProducts()).map(product => (
                                <ProductCard 
                                  key={product.id} 
                                  product={product}
                                  compact={viewMode === 'list'}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* عرض السلة */}
                        {msg.showCart && cart.length > 0 && (
                          <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-3">سلة التسوق</h4>
                            <div className="space-y-3">
                              {cart.map(item => <CartItem key={item.id} item={item} />)}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-300">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-sm text-gray-600">المجموع الفرعي</div>
                                  <div className="text-2xl font-bold text-gray-900">
                                    {calculateTotal().toFixed(2)} ريال
                                  </div>
                                </div>
                                <button 
                                  onClick={() => {
                                    setShowCustomerForm(true);
                                    setActiveStep('customer');
                                  }}
                                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold transition-colors"
                                >
                                  إتمام الشراء →
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* عرض ملخص الطلب */}
                        {msg.showOrderSummary && (
                          <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4">
                            <h4 className="font-bold text-gray-900 mb-3">📋 ملخص الطلب النهائي</h4>
                            
                            <div className="mb-4">
                              <h5 className="font-semibold text-gray-700 mb-2">المنتجات المطلوبة:</h5>
                              <div className="space-y-2">
                                {cart.map(item => (
                                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                    <div>
                                      <div className="font-medium">{item.name}</div>
                                      <div className="text-sm text-gray-600">
                                        {item.quantity} × {item.price.toFixed(2)} ريال
                                      </div>
                                    </div>
                                    <div className="font-bold">
                                      {(item.price * item.quantity).toFixed(2)} ريال
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <h5 className="font-semibold text-gray-700 mb-2">بيانات التوصيل:</h5>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <div className="text-sm text-gray-600">الاسم</div>
                                    <div className="font-medium">{customerInfo.name}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-600">الهاتف</div>
                                    <div className="font-medium">{customerInfo.phone}</div>
                                  </div>
                                  <div className="md:col-span-2">
                                    <div className="text-sm text-gray-600">العنوان</div>
                                    <div className="font-medium">{customerInfo.address}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border-t border-gray-300 pt-4">
                              <div className="flex justify-between items-center mb-4">
                                <div>
                                  <div className="text-sm text-gray-600">المجموع الكلي</div>
                                  <div className="text-3xl font-bold text-gray-900">
                                    {calculateTotal().toFixed(2)} ريال
                                  </div>
                                </div>
                              </div>
                              
                              {!orderConfirmed ? (
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <button 
                                    onClick={handleConfirmOrder}
                                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
                                  >
                                    ✅ تأكيد الطلب والدفع
                                  </button>
                                  <button 
                                    onClick={() => setShowCustomerForm(true)}
                                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    تعديل البيانات
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center py-4 bg-green-50 rounded-lg border border-green-200">
                                  <div className="text-green-600 font-semibold mb-2">✅ تم تأكيد طلبك بنجاح!</div>
                                  <div className="text-sm text-green-700">
                                    سنتواصل معك خلال 24 ساعة لتأكيد التفاصيل
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-right">
                    <div className="inline-block bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                          🤖
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="اكتب رسالتك... اسأل عن منتج، اطلب المساعدة، أو أتمم الشراء"
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-right"
                    dir="rtl"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="px-6 py-3 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
                  >
                    <span>إرسال</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { text: "اعرض المنتجات", emoji: "🛍️" },
                    { text: "ابحث عن هاتف", emoji: "🔍" },
                    { text: "التوصيات", emoji: "🌟" },
                    { text: "عروض اليوم", emoji: "🎁" },
                    { text: "سلة التسوق", emoji: "🛒" },
                    { text: "إتمام الشراء", emoji: "💰" },
                  ].map((btn, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setInputText(btn.text);
                        setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
                      }}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors flex items-center gap-1"
                    >
                      <span>{btn.emoji}</span>
                      <span>{btn.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {showCustomerForm ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">معلومات التوصيل</h3>
                  <button 
                    onClick={() => setShowCustomerForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleCustomerSubmit}>
                  <div className="space-y-4">
                    {[
                      { name: 'name', label: 'الاسم الكامل', type: 'text', required: true },
                      { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
                      { name: 'address', label: 'عنوان التوصيل', type: 'textarea', required: true },
                      { name: 'email', label: 'البريد الإلكتروني (اختياري)', type: 'email', required: false },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-gray-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 mr-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={customerInfo[field.name]}
                            onChange={handleCustomerInfoChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            rows="3"
                            placeholder="الحي، الشارع، رقم المبني"
                            dir="rtl"
                            required={field.required}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={customerInfo[field.name]}
                            onChange={handleCustomerInfoChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                            placeholder={`أدخل ${field.label.toLowerCase()}`}
                            dir="rtl"
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    حفظ والمتابعة للدفع
                  </button>
                </form>
              </div>
            ) : (
              <>
                {/* Cart Summary */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🛒 سلة التسوق</h3>
                  
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-5xl mb-4">🛍️</div>
                      <p className="text-gray-500">السلة فارغة حالياً</p>
                      <p className="text-gray-400 text-sm mt-2">اكتب "اعرض المنتجات" لبدء التسوق</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-64 overflow-y-auto mb-4 space-y-3">
                        {cart.map(item => <CartItem key={item.id} item={item} />)}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">المنتجات</span>
                            <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">المجموع الفرعي</span>
                            <span className="font-semibold">{calculateTotal().toFixed(2)} ريال</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">الضريبة (15%)</span>
                            <span className="font-semibold">{(calculateTotal() * 0.15).toFixed(2)} ريال</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
                          <span>المجموع الكلي</span>
                          <span className="text-gray-900">{(calculateTotal() * 1.15).toFixed(2)} ريال</span>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setShowCustomerForm(true);
                            setActiveStep('customer');
                          }}
                          className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors"
                        >
                          إتمام عملية الشراء
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📊 إحصائيات المتجر</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{products.length}</div>
                      <div className="text-sm text-gray-600">منتج متوفر</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{cart.length}</div>
                      <div className="text-sm text-gray-600">منتج في السلة</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">
                        {products.reduce((sum, p) => sum + p.rating, 0) / products.length}
                      </div>
                      <div className="text-sm text-gray-600">متوسط التقييم</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{orderConfirmed ? 1 : 0}</div>
                      <div className="text-sm text-gray-600">طلبات مؤكدة</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600">
            <p className="font-medium">© 2024 المتجر الذكي. جميع الحقوق محفوظة.</p>
            <p className="text-sm mt-2">تجربة تسوق ذكية مع مساعد AI متطور • متوافق مع جميع الأجهزة</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;