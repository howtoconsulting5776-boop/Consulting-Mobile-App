import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, ClipboardList } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface IConsultingService {
  id: number;
  name: string;
  price: string;
  farm: string;
}

interface IConsultingFormData {
  academyName: string;
  contactNumber: string;
  preferredDate: string;
  inquiry: string;
}

interface IConsultingFormErrors {
  academyName?: string;
  contactNumber?: string;
  preferredDate?: string;
  inquiry?: string;
}

interface IConsultingFormProps {
  selectedService: IConsultingService | null;
  applicantName: string;
  aiInsights: string;
  formData: IConsultingFormData;
  errors: IConsultingFormErrors;
  isSubmitted: boolean;
  onFieldChange: (field: keyof IConsultingFormData, value: string) => void;
  onSubmit: () => boolean;
  onComplete: () => void;
  onBack: () => void;
  onMenuClick: () => void;
}

export default function ConsultingForm({
  selectedService,
  applicantName,
  aiInsights,
  formData,
  errors,
  isSubmitted,
  onFieldChange,
  onSubmit,
  onComplete,
  onBack,
  onMenuClick
}: IConsultingFormProps) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSendConfirmationEmail = async () => {
    const emailPayload = {
      serviceName: selectedService?.name || '컨설팅 서비스',
      applicantName,
      preferredDate: formData.preferredDate
    };

    try {
      setIsSendingEmail(true);
      setEmailError('');
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true, payload: emailPayload };
    } catch (error) {
      setEmailError('확인 이메일 발송에 실패했습니다. 다시 시도해주세요.');
      return { success: false };
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleRequestSubmit = async () => {
    if (isSendingEmail) return;
    const isValid = onSubmit();
    if (!isValid) return;

    const emailResult = await handleSendConfirmationEmail();
    if (emailResult.success) {
      onComplete();
    }
  };

  useEffect(() => {
    if (aiInsights && !formData.inquiry.trim()) {
      onFieldChange('inquiry', aiInsights);
    }
  }, [aiInsights, formData.inquiry, onFieldChange]);
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
            상담 신청
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

      <div className="pt-[120px] pb-28 px-5 overflow-y-auto h-full space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)] border border-[#e2e8f0]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
            </div>
            <p className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
              선택한 서비스
            </p>
          </div>
          {selectedService ? (
            <div>
              <p className="text-[#051128] text-[15px] font-semibold">{selectedService.name}</p>
              <p className="text-[#64748b] text-[12px] font-light mt-1">{selectedService.farm}</p>
              <p className="text-[#051128] text-[14px] font-bold mt-2">{selectedService.price}</p>
            </div>
          ) : (
            <p className="text-[#94a3b8] text-[12px] font-light">
              선택된 서비스가 없습니다.
            </p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
          <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
            학원명
          </label>
          <Input
            value={formData.academyName}
            onChange={(e) => onFieldChange('academyName', e.target.value)}
            placeholder="학원명을 입력해주세요"
            className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
          />
          {errors.academyName && (
            <p className="mt-2 text-red-500 text-[11px] font-light">{errors.academyName}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
          <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
            연락처
          </label>
          <Input
            value={formData.contactNumber}
            onChange={(e) => onFieldChange('contactNumber', e.target.value)}
            placeholder="연락처를 입력해주세요"
            className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
          />
          {errors.contactNumber && (
            <p className="mt-2 text-red-500 text-[11px] font-light">{errors.contactNumber}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#f8fafc] rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#64748b]" strokeWidth="1.5" />
            </div>
            <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide">
              희망 상담 일자
            </label>
          </div>
          <Input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => onFieldChange('preferredDate', e.target.value)}
            className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl"
          />
          {errors.preferredDate && (
            <p className="mt-2 text-red-500 text-[11px] font-light">{errors.preferredDate}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
          <label className="text-[#64748b] text-[11px] font-light uppercase tracking-wide mb-3 block">
            문의 사항
          </label>
          <textarea
            value={formData.inquiry}
            onChange={(e) => onFieldChange('inquiry', e.target.value)}
            placeholder="문의 사항을 입력해주세요"
            className="bg-[#f8fafc] border-0 px-4 py-3 w-full text-[#051128] text-[14px] font-medium rounded-xl min-h-[120px] resize-none"
          />
          {errors.inquiry && (
            <p className="mt-2 text-red-500 text-[11px] font-light">{errors.inquiry}</p>
          )}
        </div>

        {isSubmitted && (
          <div className="bg-[#10b981]/10 border border-[#10b981]/30 rounded-xl p-4 text-[#0f766e] text-[12px] font-medium">
            신청이 완료되었습니다. 담당 컨설턴트가 곧 연락드립니다.
          </div>
        )}

        {emailError && (
          <div className="bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-xl p-4 text-[#b91c1c] text-[12px] font-medium">
            {emailError}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl px-5 py-4 border-t border-[#e2e8f0]">
        <Button
          type="button"
          onClick={handleRequestSubmit}
          className="w-full bg-gradient-to-r from-[#051128] to-[#0a1e3d] hover:from-[#0a1e3d] hover:to-[#051128] text-white"
        >
          {isSendingEmail ? '확인 이메일 발송 중...' : '상담 신청 완료'}
        </Button>
      </div>
    </div>
  );
}
