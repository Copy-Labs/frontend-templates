'use client';

import { useState, useEffect, useRef } from 'react';

// ============== Mock Data ==============
interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  duration: number;
  color: string;
  accentColor: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  tracks: Track[];
}

const playlists: Playlist[] = [
  {
    id: '1',
    name: 'Midnight Jazz',
    description: 'Late night vibes with smooth jazz',
    coverImage: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=400&fit=crop',
    tracks: [],
  },
  {
    id: '2',
    name: 'Electronic Dreams',
    description: 'Synthesizers and beats',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    tracks: [],
  },
  {
    id: '3',
    name: 'Acoustic Sessions',
    description: 'Stripped back and intimate',
    coverImage: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
    tracks: [],
  },
  {
    id: '4',
    name: 'Indie Discoveries',
    description: 'Fresh sounds from emerging artists',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    tracks: [],
  },
];

const allTracks: Track[] = [
  {
    id: 't1',
    title: 'Neon Nights',
    artist: 'Synthwave Collective',
    album: 'Retro Future',
    albumArt: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400&h=400&fit=crop',
    duration: 234,
    color: '#1a1a2e',
    accentColor: '#e94560',
  },
  {
    id: 't2',
    title: 'Velvet Moon',
    artist: 'The Midnight Echo',
    album: 'Noir Sessions',
    albumArt: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=400&h=400&fit=crop',
    duration: 287,
    color: '#16213e',
    accentColor: '#0f3460',
  },
  {
    id: 't3',
    title: 'Golden Hour',
    artist: 'Amber Skies',
    album: 'Sunset Memories',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    duration: 198,
    color: '#2d132c',
    accentColor: '#ee6c4d',
  },
  {
    id: 't4',
    title: 'Crystal Waves',
    artist: 'Ocean Collective',
    album: 'Deep Blue',
    albumArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    duration: 312,
    color: '#0d1b2a',
    accentColor: '#48cae4',
  },
  {
    id: 't5',
    title: 'Urban Drift',
    artist: 'City Lights',
    album: 'Metropolitan',
    albumArt: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    duration: 256,
    color: '#212529',
    accentColor: '#ff6b35',
  },
  {
    id: 't6',
    title: 'Starlight Symphony',
    artist: 'Cosmic Ensemble',
    album: 'Astral Dreams',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    duration: 289,
    color: '#1a1a2e',
    accentColor: '#7b2cbf',
  },
];

// ============== Icons ==============
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const SkipBackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const SkipForwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
  </svg>
);

const ShuffleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
  </svg>
);

const RepeatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const LibraryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
  </svg>
);

// ============== Utility Functions ==============
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// ============== Main Component ==============
export default function MusicStreamingPage() {
  const [currentTrack, setCurrentTrack] = useState<Track>(allTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [activeTab, setActiveTab] = useState<'home' | 'library'>('home');
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  // Update accent colors dynamically based on current track
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent-primary', currentTrack.accentColor);
    document.documentElement.style.setProperty(
      '--color-accent-glow',
      `${currentTrack.accentColor}40`
    );
  }, [currentTrack]);

  // Simulate playback progress
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + (100 / currentTrack.duration);
        });
      }, 1000);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allTracks.length;
    setCurrentTrack(allTracks[nextIndex]);
    setProgress(0);
  };

  const handlePrev = () => {
    const currentIndex = allTracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length;
    setCurrentTrack(allTracks[prevIndex]);
    setProgress(0);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleLike = (trackId: string) => {
    setLikedTracks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const filteredTracks = allTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="music-app-container">
      {/* Dynamic Background */}
      <div className="dynamic-bg" />

      <div className="app-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <span className="logo-icon">♪</span>
            <span className="logo-text">Aurora</span>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <HomeIcon />
              <span>Home</span>
            </button>
            <button
              className={`nav-item ${activeTab === 'library' ? 'active' : ''}`}
              onClick={() => setActiveTab('library')}
            >
              <LibraryIcon />
              <span>Library</span>
            </button>
          </nav>

          <div className="sidebar-playlists">
            <h4 className="sidebar-section-title">Playlists</h4>
            {playlists.map((playlist, index) => (
              <div
                key={playlist.id}
                className="playlist-item animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="playlist-item-cover">
                  <img src={playlist.coverImage} alt={playlist.name} />
                </div>
                <div className="playlist-item-info">
                  <span className="playlist-item-name">{playlist.name}</span>
                  <span className="playlist-item-count">{Math.floor(Math.random() * 50) + 10} songs</span>
                </div>
              </div>
            ))}
            <button className="create-playlist-btn">
              <PlusIcon />
              <span>Create Playlist</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Top Bar */}
          <header className="top-bar">
            <div className="search-container">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search songs, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="top-bar-actions">
              <div className="user-avatar">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="User" />
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="content-area">
            {/* Hero Section */}
            <section className="hero-section animate-fade-in-up">
              <div className="hero-album-art">
                <img src={currentTrack.albumArt} alt={currentTrack.album} />
                <div className="hero-glow" style={{ background: currentTrack.accentColor }} />
              </div>
              <div className="hero-info">
                <span className="hero-label">NOW PLAYING</span>
                <h1 className="hero-title">{currentTrack.title}</h1>
                <p className="hero-artist">{currentTrack.artist}</p>
                <p className="hero-album">{currentTrack.album}</p>
                <div className="hero-stats">
                  <span>▶ {Math.floor(Math.random() * 500) + 100}k plays</span>
                  <span>♥ {Math.floor(Math.random() * 50) + 5}k likes</span>
                </div>
              </div>
            </section>

            {/* Playlists Grid */}
            <section className="playlists-section">
              <div className="section-header">
                <h2>Your Playlists</h2>
                <button className="see-all-btn">See All</button>
              </div>
              <div className="playlists-grid">
                {playlists.map((playlist, index) => (
                  <div
                    key={playlist.id}
                    className="playlist-card animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="playlist-card-image">
                      <img src={playlist.coverImage} alt={playlist.name} />
                      <div className="playlist-card-play" onClick={handlePlayPause}>
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                      </div>
                    </div>
                    <div className="playlist-card-info">
                      <h3 className="playlist-card-title">{playlist.name}</h3>
                      <p className="playlist-card-meta">{playlist.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tracks List */}
            <section className="tracks-section">
              <div className="section-header">
                <h2>{searchQuery ? 'Search Results' : 'Trending Now'}</h2>
              </div>
              <div className="tracks-list">
                {filteredTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`track-item animate-slide-in-left ${
                      track.id === currentTrack.id ? 'active' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => handleTrackSelect(track)}
                  >
                    <div className="track-number">{index + 1}</div>
                    <div className="track-album-art">
                      <img src={track.albumArt} alt={track.title} />
                    </div>
                    <div className="track-info">
                      <span className="track-title">{track.title}</span>
                      <span className="track-artist">{track.artist}</span>
                    </div>
                    <span className="track-album-name">{track.album}</span>
                    <span className="track-duration">{formatTime(track.duration)}</span>
                    <button
                      className="track-like-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track.id);
                      }}
                    >
                      <HeartIcon filled={likedTracks.has(track.id)} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Player Bar */}
      <div className="player-bar">
        <div className="player-track-info">
          <div className="player-album-art">
            <img src={currentTrack.albumArt} alt={currentTrack.title} />
          </div>
          <div className="player-track-details">
            <span className="player-track-title">{currentTrack.title}</span>
            <span className="player-track-artist">{currentTrack.artist}</span>
          </div>
          <button
            className="player-like-btn"
            onClick={() => toggleLike(currentTrack.id)}
          >
            <HeartIcon filled={likedTracks.has(currentTrack.id)} />
          </button>
        </div>

        <div className="player-controls">
          <div className="player-buttons">
            <button className="player-btn secondary">
              <ShuffleIcon />
            </button>
            <button className="player-btn" onClick={handlePrev}>
              <SkipBackIcon />
            </button>
            <button
              className="player-btn primary"
              onClick={handlePlayPause}
              style={{ backgroundColor: currentTrack.accentColor }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button className="player-btn" onClick={handleNext}>
              <SkipForwardIcon />
            </button>
            <button className="player-btn secondary">
              <RepeatIcon />
            </button>
          </div>
          <div className="player-progress">
            <span className="time-current">
              {formatTime((progress / 100) * currentTrack.duration)}
            </span>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="time-total">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        <div className="player-volume">
          <button className="volume-btn">
            <VolumeIcon />
          </button>
          <div className="volume-slider">
            <div
              className="volume-slider-fill"
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .music-app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .app-layout {
          display: flex;
          flex: 1;
          padding-bottom: 100px;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(20px);
          border-right: 1px solid var(--color-border);
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-2xl);
        }

        .logo-icon {
          font-size: 1.75rem;
          color: var(--color-accent-primary);
          animation: pulse 2s ease-in-out infinite;
        }

        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-style: italic;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
          margin-bottom: var(--space-xl);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          font-size: 0.9375rem;
          transition: all var(--transition-fast);
        }

        .nav-item:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-elevated);
        }

        .nav-item.active {
          color: var(--color-text-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .sidebar-section-title {
          font-family: var(--font-body);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
          margin-bottom: var(--space-md);
        }

        .sidebar-playlists {
          flex: 1;
          overflow-y: auto;
        }

        .playlist-item {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-xs);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background var(--transition-fast);
          opacity: 0;
        }

        .playlist-item:hover {
          background: var(--color-bg-elevated);
        }

        .playlist-item-cover {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
        }

        .playlist-item-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .playlist-item-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .playlist-item-name {
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .playlist-item-count {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        .create-playlist-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm);
          margin-top: var(--space-md);
          color: var(--color-text-secondary);
          font-size: 0.875rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .create-playlist-btn:hover {
          color: var(--color-text-primary);
          background: var(--color-bg-elevated);
        }

        /* Main Content */
        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-lg);
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-xl);
          position: sticky;
          top: 0;
          z-index: 10;
          padding: var(--space-md) 0;
          background: linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 100%);
        }

        .search-container {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          padding: var(--space-sm) var(--space-lg);
          flex: 1;
          max-width: 400px;
        }

        .search-container svg {
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        .search-input {
          background: none;
          border: none;
          outline: none;
          color: var(--color-text-primary);
          font-family: var(--font-body);
          font-size: 0.875rem;
          width: 100%;
        }

        .search-input::placeholder {
          color: var(--color-text-muted);
        }

        .top-bar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-full);
          overflow: hidden;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }

        .user-avatar:hover {
          transform: scale(1.05);
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Hero Section */
        .hero-section {
          display: flex;
          gap: var(--space-2xl);
          margin-bottom: var(--space-3xl);
          padding: var(--space-xl);
          background: rgba(30, 30, 30, 0.4);
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
        }

        .hero-album-art {
          width: 240px;
          height: 240px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          box-shadow: var(--shadow-lg), var(--shadow-glow);
        }

        .hero-album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-glow {
          position: absolute;
          inset: -50%;
          filter: blur(60px);
          opacity: 0.4;
          z-index: -1;
          animation: glowPulse 3s ease-in-out infinite;
        }

        .hero-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent-primary);
          margin-bottom: var(--space-sm);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: 3rem;
          font-style: italic;
          margin-bottom: var(--space-sm);
          line-height: 1.1;
        }

        .hero-artist {
          font-size: 1.25rem;
          color: var(--color-text-primary);
          margin-bottom: var(--space-xs);
        }

        .hero-album {
          font-size: 0.9375rem;
          color: var(--color-text-secondary);
          margin-bottom: var(--space-md);
        }

        .hero-stats {
          display: flex;
          gap: var(--space-lg);
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        /* Section Headers */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }

        .section-header h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-style: italic;
        }

        .see-all-btn {
          font-size: 0.875rem;
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
        }

        .see-all-btn:hover {
          color: var(--color-text-primary);
        }

        /* Playlists Grid */
        .playlists-section {
          margin-bottom: var(--space-3xl);
        }

        .playlists-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-lg);
        }

        .playlist-card {
          background: var(--color-bg-card);
          border-radius: var(--radius-lg);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-base);
          opacity: 0;
        }

        .playlist-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg), 0 0 30px var(--color-accent-glow);
        }

        .playlist-card-image {
          aspect-ratio: 1;
          position: relative;
          overflow: hidden;
        }

        .playlist-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }

        .playlist-card:hover .playlist-card-image img {
          transform: scale(1.08);
        }

        .playlist-card-play {
          position: absolute;
          bottom: var(--space-md);
          right: var(--space-md);
          width: 48px;
          height: 48px;
          border-radius: var(--radius-full);
          background: var(--color-accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(8px);
          transition: all var(--transition-base);
          box-shadow: var(--shadow-md);
        }

        .playlist-card:hover .playlist-card-play {
          opacity: 1;
          transform: translateY(0);
        }

        .playlist-card-info {
          padding: var(--space-md);
        }

        .playlist-card-title {
          font-weight: 600;
          font-size: 0.9375rem;
          margin-bottom: var(--space-xs);
        }

        .playlist-card-meta {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        /* Tracks List */
        .tracks-section {
          margin-bottom: var(--space-2xl);
        }

        .tracks-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }

        .track-item {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          padding: var(--space-sm) var(--space-md);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
          opacity: 0;
        }

        .track-item:hover {
          background: var(--color-bg-elevated);
        }

        .track-item.active {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--color-border);
        }

        .track-item.active .track-title {
          color: var(--color-accent-primary);
        }

        .track-number {
          width: 24px;
          font-size: 0.875rem;
          color: var(--color-text-muted);
          text-align: center;
          flex-shrink: 0;
        }

        .track-album-art {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          flex-shrink: 0;
        }

        .track-album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .track-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .track-title {
          font-size: 0.9375rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-artist {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .track-album-name {
          width: 200px;
          font-size: 0.8125rem;
          color: var(--color-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .track-duration {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
          width: 48px;
          text-align: right;
        }

        .track-like-btn {
          opacity: 0;
          transition: opacity var(--transition-fast), color var(--transition-fast);
        }

        .track-item:hover .track-like-btn {
          opacity: 1;
        }

        .track-like-btn:hover {
          color: #e94560;
        }

        /* Player Bar */
        .player-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 90px;
          background: rgba(18, 18, 18, 0.95);
          backdrop-filter: blur(20px);
          border-top: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          padding: 0 var(--space-lg);
          z-index: 100;
        }

        .player-track-info {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          width: 280px;
          flex-shrink: 0;
        }

        .player-album-art {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .player-album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .player-track-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .player-track-title {
          font-size: 0.9375rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-track-artist {
          font-size: 0.8125rem;
          color: var(--color-text-muted);
        }

        .player-like-btn {
          color: var(--color-text-muted);
          transition: color var(--transition-fast);
          margin-left: var(--space-sm);
        }

        .player-like-btn:hover {
          color: #e94560;
        }

        .player-controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-sm);
        }

        .player-buttons {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }

        .player-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
        }

        .player-btn:hover {
          color: var(--color-text-primary);
          transform: scale(1.1);
        }

        .player-btn.secondary {
          width: 28px;
          height: 28px;
        }

        .player-btn.primary {
          width: 40px;
          height: 40px;
          color: white;
        }

        .player-btn.primary:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }

        .player-progress {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          width: 100%;
          max-width: 600px;
        }

        .time-current,
        .time-total {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          width: 40px;
          text-align: center;
        }

        .player-progress .progress-bar {
          flex: 1;
          height: 4px;
          cursor: pointer;
        }

        .player-progress .progress-bar:hover {
          height: 6px;
        }

        .player-volume {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          width: 180px;
          justify-content: flex-end;
          flex-shrink: 0;
        }

        .volume-btn {
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
        }

        .volume-btn:hover {
          color: var(--color-text-primary);
        }

        .volume-slider {
          width: 100px;
          height: 4px;
          background: var(--color-bg-elevated);
          border-radius: var(--radius-full);
          overflow: hidden;
          cursor: pointer;
        }

        .volume-slider-fill {
          height: 100%;
          background: var(--color-text-primary);
          border-radius: var(--radius-full);
          transition: width var(--transition-fast);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .playlists-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }

          .hero-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-album-art {
            width: 200px;
            height: 200px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .track-album-name {
            display: none;
          }

          .player-bar {
            flex-wrap: wrap;
            height: auto;
            padding: var(--space-sm);
          }

          .player-track-info {
            width: auto;
            flex: 1;
          }

          .player-controls {
            order: -1;
            width: 100%;
            margin-bottom: var(--space-sm);
          }

          .player-volume {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
