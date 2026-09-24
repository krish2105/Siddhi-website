import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ShoppingBag, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { BRAND } from '../config/brand.config';

interface StoryReel {
  id: string;
  title: string;
  creator: string;
  location: string;
  duration: string;
  videoSrc: string;
  posterSrc: string;
  badge: string;
  badgeColor?: string;
  caption: string;
  views: string;
}

interface VisualStoriesSectionProps {
  onOpenCart?: () => void;
}

export const VisualStoriesSection: React.FC<VisualStoriesSectionProps> = ({ onOpenCart }) => {
  const [activeModalStory, setActiveModalStory] = useState<StoryReel | null>(null);
  const [playingCardId, setPlayingCardId] = useState<string | null>('reel-3'); // Card 3 starts active as in reference
  const [modalPlaying, setModalPlaying] = useState<boolean>(true);
  const [modalMuted, setModalMuted] = useState<boolean>(true);
  const [modalProgress, setModalProgress] = useState<number>(18);
  const [showFloatingPill, setShowFloatingPill] = useState<boolean>(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const stories: StoryReel[] = [
    {
      id: 'reel-1',
      title: 'MESS FREE - 100% Hygienic Cleaning',
      creator: '@AnanyaHomeHacks',
      location: 'Mumbai, MH',
      duration: '0:45',
      videoSrc: '/assets/reel_1.mp4',
      posterSrc: '/assets/story_reel_1.jpg',
      badge: 'MESS FREE',
      badgeColor: '#FED716',
      caption: 'Unboxing the emerald and gold presentation kit. Zero messy dirty water splash!',
      views: '5.8K',
    },
    {
      id: 'reel-2',
      title: 'Zero Assembly Effort & Luxury Finish',
      creator: '@VikramInteriorLiving',
      location: 'Bengaluru, KA',
      duration: '1:10',
      videoSrc: '/assets/reel_2.mp4',
      posterSrc: '/assets/aurelle_unboxing.jpg',
      badge: 'UNBOXING RITUAL',
      caption: 'The magnetic wall dock and satin anodized aluminum feel heavier and more premium than imported brands.',
      views: '8.2K',
    },
    {
      id: 'reel-3',
      title: 'One-Click Touchless Sponge Attachment',
      creator: '@PoojaCleanRituals',
      location: 'New Delhi, DL',
      duration: '1:25',
      videoSrc: '/assets/reel_3.mp4',
      posterSrc: '/assets/aurelle_inhand_action.jpg',
      badge: 'SNAP & RELEASE',
      caption: 'Slide the gold button forward to click in a fresh pod. Slide back to eject straight into the dustbin.',
      views: '12.4K',
    },
    {
      id: 'reel-4',
      title: 'Triple-Layered Ocean Mist Cleansing Foam',
      creator: '@DrRohanHygiene',
      location: 'Hyderabad, TS',
      duration: '0:52',
      videoSrc: '/assets/reel_4.mp4',
      posterSrc: '/assets/aurelle_refill_ritual.jpg',
      badge: 'OCEAN FRESH',
      caption: 'Water activates immediate rich antibacterial foaming. No harsh chemical bottles needed.',
      views: '9.6K',
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleCardClick = (story: StoryReel) => {
    setActiveModalStory(story);
    setModalPlaying(true);
    setModalProgress(0);
  };

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalPlaying) {
        modalVideoRef.current.pause();
      } else {
        modalVideoRef.current.play();
      }
      setModalPlaying(!modalPlaying);
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalMuted;
      setModalMuted(!modalMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (modalVideoRef.current) {
      const current = modalVideoRef.current.currentTime;
      const total = modalVideoRef.current.duration || 1;
      setModalProgress((current / total) * 100);
    }
  };

  return (
    <section
      id="visual-stories"
      style={{
        padding: '80px 0 60px 0',
        background: '#FAF9F6',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(200, 167, 90, 0.12)',
              border: '1px solid rgba(200, 167, 90, 0.35)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: 'var(--color-champagne)',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={13} />
            <span>REAL PATRON UGC & RITUALS</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--color-graphite)',
              fontFamily: 'var(--font-serif)',
              marginBottom: '10px',
            }}
          >
            Visual Stories Unfold
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-lilac-deep)', lineHeight: 1.6 }}>
            Experience touchless hygiene in action. Watch authentic unboxing, click-attachment, and non-scratch cleaning demonstrations from modern bathrooms across India.
          </p>
        </div>

        {/* Carousel Wrapper with Controls */}
        <div style={{ position: 'relative' }}>
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous Stories"
            style={{
              position: 'absolute',
              left: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-graphite)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-champagne)';
              e.currentTarget.style.color = '#FFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = 'var(--color-graphite)';
            }}
          >
            <ArrowLeft size={18} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Next Stories"
            style={{
              position: 'absolute',
              right: '-16px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-graphite)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-champagne)';
              e.currentTarget.style.color = '#FFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = 'var(--color-graphite)';
            }}
          >
            <ArrowRight size={18} />
          </button>

          {/* Video Cards Grid / Horizontal Scroll Track */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(260px, 1fr))',
              gap: '20px',
              overflowX: 'auto',
              padding: '10px 4px 20px 4px',
              scrollbarWidth: 'none',
              scrollSnapType: 'x mandatory',
            }}
          >
            {stories.map((story) => {
              const isCardPlaying = playingCardId === story.id;

              return (
                <div
                  key={story.id}
                  onClick={() => handleCardClick(story)}
                  style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#1C1C26',
                    aspectRatio: '9 / 16',
                    cursor: 'pointer',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    scrollSnapAlign: 'start',
                    transform: 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 18px 36px rgba(0,0,0,0.16)';
                    setPlayingCardId(story.id);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Real MP4 Video Element (Muted loop for safety & modern browser autoplay) */}
                  <video
                    src={story.videoSrc}
                    poster={story.posterSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />

                  {/* Dark gradient overlay for text readability */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Top Badge Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      right: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        background: story.badgeColor || '#FED716',
                        color: '#000000',
                        fontSize: '11px',
                        fontWeight: 900,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.04em',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      {story.badge}
                    </span>

                    <span
                      style={{
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(4px)',
                        color: '#FFF',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '12px',
                      }}
                    >
                      {story.duration}
                    </span>
                  </div>

                  {/* Attachment 2 Style UGC Sticker Overlay */}
                  {story.id === 'reel-1' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '18%',
                        left: '10%',
                        right: '10%',
                        textAlign: 'center',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                        pointerEvents: 'none',
                      }}
                    >
                      <div
                        style={{
                          color: '#FFEA00',
                          fontSize: '18px',
                          fontWeight: 900,
                          lineHeight: 1.1,
                          textTransform: 'uppercase',
                          letterSpacing: '-0.02em',
                          WebkitTextStroke: '1px #000',
                        }}
                      >
                        MESS FREE
                      </div>
                      <div
                        style={{
                          color: '#FFFFFF',
                          fontSize: '14px',
                          fontWeight: 800,
                          textShadow: '0 2px 6px #000',
                        }}
                      >
                        100% hygienic cleaning
                      </div>
                    </div>
                  )}

                  {/* Attachment 2 Style Player Bar (Visible on Card 3 or active) */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '14px',
                      right: '14px',
                      color: '#FFFFFF',
                    }}
                  >
                    {/* Scrub Timeline Indicator */}
                    <div
                      style={{
                        height: '3px',
                        background: 'rgba(255,255,255,0.3)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: isCardPlaying ? '45%' : '0%',
                          background: 'var(--color-champagne)',
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px' }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '13px', lineHeight: 1.2 }}>
                          {story.creator}
                        </div>
                        <div style={{ opacity: 0.8, fontSize: '11px' }}>
                          {story.location}
                        </div>
                      </div>

                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(8px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Play size={14} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '2px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-champagne)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </div>

      {/* Full-Screen Vertical Lightbox Reel Modal */}
      {activeModalStory && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveModalStory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              height: '90vh',
              maxHeight: '760px',
              borderRadius: '24px',
              overflow: 'hidden',
              background: '#000000',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Modal Video Player */}
            <video
              ref={modalVideoRef}
              src={activeModalStory.videoSrc}
              poster={activeModalStory.posterSrc}
              autoPlay
              loop
              muted={modalMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            {/* Top Bar with Close & Mute */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFFFFF' }}>
                <span
                  style={{
                    background: 'var(--color-champagne)',
                    color: '#000',
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  VERIFIED PATRON
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700 }}>{activeModalStory.creator}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={toggleModalPlay}
                  aria-label="Play or pause story"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    cursor: 'pointer',
                  }}
                >
                  {modalPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={toggleModalMute}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    cursor: 'pointer',
                  }}
                >
                  {modalMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={() => setActiveModalStory(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFF',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Bottom Controls & Shoppable Product Card Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)',
                zIndex: 2,
              }}
            >
              {/* Progress Scrub Bar */}
              <div
                style={{
                  height: '4px',
                  background: 'rgba(255,255,255,0.3)',
                  borderRadius: '2px',
                  marginBottom: '14px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  if (modalVideoRef.current) {
                    modalVideoRef.current.currentTime = pos * (modalVideoRef.current.duration || 1);
                  }
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${modalProgress}%`,
                    background: 'var(--color-champagne)',
                    borderRadius: '2px',
                  }}
                />
              </div>

              {/* Video Title & Caption */}
              <h4 style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 800, marginBottom: '4px' }}>
                {activeModalStory.title}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', lineHeight: 1.4, marginBottom: '16px' }}>
                {activeModalStory.caption}
              </p>

              {/* Shoppable Product Card (Like Suvaam Quinn Overlay) */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src="/assets/aurelle_hero_travertine.jpg"
                    alt={BRAND.name}
                    style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                      Deluxe Pack (21 Pods + 1 Wand)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                        ₹1,599
                      </span>
                      <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                        ₹2,799
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveModalStory(null);
                    if (onOpenCart) onOpenCart();
                  }}
                  className="btn-primary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <ShoppingBag size={14} style={{ marginRight: '6px' }} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mini Product Pill (As seen in Suvaam Attachment 2 Bottom-Right) */}
      {showFloatingPill && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90,
            background: '#FFFFFF',
            borderRadius: '16px',
            padding: '10px 14px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.14)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            maxWidth: '360px',
          }}
        >
          <img
            src="/assets/aurelle_hero_travertine.jpg"
            alt="Hardware Kit"
            style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: 'var(--color-graphite)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Extra Disposable Sponge Kit
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-graphite)' }}>
                Rs. 1,599.00
              </span>
              <span style={{ fontSize: '11px', textDecoration: 'line-through', color: 'var(--color-lilac-deep)' }}>
                Rs. 2,799.00
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (onOpenCart) onOpenCart();
            }}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--color-graphite)',
              background: '#FFFFFF',
              color: 'var(--color-graphite)',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-graphite)';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = 'var(--color-graphite)';
            }}
          >
            Add to Cart
          </button>

          <button
            onClick={() => setShowFloatingPill(false)}
            aria-label="Dismiss quick buy bar"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-lilac-deep)',
              padding: '2px',
              marginLeft: '-4px',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}
    </section>
  );
};
