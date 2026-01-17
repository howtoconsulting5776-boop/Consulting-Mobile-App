import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from './lib/supabase';
import { useAuth } from './hooks/useAuth';

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

// Services data from Supabase
interface Service {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  farm: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  dietary: string[];
}

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
  id: string;
  serviceName: string;
  applicantName: string;
  academyName: string;
  contactNumber: string;
  preferredDate: string;
  inquiry: string;
  status: '대기' | '상담완료';
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  academy: string;
  position: string;
  role: string;
}

const mapServiceRow = (row: Record<string, unknown>): Service => ({
  id: Number(row.id),
  name: String(row.name ?? ''),
  price: String(row.price ?? ''),
  priceValue: Number(row.price_value ?? row.priceValue ?? 0),
  farm: String(row.farm ?? ''),
  images: Array.isArray(row.images) ? (row.images as string[]) : [],
  isFavorite: Boolean(row.is_favorite ?? row.isFavorite ?? false),
  description: String(row.description ?? ''),
  location: String(row.location ?? ''),
  dietary: Array.isArray(row.dietary) ? (row.dietary as string[]) : []
});

const mapConsultingRequestRow = (row: Record<string, unknown>): ConsultingRequest => ({
  id: String(row.id),
  serviceName: String(row.service_name ?? row.serviceName ?? ''),
  applicantName: String(row.applicant_name ?? row.applicantName ?? ''),
  academyName: String(row.academy_name ?? row.academyName ?? ''),
  contactNumber: String(row.contact_number ?? row.contactNumber ?? ''),
  preferredDate: String(row.preferred_date ?? row.preferredDate ?? ''),
  inquiry: String(row.inquiry ?? ''),
  status: (row.status as ConsultingRequest['status']) ?? '대기'
});

export default function App() {
  const { currentUser: authUser, isAdmin: isAuthAdmin, signIn, signUp } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [aiInsights, setAiInsights] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<Service | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');
  
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
  const [requestsError, setRequestsError] = useState('');
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [consultingSubmitError, setConsultingSubmitError] = useState('');

  const [consultingFormData, setConsultingFormData] = useState({
    academyName: '',
    contactNumber: '',
    preferredDate: '',
    inquiry: ''
  });
  const [consultingErrors, setConsultingErrors] = useState<Record<string, string>>({});
  const [isConsultingSubmitted, setIsConsultingSubmitted] = useState(false);

  const isAdmin = Boolean(isLoggedIn && isAuthAdmin);
  
  // Add to cart overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayProduct, setOverlayProduct] = useState<OverlayProduct | null>(null);
  const [overlayQuantity, setOverlayQuantity] = useState(1);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (authUser) {
      setIsLoggedIn(true);
      setCurrentUser(authUser);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, [authUser]);

  useEffect(() => {
    const fetchServices = async () => {
      setIsServicesLoading(true);
      setServicesError('');
      const { data, error } = await supabase.from('services').select('*');
      if (error) {
        setServicesError('서비스 목록을 불러오지 못했습니다.');
        setServices([]);
        setIsServicesLoading(false);
        return;
      }
      const mapped = (data ?? []).map((row) => mapServiceRow(row as Record<string, unknown>));
      setServices(mapped);
      setIsServicesLoading(false);
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!authUser) {
        setConsultingRequests([]);
        setIsRequestsLoading(false);
        return;
      }
      setIsRequestsLoading(true);
      setRequestsError('');
      let query = supabase.from('consulting_requests').select('*').order('created_at', { ascending: false });
      if (!isAuthAdmin) {
        query = query.eq('user_id', authUser.id);
      }
      const { data, error } = await query;
      if (error) {
        setRequestsError('상담 요청을 불러오지 못했습니다.');
        setConsultingRequests([]);
        setIsRequestsLoading(false);
        return;
      }
      const mapped = (data ?? []).map((row) => mapConsultingRequestRow(row as Record<string, unknown>));
      setConsultingRequests(mapped);
      setIsRequestsLoading(false);
    };

    fetchRequests();
  }, [authUser, isAuthAdmin]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = services.filter(product =>
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
  }, [searchTerm, sortOption, services]);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const showAddToCartOverlay = (product: Service, quantity = 1) => {
    setOverlayProduct({
      id: product.id,
      name: product.name,
      image: product.images[0] ?? ''
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
      targetProduct = services.find(p => p.id === productId);
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
  const handleProductClick = (product: Service) => {
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

  const handleLoginSubmit = async () => {
    const errors: Record<string, string> = {};
    if (!authFormData.email.trim()) {
      errors.email = '이메일을 입력해주세요.';
    }
    if (!authFormData.password.trim()) {
      errors.password = '비밀번호를 입력해주세요.';
    }
    setAuthErrors(errors);
    if (Object.keys(errors).length === 0) {
      const signInError = await signIn(authFormData.email.trim(), authFormData.password);
      if (signInError) {
        setAuthErrors({ email: '로그인에 실패했습니다. 정보를 확인해주세요.' });
        return;
      }
      setViewMode('list');
    }
  };

  const handleSignupSubmit = async () => {
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
      const signUpError = await signUp(
        authFormData.email.trim(),
        authFormData.password,
        authFormData.name.trim()
      );
      if (signUpError) {
        setAuthErrors({ email: '회원가입에 실패했습니다. 정보를 확인해주세요.' });
        return;
      }
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
    if (currentUser?.academy) {
      setConsultingFormData(prev => ({ ...prev, academyName: currentUser.academy }));
    }
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

  const handleRequestSubmit = async () => {
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

    if (!selectedProduct || !currentUser) {
      return false;
    }
    if (isRequestSubmitting) {
      return false;
    }
    setIsRequestSubmitting(true);
    setConsultingSubmitError('');

    const payload = {
      user_id: currentUser.id,
      service_name: selectedProduct.name,
      applicant_name: currentUser.name,
      academy_name: consultingFormData.academyName,
      contact_number: consultingFormData.contactNumber,
      preferred_date: consultingFormData.preferredDate,
      inquiry: consultingFormData.inquiry,
      status: '대기'
    };

    const { data, error } = await supabase
      .from('consulting_requests')
      .insert(payload)
      .select('*')
      .single();

    setIsRequestSubmitting(false);

    if (error || !data) {
      setConsultingSubmitError('상담 신청을 저장하지 못했습니다.');
      return false;
    }

    const mappedRequest = mapConsultingRequestRow(data as Record<string, unknown>);
    setConsultingRequests(prev => [mappedRequest, ...prev]);
    return true;
  };

  const handleRequestComplete = () => {
    setIsConsultingSubmitted(true);
    setConsultingSubmitError('');
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

  const handleRequestStatusChange = async (id: string, status: '대기' | '상담완료') => {
    setRequestsError('');
    const { error } = await supabase
      .from('consulting_requests')
      .update({ status })
      .eq('id', id);
    if (error) {
      setRequestsError('상담 요청 상태를 업데이트하지 못했습니다.');
      return;
    }
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
            isLoading={isServicesLoading}
            errorMessage={servicesError}
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
            submitError={consultingSubmitError}
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
            isLoading={isRequestsLoading}
            errorMessage={requestsError}
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