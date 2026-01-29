// App.js - متجر إلكتروني تفاعلي كامل مع ChatGPT ذكي
import React, { useState, useEffect, useRef } from 'react';

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
  const [activeStep, setActiveStep] = useState('browsing'); // browsing -> cart -> customer -> confirmation
  const messagesEndRef = useRef(null);

  // === بيانات المنتجات الافتراضية ===
  const products = [
    {
      id: 1,
      name: "ساعة ذكية لوكس",
      description: "ساعة ذكية بميزات متقدمة، مقاومة للماء، شاشة AMOLED",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      category: "إلكترونيات"
    },
    {
      id: 2,
      name: "سماعات رأس لاسلكية",
      description: "سماعات رأس لاسلكية مع إلغاء الضوضاء النشط",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      category: "إلكترونيات"
    },
    {
      id: 3,
      name: "هاتف ذكي فائق",
      description: "هاتف ذكي بمعالج سريع، كاميرا متطورة، وبطارية تدوم طويلاً",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w-400&h=400&fit=crop",
      category: "إلكترونيات"
    },
    {
      id: 4,
      name: "حقيبة لابتوب جلدية",
      description: "حقيبة أنيقة ومتينة للابتوب بجودة عالية",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
      category: "إكسسوارات"
    },
    {
      id: 5,
      name: "كتاب الذكاء الاصطناعي",
      description: "كتاب شامل عن تقنيات الذكاء الاصطناعي وتطبيقاتها",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
      category: "كتب"
    },
    {
      id: 6,
      name: "كاميرا احترافية",
      description: "كاميرا DSLR مع عدسات متعددة وحامل ثلاثي القوائم",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      category: "إلكترونيات"
    }
  ];

  // === تأثير للتمرير إلى أحدث رسالة ===
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // === بدء المحادثة ===
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      text: "مرحباً! 👋 أنا مساعدك الذكي في متجرنا الإلكتروني. يمكنني مساعدتك في: \n\n1. عرض المنتجات المتاحة 🛍️\n2. البحث عن منتج معين 🔍\n3. إضافة منتجات إلى سلة التسوق 🛒\n4. إتمام عملية الشراء 💰\n\nكيف يمكنني مساعدتك اليوم؟",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([welcomeMessage]);
  }, []);

  // === معالجة إرسال الرسائل ===
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // محاكاة استجابة AI ذكية
    setTimeout(() => {
      processUserMessage(inputText.toLowerCase());
      setIsLoading(false);
    }, 800);
  };

  // === معالجة رسائل المستخدم ===
  const processUserMessage = (message) => {
    const aiResponse = {
      id: messages.length + 2,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // تحليل رسالة المستخدم وإعطاء رد ذكي
    if (message.includes('مرحبا') || message.includes('السلام') || message.includes('اهلا')) {
      aiResponse.text = "أهلاً وسهلاً بك! 😊 كيف يمكنني مساعدتك في متجرنا اليوم؟";
    } 
    else if (message.includes('منتجات') || message.includes('عرض') || message.includes('شوف') || message.includes('أرني')) {
      aiResponse.text = "هذه قائمة بمنتجاتنا المميزة. يمكنك النقر على أي منتج لإضافته إلى السلة، أو اطلب مني مساعدتك في العثور على منتج معين.";
      aiResponse.showProducts = true;
    }
    else if (message.includes('سلة') || message.includes('عربة') || message.includes('المشتريات')) {
      if (cart.length === 0) {
        aiResponse.text = "سلة التسوق فارغة حالياً. اطلب مني عرض المنتجات لتختار ما يعجبك! 🛍️";
      } else {
        aiResponse.text = `لديك ${cart.reduce((sum, item) => sum + item.quantity, 0)} عناصر في سلة التسوق بقيمة إجمالية ${calculateTotal().toFixed(2)} ريال. هل تريد إتمام الشراء؟`;
        aiResponse.showCart = true;
        setActiveStep('cart');
      }
    }
    else if (message.includes('بحث') || message.includes('ابحث') || message.includes('أريد')) {
      const searchTerm = extractSearchTerm(message);
      const searchResults = searchProducts(searchTerm);
      
      if (searchResults.length > 0) {
        aiResponse.text = `عثرت على ${searchResults.length} منتج(ات) تطابق بحثك عن "${searchTerm}":`;
        aiResponse.showProducts = true;
        aiResponse.filteredProducts = searchResults;
      } else {
        aiResponse.text = `لم أتمكن من العثور على منتجات تطابق "${searchTerm}". جرب مصطلحات بحث أخرى أو اطلب مني عرض جميع المنتجات.`;
      }
    }
    else if (message.includes('شراء') || message.includes('إتمام') || message.includes('طلب')) {
      if (cart.length === 0) {
        aiResponse.text = "سلة التسوق فارغة! أضف بعض المنتجات أولاً قبل إتمام الشراء. هل تريد أن أعرض لك المنتجات؟";
      } else {
        aiResponse.text = "ممتاز! دعنا نكمل عملية الشراء. سأحتاج بعض المعلومات منك:";
        setShowCustomerForm(true);
        setActiveStep('customer');
      }
    }
    else if (message.includes('شكرا') || message.includes('ممتاز') || message.includes('رائع')) {
      aiResponse.text = "العفو! 😊 سعدت بخدمتك. هل هناك أي شيء آخر تحتاجه؟";
    }
    else if (message.includes('سعر') || message.includes('تكلفة') || message.includes('ثمن')) {
      if (cart.length > 0) {
        aiResponse.text = `المجموع الكلي للسلة هو ${calculateTotal().toFixed(2)} ريال. هل تريد إضافة منتجات أخرى أو المتابعة للشراء؟`;
      } else {
        aiResponse.text = "يمكنني عرض أسعار المنتجات بمجرد أن تطلب مني عرضها. جرب أن تقول 'اعرض لي المنتجات'";
      }
    }
    else if (message.includes('مساعدة') || message.includes('help') || message.includes('مساعدة')) {
      aiResponse.text = "أنا هنا لمساعدتك! يمكنني:\n\n1. ✅ عرض المنتجات المتاحة\n2. ✅ البحث عن منتجات معينة\n3. ✅ إضافة المنتجات إلى السلة\n4. ✅ إتمام عملية الشراء\n5. ✅ الإجابة على أسئلتك\n\nما الذي تريد فعله؟";
    }
    else {
      // رد ذكي عام
      const smartResponses = [
        "هذا سؤال مثير للاهتمام! هل يمكنك توضيح ماذا تقصد؟ 🤔",
        "أفهم أنك تبحث عن شيء محدد. هل يمكنني مساعدتك في العثور على منتجاتنا؟",
        `يمكنني مساعدتك في التسوق من متجرنا. جرب أن تقول "اعرض المنتجات" لترى ما لدينا، أو "ابحث عن ${getRandomProductCategory()}" للبحث في فئة معينة.`,
        "أنا متخصص في مساعدتك في التسوق عبر متجرنا الإلكتروني. كيف يمكنني خدمتك اليوم؟ 🛍️",
        "هل تريد معرفة المزيد عن منتج معين؟ أم تفضل تصفح جميع المنتجات؟"
      ];
      aiResponse.text = smartResponses[Math.floor(Math.random() * smartResponses.length)];
    }

    setMessages(prev => [...prev, aiResponse]);
  };

  // === دعم البحث الذكي ===
  const extractSearchTerm = (message) => {
    const searchWords = ['بحث عن', 'ابحث عن', 'أريد', 'عندكم', 'تبحث', 'يبحث'];
    for (const word of searchWords) {
      if (message.includes(word)) {
        return message.split(word)[1]?.trim() || 'منتجات';
      }
    }
    return message;
  };

  const searchProducts = (term) => {
    if (!term || term === 'منتجات') return products;
    
    return products.filter(product => 
      product.name.includes(term) || 
      product.description.includes(term) || 
      product.category.includes(term)
    );
  };

  const getRandomProductCategory = () => {
    const categories = ['إلكترونيات', 'إكسسوارات', 'كتب'];
    return categories[Math.floor(Math.random() * categories.length)];
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

    // إضافة رسالة تأكيد
    const confirmationMessage = {
      id: messages.length + 1,
      text: `تم إضافة "${product.name}" إلى سلة التسوق بنجاح! 🛒`,
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

  // === إدارة بيانات العميل ===
  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    
    // تحقق من البيانات
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      const errorMessage = {
        id: messages.length + 1,
        text: "⚠️ يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، العنوان) قبل المتابعة.",
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
      text: `✅ تم حفظ بياناتك بنجاح! هذا ملخص طلبك:`,
      sender: 'ai',
      showOrderSummary: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, orderSummaryMessage]);
  };

  // === تأكيد الطلب ===
  const handleConfirmOrder = () => {
    setOrderConfirmed(true);
    setCart([]);
    
    const confirmationMessage = {
      id: messages.length + 1,
      text: `🎉 تم تأكيد طلبك بنجاح! رقم طلبك: #${Math.floor(10000 + Math.random() * 90000)}\n\nسيتم التواصل معك على ${customerInfo.phone} لتأكيد التفاصيل وتسليم الطلب. شكراً لثقتك بنا! 😊`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, confirmationMessage]);
    setActiveStep('complete');
  };

  // === كود تصميم Tailwind CSS ===
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              متجر AI التفاعلي
            </span>
          </h1>
          <p className="text-gray-600 text-lg">تجربة تسوق ذكية مع مساعد افتراضي متطور</p>
          
          <div className="flex justify-center items-center mt-4 space-x-4 rtl:space-x-reverse">
            <div className={`px-4 py-2 rounded-full ${activeStep === 'browsing' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span className="font-semibold">التصفح</span>
            </div>
            <div className={`px-4 py-2 rounded-full ${activeStep === 'cart' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span className="font-semibold">السلة</span>
            </div>
            <div className={`px-4 py-2 rounded-full ${activeStep === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span className="font-semibold">البيانات</span>
            </div>
            <div className={`px-4 py-2 rounded-full ${activeStep === 'confirmation' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
              <span className="font-semibold">التأكيد</span>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chatbox Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">AI</span>
                    </div>
                    <div className="mr-3">
                      <h2 className="text-white font-bold text-xl">المساعد الذكي</h2>
                      <p className="text-blue-100 text-sm">متصل وجاهز للرد</p>
                    </div>
                  </div>
                  <div className="text-white">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {cart.length} منتج في السلة
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 ${msg.sender === 'user' ? 'text-left' : 'text-right'}`}>
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-2xl p-4 ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none shadow-sm'}`}>
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-blue-400' : 'bg-purple-100'}`}>
                            {msg.sender === 'user' ? '👤' : '🤖'}
                          </div>
                          <span className={`mr-2 text-sm ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.sender === 'user' ? 'أنت' : 'المساعد'}
                          </span>
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                        </div>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        
                        {/* عرض المنتجات إذا كانت موجودة في الرسالة */}
                        {msg.showProducts && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(msg.filteredProducts || products).map(product => (
                              <div key={product.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow">
                                <div className="flex">
                                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="mr-3 flex-1">
                                    <h3 className="font-bold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <span className="font-bold text-blue-600">{product.price.toFixed(2)} ريال</span>
                                      <button 
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                      >
                                        أضف للسلة
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* عرض السلة */}
                        {msg.showCart && cart.length > 0 && (
                          <div className="mt-4 bg-blue-50 rounded-xl p-4">
                            <h4 className="font-bold text-gray-800 mb-3">سلة التسوق</h4>
                            {cart.map(item => (
                              <div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-lg mb-2">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="mr-3">
                                    <h5 className="font-semibold">{item.name}</h5>
                                    <p className="text-sm text-gray-600">{item.price.toFixed(2)} ريال</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg"
                                  >
                                    -
                                  </button>
                                  <span className="font-semibold">{item.quantity}</span>
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg"
                                  >
                                    +
                                  </button>
                                  <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 mr-3"
                                  >
                                    حذف
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-300">
                              <span className="font-bold text-lg">المجموع: {calculateTotal().toFixed(2)} ريال</span>
                              <button 
                                onClick={() => {
                                  setShowCustomerForm(true);
                                  setActiveStep('customer');
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                              >
                                إتمام الشراء
                              </button>
                            </div>
                          </div>
                        )}
                        
                        {/* عرض ملخص الطلب */}
                        {msg.showOrderSummary && (
                          <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-bold text-gray-800 mb-3">📋 ملخص الطلب</h4>
                            
                            <div className="mb-4">
                              <h5 className="font-semibold text-gray-700 mb-2">المنتجات:</h5>
                              {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-white/50 p-2 rounded mb-1">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} ريال</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mb-4">
                              <h5 className="font-semibold text-gray-700 mb-2">بيانات العميل:</h5>
                              <div className="bg-white/50 p-3 rounded">
                                <p><strong>الاسم:</strong> {customerInfo.name}</p>
                                <p><strong>الهاتف:</strong> {customerInfo.phone}</p>
                                <p><strong>العنوان:</strong> {customerInfo.address}</p>
                                {customerInfo.email && <p><strong>البريد:</strong> {customerInfo.email}</p>}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-bold text-lg">المجموع الكلي:</span>
                              <span className="font-bold text-2xl text-green-600">{calculateTotal().toFixed(2)} ريال</span>
                            </div>
                            
                            {!orderConfirmed ? (
                              <div className="flex space-x-3 rtl:space-x-reverse">
                                <button 
                                  onClick={handleConfirmOrder}
                                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                                >
                                  تأكيد الطلب
                                </button>
                                <button 
                                  onClick={() => setShowCustomerForm(true)}
                                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                  تعديل البيانات
                                </button>
                              </div>
                            ) : (
                              <div className="text-center py-3 bg-green-100 rounded-lg">
                                <p className="text-green-700 font-semibold">✅ تم تأكيد طلبك بنجاح!</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="text-right">
                    <div className="inline-block bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                          🤖
                        </div>
                        <div className="flex space-x-1 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="border-t border-gray-200 p-4 bg-white">
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="اكتب رسالتك هنا... يمكنك طلب المنتجات، السؤال عن شيء، أو إتمام الشراء"
                    className="flex-1 border border-gray-300 rounded-r-lg rounded-l-none px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                    dir="rtl"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-l-lg rounded-r-none font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    إرسال
                  </button>
                </form>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <button 
                    onClick={() => setInputText("اعرض لي المنتجات")}
                    className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
                  >
                    🛍️ عرض المنتجات
                  </button>
                  <button 
                    onClick={() => setInputText("عرض سلة التسوق")}
                    className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors"
                  >
                    🛒 عرض السلة
                  </button>
                  <button 
                    onClick={() => setInputText("ابحث عن إلكترونيات")}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                  >
                    🔍 بحث عن منتجات
                  </button>
                  <button 
                    onClick={() => setInputText("مساعدة")}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    ❓ مساعدة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Customer Form */}
            {showCustomerForm && (
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">معلومات العميل</h3>
                  <button 
                    onClick={() => setShowCustomerForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleCustomerSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="أدخل اسمك الكامل"
                        dir="rtl"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">رقم الهاتف</label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="05xxxxxxxx"
                        dir="rtl"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">العنوان</label>
                      <textarea
                        name="address"
                        value={customerInfo.address}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                        placeholder="أدخل عنوانك بالتفصيل"
                        dir="rtl"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">البريد الإلكتروني (اختياري)</label>
                      <input
                        type="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleCustomerInfoChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="email@example.com"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    حفظ المعلومات والمتابعة
                  </button>
                </form>
              </div>
            )}

            {/* Cart Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🛒 سلة التسوق</h3>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-5xl mb-4">🛍️</div>
                  <p className="text-gray-500">سلة التسوق فارغة</p>
                  <p className="text-gray-400 text-sm mt-2">اكتب "اعرض المنتجات" لبدء التسوق</p>
                </div>
              ) : (
                <>
                  <div className="max-h-64 overflow-y-auto mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="mr-3">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                              >
                                -
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded text-xs"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <span className="font-bold text-blue-600">{(item.price * item.quantity).toFixed(2)} ريال</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">عدد المنتجات:</span>
                      <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">المجموع الفرعي:</span>
                      <span className="font-semibold">{calculateTotal().toFixed(2)} ريال</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">الضريبة:</span>
                      <span className="font-semibold">{(calculateTotal() * 0.15).toFixed(2)} ريال</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-300">
                      <span>المجموع الكلي:</span>
                      <span className="text-green-600">{(calculateTotal() * 1.15).toFixed(2)} ريال</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setShowCustomerForm(true);
                        setActiveStep('customer');
                      }}
                      className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      إتمام الشراء
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 mt-6 text-white">
              <h3 className="text-xl font-bold mb-4">📊 إحصائيات سريعة</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold">{products.length}</div>
                  <div className="text-sm opacity-90">منتج متاح</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold">{cart.length}</div>
                  <div className="text-sm opacity-90">منتج في السلة</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold">{messages.length}</div>
                  <div className="text-sm opacity-90">رسالة متبادلة</div>
                </div>
                <div className="bg-white/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold">{orderConfirmed ? 1 : 0}</div>
                  <div className="text-sm opacity-90">طلبات مؤكدة</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600">
          <p>© 2024 متجر AI التفاعلي. جميع الحقوق محفوظة.</p>
          <p className="text-sm mt-2">هذا MVP يعمل بالكامل على Frontend - يمكن تطويره لاحقاً مع backend وبوابة دفع</p>
        </footer>
      </div>
    </div>
  );
};

export default App;