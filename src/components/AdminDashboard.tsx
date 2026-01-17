import React, { useState } from 'react';
import { ArrowLeft, ClipboardList, Eye } from 'lucide-react';
import { Button } from './ui/button';

interface IConsultingRequest {
  id: string;
  serviceName: string;
  applicantName: string;
  academyName: string;
  contactNumber: string;
  preferredDate: string;
  inquiry: string;
  status: '대기' | '상담완료';
}

interface IAdminDashboardProps {
  requests: IConsultingRequest[];
  onStatusChange: (id: string, status: '대기' | '상담완료') => void;
  isLoading?: boolean;
  errorMessage?: string;
  onBack: () => void;
  onMenuClick: () => void;
}

export default function AdminDashboard({
  requests,
  onStatusChange,
  isLoading = false,
  errorMessage,
  onBack,
  onMenuClick
}: IAdminDashboardProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleDetail = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleToggleStatus = (request: IConsultingRequest) => {
    const nextStatus = request.status === '대기' ? '상담완료' : '대기';
    onStatusChange(request.id, nextStatus);
  };

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
            관리자 대시보드
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
        <div className="bg-gradient-to-br from-[#051128] to-[#0a1e3d] rounded-2xl p-5 text-white shadow-[0_10px_26px_rgba(5,17,40,0.18)]">
          <p className="text-white/60 text-[11px] uppercase tracking-wide mb-2">
            신청 요약
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-[#d4af37]" strokeWidth="1.5" />
            </div>
            <div>
              <p className="text-[20px] font-bold">{requests.length}</p>
              <p className="text-white/70 text-[12px] font-light">총 상담 신청</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl p-6 text-center text-[#64748b] text-[12px] font-light shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            상담 요청을 불러오는 중입니다...
          </div>
        ) : errorMessage ? (
          <div className="bg-white rounded-2xl p-6 text-center text-[#ef4444] text-[12px] font-light shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            {errorMessage}
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center text-[#64748b] text-[12px] font-light shadow-[0_2px_8px_rgba(5,17,40,0.04)]">
            아직 접수된 상담 신청이 없습니다.
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(5,17,40,0.04)] border border-[#e2e8f0]"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[#051128] text-[14px] font-semibold">
                    {request.serviceName}
                  </p>
                  <p className="text-[#64748b] text-[11px] font-light">
                    {request.applicantName} · {request.academyName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(request)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${
                    request.status === '대기'
                      ? 'bg-[#d4af37]/15 text-[#b45309]'
                      : 'bg-[#10b981]/15 text-[#0f766e]'
                  }`}
                >
                  {request.status}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                <span>희망일: {request.preferredDate}</span>
                <button
                  type="button"
                  onClick={() => handleToggleDetail(request.id)}
                  className="flex items-center gap-1 text-[#051128] font-medium"
                >
                  <Eye className="w-3 h-3" />
                  상세 보기
                </button>
              </div>

              {expandedId === request.id && (
                <div className="mt-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3 text-[12px] text-[#64748b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span>연락처</span>
                    <span className="text-[#051128] font-medium">{request.contactNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>이메일/담당자</span>
                    <span className="text-[#051128] font-medium">{request.applicantName}</span>
                  </div>
                  <div>
                    <p className="text-[#64748b] text-[11px] font-light mb-1">문의 사항</p>
                    <p className="text-[#051128] text-[12px] font-medium leading-relaxed">
                      {request.inquiry}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-[#e2e8f0] text-[#051128]"
                    onClick={() => handleToggleDetail(request.id)}
                  >
                    닫기
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
