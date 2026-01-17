import React from 'react';
import { CheckCircle2, Calendar, MapPin, Phone, ArrowRight, Sparkles } from 'lucide-react';

interface OrderConfirmationPageProps {
  cartCount: number;
  customerInfo: CustomerInfo;
  onShop: () => void;
  onMenuClick: () => void;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

export default function OrderConfirmationPage({ 
  cartCount, 
  customerInfo, 
  onShop, 
  onMenuClick 
}: OrderConfirmationPageProps) {
  // Generate estimated contact date (2 business days from now)
  const getEstimatedContact = () => {
    const today = new Date();
    const contactDate = new Date(today);
    contactDate.setDate(today.getDate() + 2); // 2 days from now
    
    return contactDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  // Format address for display
  const formatAddress = () => {
    const addressParts = [
      customerInfo.address,
      customerInfo.city,
      customerInfo.state && customerInfo.state !== 'N/A' ? customerInfo.state : '',
      customerInfo.zipCode,
      customerInfo.country
    ].filter(part => part && part.trim() !== '');

    return addressParts.join(', ');
  };

  const estimatedContact = getEstimatedContact();
  const orderNumber = `HTC-${Date.now().toString().slice(-8)}`;

  return (
    <div className="h-full bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimal Header */}
      <div className="bg-[#051128] pt-4 pb-6 px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[15px] font-light tracking-wide">
            하우투 경영 컨설팅
          </h1>
          
          <button 
            onClick={onMenuClick}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-8 overflow-y-auto h-[calc(100%-180px)]">
        {/* Success Animation Area */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            {/* Main Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle2 className="w-12 h-12 text-white" strokeWidth="2" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#d4af37] rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-[#051128]" strokeWidth="2" />
            </div>
          </div>

          <h1 className="text-[#051128] text-[24px] font-bold tracking-tight mb-2">
            상담 신청이 완료되었습니다!
          </h1>
          <p className="text-[#64748b] text-[14px] font-light leading-relaxed max-w-[280px] mx-auto">
            전문 컨설턴트가 곧 연락드릴 예정입니다
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(5,17,40,0.04)] mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
              신청 번호
            </p>
            <button className="text-[#d4af37] text-[11px] font-medium hover:underline">
              복사
            </button>
          </div>
          <p className="text-[#051128] text-[18px] font-mono font-bold tracking-wider">
            {orderNumber}
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(5,17,40,0.04)] mb-4">
          <h3 className="text-[#051128] text-[15px] font-bold tracking-tight mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#d4af37]" strokeWidth="1.5" />
            연락 예정 정보
          </h3>
          
          <div className="space-y-4">
            {/* Contact Date */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#10b981]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-[#10b981]" strokeWidth="1.5" />
              </div>
              <div>
                <p className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-1">
                  예상 연락 시기
                </p>
                <p className="text-[#051128] text-[13px] font-medium">
                  {estimatedContact}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#d4af37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#d4af37]" strokeWidth="1.5" />
              </div>
              <div>
                <p className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-1">
                  학원 주소
                </p>
                <p className="text-[#051128] text-[13px] font-medium leading-relaxed">
                  {customerInfo.fullName}<br />
                  {formatAddress()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-br from-[#051128] to-[#0a1e3d] rounded-2xl p-5 text-white mb-4">
          <h3 className="text-[15px] font-bold tracking-tight mb-4">
            다음 단계
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#051128] text-[11px] font-bold">1</span>
              </div>
              <p className="text-[13px] font-light leading-relaxed text-white/90">
                담당 컨설턴트 배정 및 연락 (48시간 내)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[11px] font-bold">2</span>
              </div>
              <p className="text-[13px] font-light leading-relaxed text-white/70">
                초기 상담 및 현황 파악
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-[11px] font-bold">3</span>
              </div>
              <p className="text-[13px] font-light leading-relaxed text-white/70">
                맞춤형 솔루션 제안 및 프로젝트 시작
              </p>
            </div>
          </div>
        </div>

        {/* Support Contact */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
          <p className="text-[#64748b] text-[11px] font-light text-center leading-relaxed">
            문의사항이 있으시면<br />
            <span className="text-[#051128] font-medium">support@howto-consulting.kr</span><br />
            로 연락주세요
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <button
          onClick={onShop}
          className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
        >
          다른 서비스 둘러보기
          <ArrowRight className="w-4 h-4" strokeWidth="2" />
        </button>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
