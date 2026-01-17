import React, { useState } from 'react';
import { ArrowLeft, Briefcase, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface Product {
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

interface ProductDetailPageProps {
  product: Product;
  cartCount: number;
  onBack: () => void;
  onStartConsulting: () => void;
}

const getCategoryInfo = (tags: string[]) => {
  if (tags.includes('AI') || tags.includes('Innovation')) {
    return { name: 'AI 전략', color: 'text-accent-gold', bgColor: 'bg-accent-gold/5' };
  }
  if (tags.includes('ESG') || tags.includes('Branding')) {
    return { name: 'ESG 경영', color: 'text-accent-emerald', bgColor: 'bg-accent-emerald/5' };
  }
  if (tags.includes('Finance') || tags.includes('Marketing') || tags.includes('Education')) {
    return { name: '경영 최적화', color: 'text-slate-grey', bgColor: 'bg-slate-grey/5' };
  }
  return { name: '컨설팅', color: 'text-slate-grey', bgColor: 'bg-slate-grey/5' };
};

export default function ProductDetailPage({
  product,
  cartCount,
  onBack,
  onStartConsulting,
}: ProductDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const category = getCategoryInfo(product.dietary);

  return (
    <div className="h-full bg-[#f8fafc] relative overflow-hidden" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimal Header */}
      <div className="absolute top-[31px] inset-x-0 z-30 bg-gradient-to-b from-[#051128] to-transparent pt-4 pb-8 px-5 pointer-events-none w-full">
        <div className="flex items-center justify-between pointer-events-auto">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth="1.5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className={`${category.bgColor} backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20`}>
              <span className={`text-[10px] font-medium tracking-wide uppercase ${category.color}`}>
                {category.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto pb-24">
        {/* Hero Image Gallery */}
        <div className="relative h-[340px] bg-[#051128]">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.85) brightness(0.95)' }}
          />
          
          {/* Image Indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentImageIndex 
                      ? 'w-6 bg-white' 
                      : 'w-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="px-5 -mt-6">
          {/* Main Info Card with Glassmorphism */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_32px_rgba(5,17,40,0.12)] mb-5">
            <h1 className="text-[#051128] text-[22px] font-bold tracking-tight leading-tight mb-3">
              {product.name}
            </h1>

            <p className="text-[#64748b] text-[13px] font-light leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Meta Information */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <div>
                  <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide">컨설팅사</p>
                  <p className="text-[#051128] text-[13px] font-medium">{product.farm}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <div>
                  <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide">서비스 제공</p>
                  <p className="text-[#051128] text-[13px] font-medium">{product.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <div>
                  <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide">진행 기간</p>
                  <p className="text-[#051128] text-[13px] font-medium">2-4주 구현</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#e2e8f0] my-5"></div>

            {/* Investment */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide mb-1">총 컨설팅 비용</p>
                <p className="text-[#051128] text-[24px] font-bold tracking-tight">
                  {product.price}
                </p>
              </div>
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#051128]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(5,17,40,0.04)] mb-5">
            <h3 className="text-[#051128] text-[15px] font-bold tracking-tight mb-4">
              핵심 혜택
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" strokeWidth="1.5" />
                <p className="text-[#64748b] text-[12px] font-light leading-relaxed">
                  데이터 기반의 전략적 의사결정 지원
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" strokeWidth="1.5" />
                <p className="text-[#64748b] text-[12px] font-light leading-relaxed">
                  검증된 방법론으로 측정 가능한 ROI 달성
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#10b981] mt-0.5 flex-shrink-0" strokeWidth="1.5" />
                <p className="text-[#64748b] text-[12px] font-light leading-relaxed">
                  구현 전 과정에서 전담 전문가 지원
                </p>
              </div>
            </div>
          </div>

          {/* Process Overview */}
          <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <h3 className="text-[#051128] text-[15px] font-bold tracking-tight mb-4">
              컨설팅 프로세스
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center text-[11px] font-bold">
                    1
                  </div>
                  <div className="w-px h-8 bg-[#e2e8f0]"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-[#051128] text-[13px] font-semibold mb-1">발견 및 분석</h4>
                  <p className="text-[#64748b] text-[11px] font-light leading-relaxed">
                    현재 운영 상태에 대한 종합적인 진단
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center text-[11px] font-bold">
                    2
                  </div>
                  <div className="w-px h-8 bg-[#e2e8f0]"></div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-[#051128] text-[13px] font-semibold mb-1">전략 수립</h4>
                  <p className="text-[#64748b] text-[11px] font-light leading-relaxed">
                    목표에 맞춘 맞춤형 로드맵 제시
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center text-[11px] font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-[#051128] text-[13px] font-semibold mb-1">구현 및 지원</h4>
                  <p className="text-[#64748b] text-[11px] font-light leading-relaxed">
                    지속적인 최적화와 함께 실질적 실행
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <button
          onClick={onStartConsulting}
          className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
        >
          상담 신청하기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}