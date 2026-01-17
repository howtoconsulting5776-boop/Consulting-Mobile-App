import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, MapPin } from 'lucide-react';
import { Input } from './ui/input';

interface CheckoutPageProps {
  cartCount: number;
  customerInfo: CustomerInfo;
  onBack: () => void;
  onMenuClick: () => void;
  onProceedToPayment: (customerInfo: CustomerInfo) => void;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

// Zip code validation function
function validateZipCode(zipCode: string, country: string): boolean {
  if (!zipCode.trim()) return false;
  
  switch (country) {
    case '대한민국':
      // Korea: 5 digits
      return /^\d{5}$/.test(zipCode.trim());
    
    case '미국':
      // US: 5 digits or 5+4 format (12345 or 12345-6789)
      return /^(\d{5}|\d{5}-\d{4})$/.test(zipCode.trim());
    
    case '캐나다':
      // Canada: A1A 1A1 format
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(zipCode.trim());
    
    case '영국':
      // UK: Various formats like SW1A 1AA, M1 1AA, etc.
      return /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/.test(zipCode.trim());
    
    case '독일':
    case '프랑스':
      // Germany/France: 5 digits
      return /^\d{5}$/.test(zipCode.trim());
    
    case '호주':
      // Australia: 4 digits
      return /^\d{4}$/.test(zipCode.trim());
    
    case '일본':
      // Japan: 7 digits with optional hyphen (123-4567 or 1234567)
      return /^(\d{3}-?\d{4})$/.test(zipCode.trim());
    
    default:
      // For other countries, accept any non-empty alphanumeric string of 3-10 characters
      return /^[A-Za-z0-9\s-]{3,10}$/.test(zipCode.trim());
  }
}

export default function CheckoutPage({ 
  cartCount, 
  customerInfo, 
  onBack, 
  onMenuClick, 
  onProceedToPayment 
}: CheckoutPageProps) {
  const [formData, setFormData] = useState<CustomerInfo>(customerInfo);
  const [zipCodeTouched, setZipCodeTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Update form data when customerInfo prop changes
  useEffect(() => {
    setFormData(customerInfo);
  }, [customerInfo]);

  // Check if zip code is valid
  const isZipCodeValid = validateZipCode(formData.zipCode, formData.country);
  const showZipCodeError = zipCodeTouched && formData.zipCode.trim() !== '' && !isZipCodeValid;

  // Check if all required fields are filled and valid
  const phoneDigits = formData.city.replace(/\D/g, '');
  const isPhoneValid = /^010\d{8}$/.test(phoneDigits);
  const showPhoneError = phoneTouched && formData.city.trim() !== '' && !isPhoneValid;

  const isFormValid = formData.fullName.trim() !== '' &&
                     formData.address.trim() !== '' &&
                     formData.city.trim() !== '' &&
                     isPhoneValid &&
                     formData.country !== '' &&
                     (formData.country === '미국' ? formData.state !== '' : true) &&
                     formData.zipCode.trim() !== '' &&
                     isZipCodeValid;

  const updateFormField = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormField('zipCode', e.target.value);
    setZipCodeTouched(true);
  };

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormField('city', formatPhoneNumber(e.target.value));
    setPhoneTouched(true);
  };

  const handleProceedToPayment = () => {
    if (isFormValid) {
      onProceedToPayment(formData);
    }
  };

  const getZipCodePlaceholder = (country: string): string => {
    switch (country) {
      case '대한민국':
        return '우편번호 입력 (예: 12345)';
      case '미국':
        return '우편번호 입력 (예: 12345 또는 12345-6789)';
      case '캐나다':
        return '우편번호 입력 (예: A1A 1A1)';
      case '영국':
        return '우편번호 입력 (예: SW1A 1AA)';
      case '독일':
      case '프랑스':
        return '우편번호 입력 (5자리 숫자)';
      case '호주':
        return '우편번호 입력 (4자리 숫자)';
      case '일본':
        return '우편번호 입력 (예: 123-4567)';
      default:
        return '우편번호 입력';
    }
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
            상담 신청 정보
          </h1>
          
          <div className="w-9"></div>
        </div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-2">
          {/* Step 1 - Active */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
              <span className="text-[#051128] text-[13px] font-bold">1</span>
            </div>
            <div className="w-12 h-px bg-white/20"></div>
          </div>

          {/* Step 2 - Inactive */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white/50 text-[13px] font-bold">2</span>
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
            연락처 정보
          </h2>
          <p className="text-[#64748b] text-[13px] font-light">
            상담을 위한 정보를 입력해주세요
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
              </div>
              <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
                담당자 성함
              </label>
            </div>
            <Input
              value={formData.fullName}
              onChange={(e) => updateFormField('fullName', e.target.value)}
              placeholder="성함을 입력해주세요"
              className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
            />
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
              </div>
              <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
                학원 주소
              </label>
            </div>
            <Input
              value={formData.address}
              onChange={(e) => updateFormField('address', e.target.value)}
              placeholder="상세 주소를 입력해주세요"
              className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
            />
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
              휴대폰 번호
            </label>
            <Input
              value={formData.city}
              onChange={handlePhoneChange}
              type="tel"
              inputMode="numeric"
              placeholder="휴대폰 번호를 입력해주세요"
              className={`bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl ${
                showPhoneError ? 'ring-2 ring-red-500' : ''
              }`}
            />
            <p className="mt-2 text-[#94a3b8] text-[11px] font-light">
              예: 010-1234-5678
            </p>
            {showPhoneError && (
              <p className="mt-2 text-red-500 text-[11px] font-light">
                010으로 시작하는 11자리 번호를 입력해주세요
              </p>
            )}
          </div>


          {/* Zip Code */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
              우편번호
            </label>
            <Input
              value={formData.zipCode}
              onChange={handleZipCodeChange}
              placeholder={getZipCodePlaceholder(formData.country)}
              className={`bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl ${
                showZipCodeError ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {showZipCodeError && (
              <p className="mt-2 text-red-500 text-[11px] font-light">
                올바른 우편번호 형식을 입력해주세요
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <button
          onClick={handleProceedToPayment}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-medium text-[14px] tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white'
              : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
          }`}
        >
          다음 단계로
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
