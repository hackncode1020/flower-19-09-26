import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FlowerContainerProps {
  isActive: boolean;
  recipientName?: string;
  replayKey?: number;
  onReplay?: () => void;
  onOpenPersonalize?: () => void;
}

export const FlowerContainer: React.FC<FlowerContainerProps> = ({
  isActive,
  recipientName,
  replayKey = 0,
  onReplay,
  onOpenPersonalize,
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Show subtle corner actions after blooming starts
      const timer = setTimeout(() => {
        setShowControls(true);
      }, 5500);
      return () => clearTimeout(timer);
    } else {
      setIframeLoaded(false);
      setShowControls(false);
    }
  }, [isActive, replayKey]);

  const iframeSrc = recipientName
    ? `/flower/index.html?to=${encodeURIComponent(recipientName)}`
    : '/flower/index.html';

  return (
    <div
      id="flower-viewport-container"
      className="fixed inset-0 z-20 h-full w-full overflow-hidden bg-[#010113]"
    >
      {isActive && (
        <motion.div
          id="flower-frame-wrapper"
          key={replayKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: iframeLoaded ? 1 : 0.4 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="relative h-full w-full"
        >
          {/* Exact user-provided flower animation iframe with loader, message, and floating bubbles */}
          <iframe
            key={replayKey}
            id="original-flower-frame"
            src={iframeSrc}
            title="Blossoming Flowers Animation"
            className="h-full w-full border-0 bg-[#010113]"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              border: 'none',
              overflow: 'hidden',
            }}
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Discreet Top Right Actions: Replay & Personalize */}
          {showControls && (
            <motion.div
              id="top-floating-controls"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute top-4 right-4 z-40 flex items-center gap-2"
            >
              {onOpenPersonalize && (
                <button
                  id="personalize-btn"
                  onClick={onOpenPersonalize}
                  className="group flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-black/60 px-3 py-1.5 text-xs text-rose-200/70 backdrop-blur-md transition-all duration-300 hover:border-rose-400/40 hover:bg-black/80 hover:text-rose-200"
                  title="Personalize for someone special"
                >
                  <Sparkles className="h-3 w-3 text-rose-400 group-hover:rotate-12 transition-transform" />
                  <span className="hidden sm:inline">Dedicate</span>
                </button>
              )}

              {onReplay && (
                <button
                  id="replay-surprise-button"
                  onClick={onReplay}
                  className="group flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-black/60 px-3 py-1.5 text-xs text-rose-200/70 backdrop-blur-md transition-all duration-300 hover:border-rose-400/40 hover:bg-black/80 hover:text-rose-200"
                  title="Replay surprise animation"
                >
                  <RotateCcw className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-180 text-rose-400" />
                  <span>Replay</span>
                </button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};


