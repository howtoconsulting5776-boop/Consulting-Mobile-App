import React from 'react';
import { ArrowLeft, Construction, User } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
  onMenuClick: () => void;
  cartCount: number;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string } | null;
  onLoginClick?: () => void;
}

const getTitleKorean = (title: string): string => {
  const titleMap: { [key: string]: string } = {
    'Newsstand': '인사이트',
    'Who we are': '회사 소개',
    'My Profile': '내 프로필'
  };
  return titleMap[title] || title;
};

export default function PlaceholderPage({
  title,
  onBack,
  onMenuClick,
  cartCount,
  isLoggedIn = false,
  currentUser = null,
  onLoginClick
}: PlaceholderPageProps) {
  const koreanTitle = getTitleKorean(title);
  const isProfilePage = koreanTitle === '내 프로필' || title.toLowerCase().includes('profile');

  return (
    <div className="h-full bg-[#f8fafc] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      {/* Status Bar Spacer */}
      <div className="h-[31px] bg-[#051128]"></div>

      {/* Minimal Header */}
      <div className="absolute top-[31px] inset-x-0 z-30 bg-[#051128] pt-4 pb-6 px-5 w-full">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth="1.5" />
          </button>
          
          <h1 className="text-white text-[15px] font-light tracking-wide">
            {koreanTitle}
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
      <div className="pt-[120px] px-5 flex items-start justify-center h-full">
        {isProfilePage ? (
          <div className="w-full max-w-[320px] mt-4">
            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_24px_rgba(5,17,40,0.08)] border border-[#e2e8f0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#f8fafc] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <div>
                  <h2 className="text-[#051128] text-[18px] font-bold tracking-tight">
                    내 프로필
                  </h2>
                  <p className="text-[#64748b] text-[12px] font-light">
                    계정 상태를 확인하세요.
                  </p>
                </div>
              </div>

              {isLoggedIn && currentUser ? (
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4">
                  <div className="space-y-2 text-[12px] text-[#64748b]">
                    <div className="flex items-center justify-between">
                      <span>이름</span>
                      <span className="text-[#051128] font-medium">{currentUser.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>이메일</span>
                      <span className="text-[#051128] font-medium">{currentUser.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>상태</span>
                      <span className="text-[#051128] font-medium">로그인됨</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-[#64748b] text-[12px] font-light mb-4">
                    로그인 후 내 프로필과 상담 신청 내역을 확인할 수 있습니다.
                  </p>
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white py-3 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all"
                  >
                    로그인하러 가기
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center max-w-[280px]">
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-[#051128] to-[#0a1e3d] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Construction className="w-12 h-12 text-[#d4af37]" strokeWidth="1.5" />
            </div>

            {/* Title */}
            <h2 className="text-[#051128] text-[22px] font-bold tracking-tight mb-3">
              {koreanTitle}
            </h2>

            {/* Description */}
            <p className="text-[#64748b] text-[14px] font-light leading-relaxed mb-6">
              이 페이지는 곧 제공될 예정입니다.<br />
              더 나은 서비스를 준비하고 있습니다.
            </p>

            {/* Decorative Elements */}
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-[#051128] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <button
          onClick={onBack}
          className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth="2" />
          홈으로 돌아가기
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
