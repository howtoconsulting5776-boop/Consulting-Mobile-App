import React from 'react';
import { ArrowLeft, Briefcase, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
}

interface BasketPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onMenuClick: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onGoToCheckout: () => void;
}

export default function BasketPage({
  cartItems,
  onBack,
  onUpdateQuantity,
  onGoToCheckout,
}: BasketPageProps) {
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.priceValue * item.quantity), 0);

  return (
    <div className="h-full bg-[#f8fafc] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimal Header */}
      <div className="bg-[#051128] pt-4 pb-6 px-5">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth="1.5" />
          </button>
          
          <h1 className="text-white text-[15px] font-light tracking-wide">
            상담 신청 목록
          </h1>
          
          <div className="w-9"></div>
        </div>

        {/* Item Count */}
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#d4af37]" strokeWidth="1.5" />
          <p className="text-white/70 text-[12px] font-light">
            {cartItems.length}개 서비스 선택됨
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-6 overflow-y-auto h-[calc(100%-200px)]">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-[#e2e8f0] rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-10 h-10 text-[#64748b]" strokeWidth="1" />
            </div>
            <p className="text-[#64748b] text-[14px] font-light text-center">
              선택된 서비스가 없습니다
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(5,17,40,0.04)]"
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#051128] text-[14px] font-bold tracking-tight leading-tight mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-[#051128] text-[15px] font-bold mb-3">
                      {item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-[#f8fafc] rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-6 h-6 flex items-center justify-center text-[#64748b] hover:text-[#051128] transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                          </svg>
                        </button>
                        
                        <span className="text-[#051128] text-[13px] font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#64748b] hover:text-[#051128] transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.id, 0)}
                        className="ml-auto text-[#64748b] hover:text-[#d4183d] transition-colors"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth="1.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Bottom Summary */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-5 border-t border-[#e2e8f0]">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
                총 컨설팅 비용
              </p>
              <p className="text-[#051128] text-[20px] font-bold">
                ₩{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={onGoToCheckout}
            className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
          >
            정보 입력하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
