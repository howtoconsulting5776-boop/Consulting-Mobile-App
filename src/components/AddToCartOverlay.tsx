import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface OverlayProduct {
  id: number;
  name: string;
  image: string;
}

interface AddToCartOverlayProps {
  isVisible: boolean;
  product: OverlayProduct | null;
  quantity: number;
}

export default function AddToCartOverlay({ isVisible, product, quantity }: AddToCartOverlayProps) {
  if (!isVisible || !product) return null;

  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-50">
      <div 
        className="w-full px-5 mb-20 pointer-events-auto"
        style={{
          animation: 'slideUp 0.3s ease-out',
          fontFamily: 'Inter, Public Sans, -apple-system, sans-serif'
        }}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(5,17,40,0.16)] border border-[#e2e8f0] overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-4">
              {/* Success Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-white" strokeWidth="2" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide mb-1">
                  상담 신청 목록에 추가됨
                </p>
                <p className="text-[#051128] text-[14px] font-bold tracking-tight leading-tight truncate">
                  {product.name}
                </p>
              </div>

              {/* Quantity Badge */}
              <div className="w-8 h-8 bg-[#051128] rounded-lg flex items-center justify-center flex-shrink-0">
                <p className="text-[#d4af37] text-[13px] font-bold">
                  {quantity}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
