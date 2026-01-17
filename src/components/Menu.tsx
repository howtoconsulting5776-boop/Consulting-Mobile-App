import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, TrendingUp, Briefcase, Users, ShoppingBag, Shield, X } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
  isAdmin?: boolean;
}

export default function Menu({ isOpen, onClose, onNavigate, isAdmin = false }: MenuProps) {
  const handleNavigation = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  const menuItems = [
    { label: "홈", screen: "list", icon: Home },
    { label: "인사이트", screen: "newsstand", icon: TrendingUp },
    { label: "회사 소개", screen: "about", icon: Briefcase },
    { label: "내 프로필", screen: "profile", icon: Users },
    { label: "상담 목록", screen: "basket", icon: ShoppingBag },
  ];

  const adminItems = [
    { label: "관리자 대시보드", screen: "adminDashboard", icon: Shield }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 400,
              mass: 0.8
            }}
            className="absolute left-0 top-0 bottom-0 w-[300px] bg-gradient-to-br from-[#051128] to-[#0a1e3d] z-50 overflow-hidden"
            style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}
          >
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Header */}
            <div className="relative px-6 pt-12 pb-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-white text-[18px] font-bold tracking-tight mb-1">
                    하우투 경영 컨설팅
                  </h2>
                  <p className="text-white/50 text-[12px] font-light">
                    전문가의 맞춤형 솔루션
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth="1.5" />
                </button>
              </div>

              {/* Decorative Line */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Menu Items */}
            <div className="relative px-6 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.screen}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavigation(item.screen)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left hover:bg-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-[#d4af37] transition-colors" strokeWidth="1.5" />
                    </div>
                    <span className="text-white text-[15px] font-medium group-hover:text-[#d4af37] transition-colors">
                      {item.label}
                    </span>
                    <svg className="w-4 h-4 text-white/30 ml-auto group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}

              {isAdmin && adminItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.screen}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + index) * 0.05 }}
                    onClick={() => handleNavigation(item.screen)}
                    className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left hover:bg-white/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-[#d4af37] transition-colors" strokeWidth="1.5" />
                    </div>
                    <span className="text-white text-[15px] font-medium group-hover:text-[#d4af37] transition-colors">
                      {item.label}
                    </span>
                    <svg className="w-4 h-4 text-white/30 ml-auto group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Info */}
            <div className="absolute bottom-8 left-6 right-6">
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
                <p className="text-white/50 text-[10px] font-light uppercase tracking-wide mb-2">
                  문의하기
                </p>
                <p className="text-white text-[12px] font-medium mb-1">
                  support@howto-consulting.kr
                </p>
                <p className="text-white/70 text-[11px] font-light">
                  평일 09:00 - 18:00
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
