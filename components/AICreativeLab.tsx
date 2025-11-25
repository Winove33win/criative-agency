import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, BrainCircuit, Loader2, Image as ImageIcon, Zap } from 'lucide-react';
import { generateAgencyAsset, generateStrategicCampaign } from '../services/geminiService';

const AICreativeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'strategy'>('image');
  
  // Image State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Strategy State
  const [strategyBrief, setStrategyBrief] = useState('');
  const [generatedStrategy, setGeneratedStrategy] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const handleImageGen = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    setGeneratedImage(null);
    try {
      const img = await generateAgencyAsset(imagePrompt, imageSize);
      setGeneratedImage(img);
    } catch (e) {
      alert("Failed to generate asset. Check console.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleStrategyGen = async () => {
    if (!strategyBrief) return;
    setIsThinking(true);
    setGeneratedStrategy(null);
    try {
      const strategy = await generateStrategicCampaign(strategyBrief);
      setGeneratedStrategy(strategy);
    } catch (e) {
      alert("Strategy computation failed. Check console.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden" id="ai-lab">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
            Offline Demo
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Creative Lab</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Experience our internal tools with mock generators. Visuals and strategies are created locally so the experience works
            without API keys.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('image')}
              className={`flex-1 py-6 flex items-center justify-center gap-2 text-lg font-medium transition-colors ${
                activeTab === 'image' 
                  ? 'bg-zinc-800/50 text-cyan-400 border-b-2 border-cyan-400' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Asset Generator (Nano Banana Pro)
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`flex-1 py-6 flex items-center justify-center gap-2 text-lg font-medium transition-colors ${
                activeTab === 'strategy' 
                  ? 'bg-zinc-800/50 text-purple-400 border-b-2 border-purple-400' 
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <BrainCircuit className="w-5 h-5" />
              Strategic Deep Think
            </button>
          </div>

          <div className="p-8 md:p-12 min-h-[500px]">
            {activeTab === 'image' ? (
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-mono text-zinc-400 mb-2">PROMPT</label>
                    <textarea
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                      placeholder="Describe a futuristic visual asset..."
                      className="w-full h-32 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-mono text-zinc-400 mb-2">RESOLUTION SIZE</label>
                    <div className="grid grid-cols-3 gap-4">
                      {(['1K', '2K', '4K'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setImageSize(size)}
                          className={`py-3 px-4 rounded-lg font-mono text-sm border transition-all ${
                            imageSize === size
                              ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                              : 'border-white/10 text-zinc-500 hover:bg-white/5'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleImageGen}
                    disabled={isGeneratingImage || !imagePrompt}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.4)]"
                  >
                    {isGeneratingImage ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    Generate Asset
                  </button>
                </div>

                <div className="bg-black/40 rounded-xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                  {generatedImage ? (
                    <>
                      <img 
                        src={generatedImage} 
                        alt="Generated Asset" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <a href={generatedImage} download="neon-flux-asset.png" className="bg-white text-black px-6 py-2 rounded-full font-bold">
                          Download
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-zinc-600 p-8">
                      {isGeneratingImage ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                          <p className="animate-pulse">Rendering pixels...</p>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p>Visual output will appear here</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12 h-full">
                <div className="space-y-6 flex flex-col h-full">
                  <div>
                    <label className="block text-sm font-mono text-zinc-400 mb-2">CLIENT BRIEF</label>
                    <textarea
                      value={strategyBrief}
                      onChange={(e) => setStrategyBrief(e.target.value)}
                      placeholder="Enter client goals, target audience, and constraints..."
                      className="w-full h-48 bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-400 mb-2 font-mono text-sm uppercase">
                      <Zap className="w-4 h-4" />
                      Thinking Mode Active
                    </div>
                    <p className="text-xs text-zinc-400">
                      Allocating 32k token budget for deep reasoning. This process explores multiple creative angles before outputting the final strategy.
                    </p>
                  </div>

                  <button
                    onClick={handleStrategyGen}
                    disabled={isThinking || !strategyBrief}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(147,51,234,0.4)] mt-auto"
                  >
                    {isThinking ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                    Initiate Deep Think
                  </button>
                </div>

                <div className="bg-black/40 rounded-xl border border-white/5 p-6 relative overflow-y-auto max-h-[600px] scrollbar-hide">
                  {generatedStrategy ? (
                    <div className="prose prose-invert prose-purple max-w-none">
                       <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Strategic Output</h3>
                       <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-light">
                          {generatedStrategy}
                       </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                      {isThinking ? (
                         <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                          <p className="animate-pulse">Analyzing market vectors...</p>
                        </div>
                      ) : (
                        <>
                          <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p>Strategic analysis awaits input</p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICreativeLab;