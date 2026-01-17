import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface IAuthFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IAuthErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface IAuthPageProps {
  mode: 'login' | 'signup';
  formData: IAuthFormData;
  errors: IAuthErrors;
  onFieldChange: (field: keyof IAuthFormData, value: string) => void;
  onSubmit: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
  onBack: () => void;
  onMenuClick: () => void;
}

export default function AuthPage({
  mode,
  formData,
  errors,
  onFieldChange,
  onSubmit,
  onSwitchMode,
  onBack,
  onMenuClick
}: IAuthPageProps) {
  return (
    <div className="h-full bg-[#f8fafc] relative" style={{ fontFamily: 'Inter, Public Sans, -apple-system, sans-serif' }}>
      <div className="h-[31px] bg-[#051128]"></div>

      <div className="absolute top-[31px] inset-x-0 z-30 bg-[#051128] pt-4 pb-6 px-5 w-full">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth="1.5" />
          </button>

          <h1 className="text-white text-[15px] font-light tracking-wide">
            {mode === 'login' ? '로그인' : '회원가입'}
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

      <div className="pt-[120px] px-5 flex items-start justify-center h-full">
        <div className="w-full max-w-[320px] mt-4">
          <div className="bg-gradient-to-br from-[#051128] to-[#0a1e3d] rounded-2xl p-5 shadow-[0_12px_28px_rgba(5,17,40,0.18)] border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-[20px] font-bold tracking-tight mb-1">
                  {mode === 'login' ? '로그인' : '회원가입'}
                </h2>
                <p className="text-white/60 text-[12px] font-light">
                  하우투 경영 컨설팅 전용 포털
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1 mb-5">
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className={`flex-1 py-2 text-[12px] rounded-lg transition-colors ${
                  mode === 'login'
                    ? 'bg-white text-[#051128]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                로그인
              </button>
              <button
                type="button"
                onClick={() => onSwitchMode('signup')}
                className={`flex-1 py-2 text-[12px] rounded-lg transition-colors ${
                  mode === 'signup'
                    ? 'bg-white text-[#051128]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                회원가입
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="space-y-3"
            >
              {mode === 'signup' && (
                <div>
                  <label className="text-white/60 text-[11px] font-light uppercase tracking-wide mb-2 block">
                    담당자 이름
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => onFieldChange('name', e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="bg-white/10 border border-white/10 px-4 py-3 w-full text-white text-[14px] font-medium rounded-xl placeholder:text-white/40"
                  />
                  {errors.name && (
                    <p className="text-[#fca5a5] text-[11px] mt-2">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="text-white/60 text-[11px] font-light uppercase tracking-wide mb-2 block">
                  이메일
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  placeholder="you@academy.com"
                  className="bg-white/10 border border-white/10 px-4 py-3 w-full text-white text-[14px] font-medium rounded-xl placeholder:text-white/40"
                />
                {errors.email && (
                  <p className="text-[#fca5a5] text-[11px] mt-2">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-white/60 text-[11px] font-light uppercase tracking-wide mb-2 block">
                  비밀번호
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => onFieldChange('password', e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="bg-white/10 border border-white/10 px-4 py-3 w-full text-white text-[14px] font-medium rounded-xl placeholder:text-white/40"
                />
                {errors.password && (
                  <p className="text-[#fca5a5] text-[11px] mt-2">{errors.password}</p>
                )}
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-white/60 text-[11px] font-light uppercase tracking-wide mb-2 block">
                    비밀번호 확인
                  </label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                    placeholder="비밀번호를 다시 입력하세요"
                    className="bg-white/10 border border-white/10 px-4 py-3 w-full text-white text-[14px] font-medium rounded-xl placeholder:text-white/40"
                  />
                  {errors.confirmPassword && (
                    <p className="text-[#fca5a5] text-[11px] mt-2">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full bg-[#d4af37] text-[#051128] hover:bg-[#c79e2f]">
                {mode === 'login' ? '로그인하기' : '회원가입 완료'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
