import React, { useState } from 'react';
import { Sparkles, X, Check, Copy } from 'lucide-react';

interface PersonalizeModalProps {
  currentName: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveName: (name: string) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  currentName,
  isOpen,
  onClose,
  onSaveName,
}) => {
  const [nameInput, setNameInput] = useState(currentName);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    if (nameInput.trim()) {
      url.searchParams.set('to', nameInput.trim());
    } else {
      url.searchParams.delete('to');
    }
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    onSaveName(nameInput.trim());
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveName(nameInput.trim());
    const url = new URL(window.location.href);
    if (nameInput.trim()) {
      url.searchParams.set('to', nameInput.trim());
    } else {
      url.searchParams.delete('to');
    }
    window.history.replaceState({}, '', url.toString());
    onClose();
  };

  return (
    <div
      id="personalize-dialog-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="personalize-dialog-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl border border-rose-500/20 bg-neutral-950 p-6 shadow-2xl text-left"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-300/60 hover:text-rose-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-rose-400 mb-2">
          <Sparkles className="h-4 w-4" />
          <h3 className="font-['Cinzel',serif] text-sm font-semibold tracking-wider uppercase text-rose-200">
            Personalize for Your Love
          </h3>
        </div>

        <p className="text-xs text-rose-200/70 mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
          Add their name or nickname to appear in the romantic opening animation.
        </p>

        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label
              htmlFor="partner-name-input"
              className="block text-[11px] font-medium tracking-wide uppercase text-rose-300/80 mb-1.5"
            >
              Partner&apos;s Name
            </label>
            <input
              id="partner-name-input"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. My Love, Sophia, Alex..."
              maxLength={28}
              className="w-full rounded-lg border border-rose-500/30 bg-black/50 px-3.5 py-2 text-sm text-white placeholder-rose-200/30 focus:border-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-400"
              autoFocus
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-950/40 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-rose-900/40 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied link!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Gift Link</span>
                </>
              )}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-500 transition-colors shadow-[0_0_15px_rgba(225,29,72,0.4)]"
            >
              Preview Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
