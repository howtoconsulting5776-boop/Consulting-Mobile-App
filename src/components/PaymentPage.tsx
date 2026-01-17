import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Calendar, Lock } from 'lucide-react';
import { Input } from './ui/input';

interface PaymentPageProps {
  cartCount: number;
  onBack: () => void;
  onMenuClick: () => void;
  onProceedToConfirmation: () => void;
}

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  ccv: string;
  cardholderName: string;
}

export default function PaymentPage({ 
  cartCount, 
  onBack, 
  onMenuClick, 
  onProceedToConfirmation 
}: PaymentPageProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    ccv: '',
    cardholderName: ''
  });

  // Check if all required fields are filled
  const isFormValid = formData.cardNumber.replace(/\s/g, '').length === 16 &&
                     formData.expiryDate.length === 5 &&
                     formData.ccv.length >= 3 &&
                     formData.cardholderName.trim() !== '';

  const updateFormField = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    updateFormField('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    updateFormField('expiryDate', formatted);
  };

  const handleCcvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 4 characters
    const digits = e.target.value.replace(/\D/g, '').substring(0, 4);
    updateFormField('ccv', digits);
  };

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
            결제 정보
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

          {/* Step 2 - Active */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
              <span className="text-[#051128] text-[13px] font-bold">2</span>
            </div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>

          {/* Step 3 - Inactive */}
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white/50 text-[13px] font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-[120px] pb-28 px-5 overflow-y-auto h-full">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-[#051128] text-[20px] font-bold tracking-tight mb-2">
            결제 수단
          </h2>
          <p className="text-[#64748b] text-[13px] font-light">
            안전한 결제를 위한 카드 정보를 입력해주세요
          </p>
        </div>

        {/* Card Visual Preview */}
        <div className="bg-gradient-to-br from-[#051128] to-[#0a1e3d] rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <div className="w-12 h-10 bg-gradient-to-br from-[#d4af37] to-[#b8941f] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#051128]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125v-2.25zM3.75 11.625c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125H5.625c-.621 0-1.125-.504-1.125-1.125v-5.25z" />
              </svg>
            </div>
            <Lock className="w-5 h-5 text-white/30" strokeWidth="1.5" />
          </div>
          
          <p className="text-white/90 text-[18px] font-mono tracking-wider mb-6 h-7">
            {formData.cardNumber || '•••• •••• •••• ••••'}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[9px] font-light uppercase tracking-wide mb-1">카드 소유자</p>
              <p className="text-white/90 text-[13px] font-medium">
                {formData.cardholderName || '이름을 입력하세요'}
              </p>
            </div>
            <div>
              <p className="text-white/50 text-[9px] font-light uppercase tracking-wide mb-1 text-right">유효기간</p>
              <p className="text-white/90 text-[13px] font-medium">
                {formData.expiryDate || 'MM/YY'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Cardholder Name */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
              </div>
              <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
                카드 소유자 이름
              </label>
            </div>
            <Input
              value={formData.cardholderName}
              onChange={(e) => updateFormField('cardholderName', e.target.value)}
              placeholder="카드에 기재된 이름을 입력해주세요"
              className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
            />
          </div>

          {/* Card Number */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
              카드 번호
            </label>
            <Input
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl font-mono tracking-wider"
            />
          </div>

          {/* Expiry Date and CCV */}
          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <label className="text-[#64748b] text-[10px] font-light uppercase tracking-wide">
                  유효기간
                </label>
              </div>
              <Input
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                placeholder="MM/YY"
                maxLength={5}
                className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
              />
            </div>

            {/* CCV */}
            <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 text-[#64748b]" strokeWidth="1.5" />
                </div>
                <label className="text-[#64748b] text-[10px] font-light uppercase tracking-wide">
                  CVC/CVV
                </label>
              </div>
              <Input
                value={formData.ccv}
                onChange={handleCcvChange}
                placeholder="123"
                maxLength={4}
                type="password"
                className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl p-4 flex items-start gap-3">
            <div className="w-5 h-5 bg-[#10b981]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lock className="w-3 h-3 text-[#10b981]" strokeWidth="2" />
            </div>
            <div>
              <p className="text-[#051128] text-[12px] font-semibold mb-1">
                안전한 결제 보장
              </p>
              <p className="text-[#64748b] text-[11px] font-light leading-relaxed">
                모든 결제 정보는 암호화되어 안전하게 처리됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <button
          onClick={onProceedToConfirmation}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white'
              : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
          }`}
        >
          최종 확인하기
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
