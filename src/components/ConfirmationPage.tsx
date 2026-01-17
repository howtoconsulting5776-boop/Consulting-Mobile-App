import React from 'react';
import { ArrowLeft, Package, CheckCircle2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

interface ConfirmationPageProps {
  cartItems: CartItem[];
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCompletePurchase: () => void;
}

export default function ConfirmationPage({
  cartItems,
  cartCount,
  onBack,
  onMenuClick,
  onUpdateQuantity,
  onCompletePurchase
}: ConfirmationPageProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);
  const serviceCharge = 0;
  const vat = Math.round(subtotal * 0.1); // 10% VAT
  const total = subtotal + serviceCharge + vat;

  return (
    <div className="h-full bg-[#f8fafc] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimal Header */}
      <div className="absolute top-[31px] inset-x-0 z-30 bg-[#051128] pt-4 pb-6 px-5 w-full">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth="1.5" />
          </button>
          
          <h1 className="text-white text-[15px] font-light tracking-wide">
            최종 확인
          </h1>
          
          <div className="w-9"></div>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-2">
          {/* Step 1 - Complete */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>

          {/* Step 2 - Complete */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>

          {/* Step 3 - Active */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
            <span className="text-[#051128] text-[13px] font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-[120px] pb-40 px-5 overflow-y-auto h-full">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-[#051128] text-[20px] font-bold tracking-tight mb-2">
            신청 내역
          </h2>
          <p className="text-[#64748b] text-[13px] font-light">
            선택하신 서비스를 확인해주세요
          </p>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(5,17,40,0.04)]"
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#051128] text-[13px] font-bold tracking-tight leading-tight mb-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-[#64748b] text-[11px] font-light">
                      수량: {item.quantity}
                    </p>
                    <p className="text-[#051128] text-[14px] font-bold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
          <h3 className="text-[#051128] text-[15px] font-bold tracking-tight mb-4">
            결제 요약
          </h3>
          
          <div className="space-y-3 mb-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <p className="text-[#64748b] text-[12px] font-light">
                소계
              </p>
              <p className="text-[#051128] text-[13px] font-medium">
                ₩{subtotal.toLocaleString()}
              </p>
            </div>

            {/* Service Charge */}
            <div className="flex items-center justify-between">
              <p className="text-[#64748b] text-[12px] font-light">
                서비스 수수료
              </p>
              <p className="text-[#051128] text-[13px] font-medium">
                ₩{serviceCharge.toLocaleString()}
              </p>
            </div>

            {/* VAT */}
            <div className="flex items-center justify-between">
              <p className="text-[#64748b] text-[12px] font-light">
                부가세 (10%)
              </p>
              <p className="text-[#051128] text-[13px] font-medium">
                ₩{vat.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e2e8f0] my-4"></div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <p className="text-[#051128] text-[14px] font-bold">
              총 결제 금액
            </p>
            <p className="text-[#051128] text-[18px] font-bold">
              ₩{total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Confirmation Notice */}
        <div className="bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-xl p-4 flex items-start gap-3 mt-6">
          <div className="w-5 h-5 bg-[#d4af37]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-[#d4af37]" strokeWidth="2" />
          </div>
          <div>
            <p className="text-[#051128] text-[12px] font-semibold mb-1">
              신청 완료 전 확인사항
            </p>
            <p className="text-[#64748b] text-[11px] font-light leading-relaxed">
              신청하신 서비스는 담당 컨설턴트 배정 후 48시간 내에 연락드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <div className="mb-3 text-center">
          <p className="text-[#64748b] text-[11px] font-light">
            총 결제 금액
          </p>
          <p className="text-[#051128] text-[20px] font-bold">
            ₩{total.toLocaleString()}
          </p>
        </div>
        
        <button
          onClick={onCompletePurchase}
          className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#10b981] text-white py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" strokeWidth="2" />
          상담 신청 확정하기
        </button>
      </div>
    </div>
  );
}
