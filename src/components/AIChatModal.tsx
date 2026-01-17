import React, { useMemo, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface IChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

interface IAIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferStrategy: (insight: string) => void;
}

export default function AIChatModal({ isOpen, onClose, onTransferStrategy }: IAIChatModalProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const assistantResponse = useMemo(
    () =>
      '원장님, 최근 성장 지표와 운영 리소스를 종합 분석했을 때 마케팅 자동화 도입을 우선 검토하시는 것을 권장드립니다. 상담 유입률 개선과 재등록률 안정화에 동시에 기여할 수 있습니다.',
    []
  );

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    const newMessage: IChatMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: IChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: assistantResponse
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleDownloadPDF = async () => {
    setToastMessage('전략 리포트를 PDF로 생성하고 있습니다.');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setToastMessage('전략 리포트가 PDF로 생성되었습니다.');
    setTimeout(() => setToastMessage(''), 1600);
  };

  const handleTransferToConsulting = (insight: string) => {
    onTransferStrategy(insight);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-white">
      <div className="h-[31px] bg-[#051128]"></div>

      <div className="bg-[#051128] px-5 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white text-[16px] font-semibold tracking-tight">
            AI 전략 어시스턴트
          </h2>
          <p className="text-white/60 text-[11px] font-light">
            경영 고민을 빠르게 정리해 드립니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPDF}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <Download className="w-4 h-4" strokeWidth="1.5" />
          </button>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" strokeWidth="1.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-white">
        {toastMessage && (
          <div className="bg-[#051128]/10 border border-[#051128]/20 rounded-xl px-4 py-2 text-[#051128] text-[12px] font-medium">
            {toastMessage}
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 text-[#64748b] text-[12px] font-light">
            원장님의 고민을 입력하면 AI가 맞춤형 전략을 제안합니다.
          </div>
        )}

        {messages.map(message => (
          <div key={message.id} className={message.role === 'user' ? 'ml-auto' : 'mr-auto'}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                message.role === 'user'
                  ? 'bg-[#051128] text-white ml-auto'
                  : 'bg-[#f1f5f9] text-[#0f172a] mr-auto'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'assistant' && (
              <button
                type="button"
                onClick={() => handleTransferToConsulting(message.content)}
                className="mt-2 px-3 py-2 rounded-lg border border-[#d4af37] text-[#b45309] text-[11px] font-medium hover:bg-[#d4af37]/10 transition-colors"
              >
                이 전략으로 상담 신청하기
              </button>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="max-w-[70%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed bg-[#f1f5f9] text-[#0f172a] mr-auto">
            전략 인사이트를 정리하고 있습니다. 잠시만 기다려 주세요.
          </div>
        )}
      </div>

      <div className="border-t border-[#e2e8f0] bg-white/95 backdrop-blur-xl px-5 py-4">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="경영 고민을 입력하세요..."
            className="bg-[#f8fafc] border-0 px-4 py-3 text-[#051128] text-[14px] font-medium rounded-xl"
          />
          <Button
            type="button"
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-[#051128] text-white hover:bg-[#0a1e3d] px-4"
          >
            전송
          </Button>
        </div>
      </div>
    </div>
  );
}
