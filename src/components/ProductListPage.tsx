import React, { useEffect, useMemo, useState } from 'react';
import { TrendingUp, Users, Briefcase, LogIn } from 'lucide-react';
import aiIcon from '../assets/ai-icon.svg';

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

interface ProductListPageProps {
  products: Product[];
  isLoading?: boolean;
  errorMessage?: string;
  favorites: Set<number>;
  searchTerm: string;
  sortOption: string;
  cartCount: number;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (id: number) => void;
  onProductClick: (product: Product) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  onLoginClick: () => void;
  onInsightsClick: () => void;
  onConsultingListClick: () => void;
  onProfileClick: () => void;
  onAIChatOpen: () => void;
}

// Category mapping for services
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
  if (tags.includes('Automation')) {
    return { name: 'AI 자동화', color: 'text-accent-gold', bgColor: 'bg-accent-gold/5' };
  }
  return { name: '컨설팅', color: 'text-slate-grey', bgColor: 'bg-slate-grey/5' };
};

// AI Automation Solutions Data
const aiAutomationSolutions = [
  {
    id: 101,
    name: "AI 진로상담 에이전트",
    price: "₩800,000 / 월",
    priceValue: 800000,
    farm: "AI 전략 컨설팅팀",
    images: ["https://images.unsplash.com/photo-1768323275769-6615e7cfcbe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc2ODYzOTk5OHww&ixlib=rb-4.1.0&q=80&w=1080"],
    isFavorite: false,
    description: "AI 기반 실시간 학생 진로상담으로 관리 시간 70% 감소. 24시간 자동 응답 시스템으로 학부모 만족도 향상",
    location: "클라우드 기반",
    dietary: ["AI", "Automation"],
    metric: "관리 시간 70% 감소"
  },
  {
    id: 102,
    name: "스마트 청구 시스템",
    price: "₩600,000 / 월",
    priceValue: 600000,
    farm: "성장 가속화팀",
    images: ["https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzY4NTMxNTE5fDA&ixlib=rb-4.1.0&q=80&w=1080"],
    isFavorite: false,
    description: "자동화된 수납 관리로 95% 자동화율 달성. 미수금 관리 및 알림 기능으로 현금 흐름 개선",
    location: "전용 매니저 배정",
    dietary: ["Finance", "Automation"],
    metric: "자동화율 95%"
  },
  {
    id: 103,
    name: "자동 학업 리포트",
    price: "₩450,000 / 월",
    priceValue: 450000,
    farm: "교육 품질 센터",
    images: ["https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcmVwb3J0JTIwYW5hbHl0aWNzfGVufDF8fHx8MTc2ODY0MDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080"],
    isFavorite: false,
    description: "학생별 맞춤형 성적 분석 리포트를 자동 생성. 생성 시간 85% 단축으로 강사의 교육 시간 확보",
    location: "원격 지원 가능",
    dietary: ["Education", "Automation"],
    metric: "리포트 생성 시간 85% 단축"
  },
  {
    id: 104,
    name: "강사 급여 운영 시스템",
    price: "₩550,000 / 월",
    priceValue: 550000,
    farm: "경영 관리 본부",
    images: ["https://images.unsplash.com/photo-1732896066042-89c92a60421b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXlyb2xsJTIwc3lzdGVtJTIwd29ya3BsYWNlfGVufDF8fHx8MTc2ODY0MDAwNXww&ixlib=rb-4.1.0&q=80&w=1080"],
    isFavorite: false,
    description: "강사 급여 자동 계산 및 정산 시스템. 99.9% 안정성으로 인사 관리 업무 부담 최소화",
    location: "전용 매니저 배정",
    dietary: ["HR", "Automation"],
    metric: "안정성 99.9%"
  },
  {
    id: 105,
    name: "CRM 등록 퍼널",
    price: "₩700,000 / 월",
    priceValue: 700000,
    farm: "성장 가속화팀",
    images: ["https://images.unsplash.com/photo-1674027392838-d85710a5121d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMGdyb3d0aCUyMGZ1bm5lbHxlbnwxfHx8fDE3Njg2NDAwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080"],
    isFavorite: false,
    description: "잠재 학생 발굴부터 등록까지 자동화된 마케팅 퍼널. 전환율 42% 증가로 신규 원생 확보",
    location: "원격 지원 가능",
    dietary: ["Marketing", "Automation"],
    metric: "전환율 +42% 증가"
  }
];

export default function ProductListPage({
  products,
  isLoading = false,
  errorMessage,
  onProductClick,
  onMenuClick,
  cartCount,
  onLoginClick,
  onInsightsClick,
  onConsultingListClick,
  onProfileClick,
  onAIChatOpen,
}: ProductListPageProps) {
  const [growthValue, setGrowthValue] = useState(0);
  const [projectValue, setProjectValue] = useState(0);
  const [networkValue, setNetworkValue] = useState(0);

  const animateCount = (target: number, setValue: (value: number) => void) => {
    const durationMs = 700;
    const startTime = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easedProgress = easeOutCubic(progress);
      setValue(Math.round(easedProgress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    animateCount(24, setGrowthValue);
    animateCount(3, setProjectValue);
    animateCount(12, setNetworkValue);
  }, []);
  // Create mock product objects for automation solutions
  const handleAutomationClick = (solution: typeof aiAutomationSolutions[0]) => {
    // Convert automation solution to product format
    const productFormat = {
      ...solution,
      id: solution.id,
      name: solution.name,
      price: solution.price,
      priceValue: solution.priceValue,
      farm: solution.farm,
      images: solution.images,
      isFavorite: solution.isFavorite,
      description: solution.description,
      location: solution.location,
      dietary: solution.dietary
    };
    onProductClick(productFormat);
  };

  return (
    <div className="h-full bg-[#f8fafc] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimalist Executive Header */}
      <div className="absolute inset-x-0 top-[31px] bg-[#051128] pt-4 pb-6 px-5 z-30 w-full">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onMenuClick} className="text-white/90 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
          
          <h1 className="text-white text-[17px] font-bold tracking-wide">
            하우투 경영 컨설팅
          </h1>
          
          <button onClick={onLoginClick} className="relative text-white/90 hover:text-white transition-colors">
            <LogIn className="w-5 h-5" strokeWidth="1.5" />
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-1">
          <div className="flex gap-3">
            <div className="flex flex-1 items-center gap-3 bg-gradient-to-br from-[#0a1e3d] to-[#0f2a52] px-3 py-3 rounded-xl border border-white/10 shadow-[0_6px_18px_rgba(5,17,40,0.25)] min-w-0 h-[64px]">
              <div className="w-1 h-8 bg-[#10b981] rounded-full"></div>
              <div>
                <p className="text-white/70 text-[11px] font-light tracking-wide uppercase">
                  <span className="block">평균매출</span>
                  <span className="block">성장률</span>
                </p>
                <p className="text-[#10b981] text-2xl font-extrabold">
                  +{growthValue}%
                </p>
              </div>
            </div>
            
            <div className="flex flex-1 items-center gap-3 bg-gradient-to-br from-[#0a1e3d] to-[#0f2a52] px-3 py-3 rounded-xl border border-white/10 shadow-[0_6px_18px_rgba(5,17,40,0.25)] min-w-0 h-[64px]">
              <div className="w-1 h-8 bg-[#d4af37] rounded-full"></div>
              <div>
                <p className="text-white/70 text-[11px] font-light tracking-wide uppercase">
                  <span className="block">진행중인</span>
                  <span className="block">프로젝트</span>
                </p>
                <p className="text-[#d4af37] text-2xl font-extrabold">
                  {projectValue}
                </p>
              </div>
            </div>
            
            <div className="flex flex-1 items-center gap-3 bg-gradient-to-br from-[#0a1e3d] to-[#0f2a52] px-3 py-3 rounded-xl border border-white/10 shadow-[0_6px_18px_rgba(5,17,40,0.25)] min-w-0 h-[64px]">
              <div className="w-1 h-8 bg-white/40 rounded-full"></div>
              <div>
                <p className="text-white/70 text-[11px] font-light tracking-wide uppercase">
                  <span className="block">전문가</span>
                  <span className="block">네트워크</span>
                </p>
                <p className="text-[#d4af37] text-2xl font-extrabold">
                  {networkValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-[160px] pb-24 px-5 overflow-y-auto h-full">
        {/* Section Title */}
        <div className="mt-8 pt-6 mb-5">
          <h2 className="text-[#051128] text-[20px] font-bold tracking-tight mb-1">
            전문 컨설팅 서비스
          </h2>
          <p className="text-[#64748b] text-[13px] font-light">
            원장님을 위한 맞춤형 솔루션
          </p>
        </div>

        {/* Professional Service Cards */}
        {isLoading ? (
          <div className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div
                key={`skeleton-${index}`}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(5,17,40,0.04)] animate-pulse"
              >
                <div className="h-[180px] bg-slate-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-10 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : errorMessage ? (
          <div className="bg-white rounded-2xl p-4 text-center text-[#ef4444] text-[12px] font-light shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            {errorMessage}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-[#64748b] text-[12px] font-light shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            아직 등록된 컨설팅 서비스가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => {
              const category = getCategoryInfo(product.dietary);

              return (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(5,17,40,0.04)] hover:shadow-[0_4px_16px_rgba(5,17,40,0.08)] transition-all cursor-pointer"
                >
                  {/* Image with Overlay */}
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    />

                    {/* Subtle Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-1.5 ${category.bgColor} backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20`}>
                        <span className={`text-[10px] font-medium tracking-wide uppercase ${category.color}`}>
                          {category.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content with Ample White Space */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-[#051128] text-[16px] font-bold tracking-tight mb-2 leading-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#64748b] text-[12px] font-light leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Provider with Thin Line Icon */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#e2e8f0]">
                      <Briefcase className="w-3.5 h-3.5 text-[#64748b]" strokeWidth="1.5" />
                      <span className="text-[#64748b] text-[11px] font-light">
                        {product.farm}
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide mb-0.5">컨설팅 비용</p>
                        <p className="text-[#051128] text-[16px] font-bold">
                          {product.price}
                        </p>
                      </div>

                      {/* Sophisticated Text Link Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(product);
                        }}
                        className="text-[#d4af37] text-[12px] font-medium tracking-wide hover:text-[#b8941f] transition-colors flex items-center gap-1.5"
                      >
                        상세보기
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AI Automation Solutions Section */}
        <div className="mt-12 mb-8">
          <div className="mb-5">
            <h2 className="text-[#051128] text-[20px] font-bold tracking-tight mb-1">
              AI 자동화 학원 경영 솔루션
            </h2>
            <p className="text-[#64748b] text-[13px] font-light">
              성장 지표를 달성하기 위한 핵심 도구
            </p>
          </div>

          {/* AI Automation Cards - Same Structure as Consulting Services */}
          <div className="space-y-4">
            {aiAutomationSolutions.map((solution) => {
              const category = getCategoryInfo(solution.dietary);
              
              return (
                <div
                  key={solution.id}
                  onClick={() => handleAutomationClick(solution)}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(5,17,40,0.04)] hover:shadow-[0_4px_16px_rgba(5,17,40,0.08)] transition-all cursor-pointer"
                >
                  {/* Image with Overlay */}
                  <div className="relative h-[180px] overflow-hidden">
                    <img
                      src={solution.images[0]}
                      alt={solution.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(0.85) brightness(0.95)' }}
                    />
                    
                    {/* Subtle Category Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-1.5 ${category.bgColor} backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20`}>
                        <span className={`text-[10px] font-medium tracking-wide uppercase ${category.color}`}>
                          {category.name}
                        </span>
                      </div>
                    </div>

                    {/* Metric Badge - Top Right */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-[#10b981]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                        <span className="text-white text-[10px] font-medium tracking-wide">
                          {solution.metric}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content with Ample White Space */}
                  <div className="p-5">
                    {/* Title */}
                    <h3 className="text-[#051128] text-[16px] font-bold tracking-tight mb-2 leading-tight">
                      {solution.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[#64748b] text-[12px] font-light leading-relaxed mb-4">
                      {solution.description}
                    </p>

                    {/* Provider with Thin Line Icon */}
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#e2e8f0]">
                      <Briefcase className="w-3.5 h-3.5 text-[#64748b]" strokeWidth="1.5" />
                      <span className="text-[#64748b] text-[11px] font-light">
                        {solution.farm}
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#64748b] text-[10px] font-light uppercase tracking-wide mb-0.5">솔루션 비용</p>
                        <p className="text-[#051128] text-[16px] font-bold">
                          {solution.price}
                        </p>
                      </div>
                      
                      {/* Sophisticated Text Link Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAutomationClick(solution);
                        }}
                        className="text-[#d4af37] text-[12px] font-medium tracking-wide hover:text-[#b8941f] transition-colors flex items-center gap-1.5"
                      >
                        상세보기
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Minimalist AI Strategy FAB - Diamond Shape */}
      <button
        onClick={onAIChatOpen}
        aria-label="AI 전략 어시스턴트 열기"
        className="absolute bottom-20 right-5 w-12 h-12 flex items-center justify-center rounded-full hover:scale-105 transition-transform z-50 bg-white shadow-[0_6px_18px_rgba(5,17,40,0.18)]"
      >
        <img
          src={aiIcon}
          alt="AI"
          className="w-10 h-10 rounded-full object-cover"
        />
      </button>

      {/* Simplified Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e2e8f0] flex items-center justify-around px-8">
        <button className="flex flex-col items-center gap-1 text-[#051128]">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" strokeWidth="0">
            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
          </svg>
          <span className="text-[9px] font-medium">홈</span>
        </button>
        
        <button onClick={onInsightsClick} className="flex flex-col items-center gap-1 text-[#64748b]">
          <TrendingUp className="w-5 h-5" strokeWidth="1.5" />
          <span className="text-[9px] font-medium">인사이트</span>
        </button>
        
        <button onClick={onConsultingListClick} className="flex flex-col items-center gap-1 text-[#64748b]">
          <Briefcase className="w-5 h-5" strokeWidth="1.5" />
          <span className="text-[9px] font-medium">상담</span>
        </button>
        
        <button onClick={onProfileClick} className="flex flex-col items-center gap-1 text-[#64748b] relative">
          <Users className="w-5 h-5" strokeWidth="1.5" />
          <span className="text-[9px] font-medium">프로필</span>
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-2 w-4 h-4 bg-[#d4af37] text-[#051128] text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </div>
          )}
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
