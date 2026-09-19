/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { RomanticIntro } from './components/RomanticIntro';
import { FlowerContainer } from './components/FlowerContainer';
import { InteractiveHeartBursts } from './components/InteractiveHeartBursts';
import { RomanticAudioControl } from './components/RomanticAudioControl';
import { PersonalizeModal } from './components/PersonalizeModal';
import type { AnimationStage } from './types';

export default function App() {
  const [stage, setStage] = useState<AnimationStage>('intro');
  const [key, setKey] = useState(0);
  const [recipientName, setRecipientName] = useState<string>('');
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);

  // Read URL params on initial mount (?to=Name or ?name=Name)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('to') || params.get('name') || '';
      if (name) {
        setRecipientName(name);
      }
    } catch {
      // Ignore if unavailable
    }
  }, []);

  // Automatically advance after I LOVE YOU intro
  useEffect(() => {
    if (stage === 'intro') {
      const timer = setTimeout(() => {
        setStage('transition');
      }, 4200);

      return () => clearTimeout(timer);
    }
  }, [stage, key]);

  const handleIntroComplete = useCallback(() => {
    setStage('flowers');
  }, []);

  const handleReplay = useCallback(() => {
    setStage('intro');
    setKey((prev) => prev + 1);
  }, []);

  const handleSaveName = useCallback((name: string) => {
    setRecipientName(name);
    setStage('intro');
    setKey((prev) => prev + 1);
  }, []);

  return (
    <main
      id="romantic-app-root"
      className="relative min-h-screen w-full overflow-hidden bg-[#010113] text-white"
    >
      {/* Interactive Heart Bursts on Click/Tap */}
      <InteractiveHeartBursts />

      {/* Subtle Romantic Audio Synthesizer Toggle */}
      <RomanticAudioControl />

      {/* Flower Animation Viewport */}
      <FlowerContainer
        key={`flower-${key}`}
        isActive={stage === 'transition' || stage === 'flowers'}
        replayKey={key}
        recipientName={recipientName}
        onReplay={handleReplay}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
      />

      {/* Full-Screen "I LOVE YOU" Experience */}
      <RomanticIntro
        key={`intro-${key}`}
        isVisible={stage === 'intro'}
        recipientName={recipientName}
        onComplete={handleIntroComplete}
        onAdvance={() => setStage('transition')}
      />

      {/* Personalize Link Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        currentName={recipientName}
        onClose={() => setIsPersonalizeOpen(false)}
        onSaveName={handleSaveName}
      />
    </main>
  );
}

