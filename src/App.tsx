import React, { useState, useMemo } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Import all page components
import ProductListPage from './components/ProductListPage';
import ProductDetailPage from './components/ProductDetailPage';
import BasketPage from './components/BasketPage';
import CheckoutPage from './components/CheckoutPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import PlaceholderPage from './components/PlaceholderPage';
import AddToCartOverlay from './components/AddToCartOverlay';
import Menu from './components/Menu';
import AuthPage from './components/AuthPage';
import ConsultingForm from './components/ConsultingForm';
import AdminDashboard from './components/AdminDashboard';
import AIChatModal from './components/AIChatModal';

// Enhanced product data with descriptions and locations
const PRODUCTS = [
  {
    id: 1,
    name: "AI 진로진학 에이전트 구축",
    price: "₩1,200,000 / 건",
    priceValue: 1200000,
    farm: "AI 전략 컨설팅팀",
    images: [
      "https://images.unsplash.com/photo-1726607424623-6d9fee974241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdHJhbnNmb3JtYXRpb24lMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg1Nzg5NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1758762641372-e3b52bf061d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2ODU2NTQ5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    isFavorite: true,
    description: "학원 전용 AI를 활용해 학생의 성적과 진로를 실시간으로 상담하고 관리하는 최첨단 에이전트 구축 서비스입니다.",
    location: "전국 (온라인/오프라인 병행)",
    dietary: ["AI", "Career", "Innovation"]
  },
  {
    id: 2,
    name: "학원 ESG 경영 브랜딩",
    price: "₩800,000 / 월",
    priceValue: 800000,
    farm: "브랜드 가치 연구소",
    images: [
      "https://images.unsplash.com/photo-1751666526244-40239a251eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc2ODYzMjAwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1765018028697-2baae4577cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjByZXNwb25zaWJpbGl0eSUyMHZvbHVudGVlcnxlbnwxfHx8fDE3Njg2MzIwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    isFavorite: false,
    description: "소비자가 인식하는 ESG 경영 요소를 분석하여 학원의 브랜드 이미지를 제고하고 재등록률을 높이는 전략을 제공합니다.",
    location: "전문 컨설턴트 배정",
    dietary: ["ESG", "Branding", "Trust"]
  },
  {
    id: 3,
    name: "마케팅 자동화 솔루션",
    price: "₩500,000 / 세팅",
    priceValue: 500000,
    farm: "성장 가속화팀",
    images: [
      "https://images.unsplash.com/photo-1590102425728-aa39769512ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBzdHJhdGVneSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njg2MzE4ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1758873272869-9130397ff7d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBzdHJhdGVneSUyMHBsYW5uaW5nfGVufDF8fHx8MTc2ODYzMTg4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    isFavorite: true,
    description: "잠재 고객 발굴부터 원생 등록까지의 마케팅 퍼널을 자동화하여 학원의 원생 모집 효율을 극대화합니다.",
    location: "원격 지원 가능",
    dietary: ["Marketing", "CRM", "Auto"]
  },
  {
    id: 4,
    name: "강사 역량 강화 프로그램",
    price: "₩300,000 / 인",
    priceValue: 300000,
    farm: "교육 품질 센터",
    images: [
      "https://images.unsplash.com/photo-1765438863717-49fca900f861?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHNlbWluYXJ8ZW58MXx8fHwxNzY4NjMxODg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1763739527737-e3626d731072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcmVzZW50YXRpb24lMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg2MzE4ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    isFavorite: false,
    description: "최신 교육 트렌드 반영 및 학생 지도 기술 향상을 위한 체계적인 강사 연수 프로그램을 제공합니다.",
    location: "현장 방문 컨설팅",
    dietary: ["Education", "HR", "Quality"]
  },
  {
    id: 5,
    name: "재무 최적화 패키지",
    price: "₩1,500,000 / 분기",
    priceValue: 1500000,
    farm: "경영 관리 본부",
    images: [
      "https://images.unsplash.com/photo-1762427354051-a9bdb181ae3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMGFuYWx5c2lzfGVufDF8fHx8MTc2ODYzMTg4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1763739527737-e3626d731072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc2ODYzMTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    isFavorite: false,
    description: "학원의 세무 리스크를 방어하고 현금 흐름을 개선하여 안정적인 운영 기반을 마련해 드립니다.",
    location: "전용 매니저 배정",
    dietary: ["Finance", "Tax", "Biz"]
  }
];

type SortOption = 'default' | 'a-z' | 'price';
type ViewMode = 'list' | 'detail' | 'basket' | 'checkout' | 'payment' | 'confirmation' | 'orderConfirmation' | 'newsstand' | 'about' | 'profile' | 'signup' | 'login' | 'consultingForm' | 'adminDashboard';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

interface OverlayProduct {
  id: number;
  name: string;
  image: string;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

interface ConsultingRequest {
  id: number;
  serviceName: string;
  applicantName: string;
  academyName: string;
  contactNumber: string;
  preferredDate: string;
  inquiry: string;
  status: '대기' | '상담완료';
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  
  // Customer information from checkout
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    address: '',
    city: '',
    country: '대한민국',
    state: 'N/A',
    zipCode: ''
  });

  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({});
  const [consultingRequests, setConsultingRequests] = useState<ConsultingRequest[]>([]);

  const [consultingFormData, setConsultingFormData] = useState({
    academyName: '',
    contactNumber: '',
    preferredDate: '',
    inquiry: ''
  });
  const [consultingErrors, setConsultingErrors] = useState<Record<string, string>>({});
  const [isConsultingSubmitted, setIsConsultingSubmitted] = useState(false);

  const isAdmin = isLoggedIn && (currentUser?.email === 'admin' || currentUser?.name === 'admin');
  
  // Add to cart overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayProduct, setOverlayProduct] = useState<OverlayProduct | null>(null);
  const [overlayQuantity, setOverlayQuantity] = useState(1);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case 'a-z':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return filtered.sort((a, b) => a.priceValue - b.priceValue);
      default:
        return filtered;
    }
  }, [searchTerm, sortOption]);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const showAddToCartOverlay = (product: typeof PRODUCTS[0], quantity = 1) => {
    setOverlayProduct({
      id: product.id,
      name: product.name,
      image: product.images[0]
    });
    setOverlayQuantity(quantity);
    setShowOverlay(true);

    // Hide overlay after 1 second
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const addToCart = (productId?: number, quantityToAdd = 1) => {
    let targetProduct;
    
    if (productId) {
      targetProduct = PRODUCTS.find(p => p.id === productId);
    } else if (selectedProduct) {
      targetProduct = selectedProduct;
    }
    
    if (!targetProduct) return;

    // Show overlay
    showAddToCartOverlay(targetProduct, quantityToAdd);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === targetProduct.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === targetProduct.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevItems, {
          id: targetProduct.id,
          name: targetProduct.name,
          price: targetProduct.price,
          priceValue: targetProduct.priceValue,
          image: targetProduct.images[0],
          quantity: quantityToAdd
        }];
      }
    });
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  // Navigation handlers
  const handleProductClick = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(product);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    setViewMode('basket');
  };

  const handleBackFromBasket = () => {
    setViewMode('list');
  };

  const handleGoToCheckout = () => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    setViewMode('checkout');
  };

  const handleBackFromCheckout = () => {
    setViewMode('basket');
  };

  const handleProceedToPayment = (customerData: CustomerInfo) => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    setCustomerInfo(customerData);
    setViewMode('payment');
  };

  const handleBackFromPayment = () => {
    setViewMode('checkout');
  };

  const handleProceedToConfirmation = () => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    setViewMode('confirmation');
  };

  const handleBackFromConfirmation = () => {
    setViewMode('payment');
  };

  const handleCompletePurchase = () => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    // Show order confirmation and clear cart
    setViewMode('orderConfirmation');
    setCartItems([]);
  };

  const handleShopFromOrderConfirmation = () => {
    setViewMode('list');
    setSelectedProduct(null);
    // Reset customer info for new order
    setCustomerInfo({
      fullName: '',
      address: '',
      city: '',
      country: '대한민국',
      state: 'N/A',
      zipCode: ''
    });
  };

  const handleMenuNavigation = (screen: string) => {
    if (screen === 'basket' && !isLoggedIn) {
      setViewMode('login');
      return;
    }
    if (screen === 'adminDashboard' && !isAdmin) {
      setViewMode('login');
      return;
    }
    setViewMode(screen as ViewMode);
    setSelectedProduct(null);
  };

  const handleAuthFieldChange = (field: keyof typeof authFormData, value: string) => {
    setAuthFormData(prev => ({ ...prev, [field]: value }));
    if (authErrors[field]) {
      setAuthErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleLoginSubmit = () => {
    const errors: Record<string, string> = {};
    if (!authFormData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    }
    if (!authFormData.password.trim()) {
      errors.password = '비밀번호를 입력해주세요.';
    }
    setAuthErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoggedIn(true);
      setCurrentUser({
        name: authFormData.name.trim() || authFormData.email.split('@')[0],
        email: authFormData.email.trim()
      });
      setViewMode('list');
    }
  };

  const handleSignupSubmit = () => {
    const errors: Record<string, string> = {};
    if (!authFormData.name.trim()) {
      errors.name = '이름을 입력해주세요.';
    }
    if (!authFormData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    }
    if (authFormData.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.';
    }
    if (authFormData.password !== authFormData.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    setAuthErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsLoggedIn(true);
      setCurrentUser({
        name: authFormData.name.trim(),
        email: authFormData.email.trim()
      });
      setViewMode('list');
    }
  };

  const handleAuthModeSwitch = (mode: 'login' | 'signup') => {
    setAuthErrors({});
    setViewMode(mode);
  };

  const handleStartConsulting = () => {
    if (!isLoggedIn) {
      setViewMode('login');
      return;
    }
    setIsConsultingSubmitted(false);
    setConsultingErrors({});
    setViewMode('consultingForm');
  };

  const handleRequestFieldChange = (
    field: keyof typeof consultingFormData,
    value: string
  ) => {
    setConsultingFormData(prev => ({ ...prev, [field]: value }));
    if (consultingErrors[field]) {
      setConsultingErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleRequestSubmit = () => {
    const errors: Record<string, string> = {};
    if (!consultingFormData.academyName.trim()) {
      errors.academyName = '학원명을 입력해주세요.';
    }
    if (!consultingFormData.contactNumber.trim()) {
      errors.contactNumber = '연락처를 입력해주세요.';
    }
    if (!consultingFormData.preferredDate.trim()) {
      errors.preferredDate = '희망 상담 일자를 선택해주세요.';
    }
    if (!consultingFormData.inquiry.trim()) {
      errors.inquiry = '문의 사항을 입력해주세요.';
    }
    setConsultingErrors(errors);
    if (Object.keys(errors).length > 0) {
      return false;
    }

    if (selectedProduct && currentUser) {
      const newRequest: ConsultingRequest = {
        id: Date.now(),
        serviceName: selectedProduct.name,
        applicantName: currentUser.name,
        academyName: consultingFormData.academyName,
        contactNumber: consultingFormData.contactNumber,
        preferredDate: consultingFormData.preferredDate,
        inquiry: consultingFormData.inquiry,
        status: '대기'
      };
      setConsultingRequests(prev => [newRequest, ...prev]);
    }
    return true;
  };

  const handleRequestComplete = () => {
    setIsConsultingSubmitted(true);
    setTimeout(() => {
      setViewMode('list');
      setConsultingFormData({
        academyName: '',
        contactNumber: '',
        preferredDate: '',
        inquiry: ''
      });
      setIsConsultingSubmitted(false);
    }, 1200);
  };

  const handleRequestStatusChange = (id: number, status: '대기' | '상담완료') => {
    setConsultingRequests(prev =>
      prev.map(request => (request.id === id ? { ...request, status } : request))
    );
  };

  const handleTransferToConsulting = (insight: string) => {
    setAiInsights(insight);
    setIsAIChatOpen(false);
    setViewMode('consultingForm');
  };

  const handleOpenAIChat = () => {
    setIsAIChatOpen(true);
  };

  const handleCloseAIChat = () => {
    setIsAIChatOpen(false);
  };

  // Render current view based on viewMode
  const renderCurrentView = () => {
    switch (viewMode) {
      case 'list':
        return (
          <ProductListPage
            products={filteredAndSortedProducts}
            favorites={favorites}
            searchTerm={searchTerm}
            sortOption={sortOption}
            cartCount={cartCount}
            onSearchChange={setSearchTerm}
            onSortChange={setSortOption}
            onToggleFavorite={toggleFavorite}
            onAddToCart={(productId) => addToCart(productId, 1)}
            onProductClick={handleProductClick}
            onMenuClick={() => setIsNavOpen(true)}
            onCartClick={handleCartClick}
            onLoginClick={() => setViewMode('login')}
            onInsightsClick={() => setViewMode('newsstand')}
            onConsultingListClick={handleCartClick}
            onProfileClick={() => setViewMode('profile')}
            onAIChatOpen={handleOpenAIChat}
          />
        );
      
      case 'detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            cartCount={cartCount}
            onBack={handleBackToList}
            onStartConsulting={handleStartConsulting}
          />
        ) : null;
      
      case 'basket':
        return (
          <BasketPage
            cartItems={cartItems}
            onBack={handleBackFromBasket}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onGoToCheckout={handleGoToCheckout}
          />
        );
      
      case 'checkout':
        return (
          <CheckoutPage
            cartCount={cartCount}
            customerInfo={customerInfo}
            onBack={handleBackFromCheckout}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToPayment={handleProceedToPayment}
          />
        );
      
      case 'payment':
        return (
          <PaymentPage
            cartCount={cartCount}
            onBack={handleBackFromPayment}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToConfirmation={handleProceedToConfirmation}
          />
        );
      
      case 'confirmation':
        return (
          <ConfirmationPage
            cartItems={cartItems}
            cartCount={cartCount}
            onBack={handleBackFromConfirmation}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onCompletePurchase={handleCompletePurchase}
          />
        );
      
      case 'orderConfirmation':
        return (
          <OrderConfirmationPage
            cartCount={0} // Cart is cleared after purchase
            customerInfo={customerInfo}
            onShop={handleShopFromOrderConfirmation}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );
      
      case 'newsstand':
      case 'about':
      case 'profile':
        return (
          <PlaceholderPage 
            title={viewMode === 'newsstand' ? '인사이트' : viewMode === 'about' ? '회사 소개' : '내 프로필'}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLoginClick={() => setViewMode('login')}
          />
        );

      case 'login':
        return (
          <AuthPage
            mode="login"
            formData={authFormData}
            errors={authErrors}
            onFieldChange={handleAuthFieldChange}
            onSubmit={handleLoginSubmit}
            onSwitchMode={handleAuthModeSwitch}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );

      case 'signup':
        return (
          <AuthPage
            mode="signup"
            formData={authFormData}
            errors={authErrors}
            onFieldChange={handleAuthFieldChange}
            onSubmit={handleSignupSubmit}
            onSwitchMode={handleAuthModeSwitch}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );

      case 'consultingForm':
        return (
          <ConsultingForm
            selectedService={
              selectedProduct
                ? { id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price, farm: selectedProduct.farm }
                : null
            }
            applicantName={currentUser?.name || '관리자'}
            aiInsights={aiInsights}
            formData={consultingFormData}
            errors={consultingErrors}
            isSubmitted={isConsultingSubmitted}
            onFieldChange={handleRequestFieldChange}
            onSubmit={handleRequestSubmit}
            onComplete={handleRequestComplete}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );

      case 'adminDashboard':
        return (
          <AdminDashboard
            requests={consultingRequests}
            onStatusChange={handleRequestStatusChange}
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* iPhone 16 Container */}
      <div className="w-[393px] h-[852px] bg-[#ffffff] relative overflow-hidden rounded-[40px] shadow-2xl border-8 border-black">
        
        {renderCurrentView()}

        {/* Add to Cart Overlay */}
        <AddToCartOverlay
          isVisible={showOverlay}
          product={overlayProduct}
          quantity={overlayQuantity}
        />

        {/* Custom Menu */}
        <Menu
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          onNavigate={handleMenuNavigation}
          isAdmin={isAdmin}
        />

        <AIChatModal
          isOpen={isAIChatOpen}
          onClose={handleCloseAIChat}
          onTransferStrategy={handleTransferToConsulting}
        />
      </div>
    </div>
  );
}