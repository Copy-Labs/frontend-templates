'use client';

import "./globals.css";
import { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import styles from './layout.module.css';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'light', toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  children?: SidebarItem[];
}

const sidebarData: SidebarItem[] = [
  { id: 'all', title: 'All Notes', icon: '📚' },
  { id: 'favorites', title: 'Favorites', icon: '⭐' },
  { id: 'projects', title: 'Projects', icon: '📁' },
  { id: 'archive', title: 'Archive', icon: '🗃️' },
];

const projectItems: SidebarItem[] = [
  { id: 'work', title: 'Work', icon: '💼' },
  { id: 'learning', title: 'Learning', icon: '📖' },
  { id: 'personal', title: 'Personal', icon: '🏠' },
  { id: 'ideas', title: 'Ideas', icon: '💡' },
];

export default function PersonalKnowledgeBaseLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('all');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pkb-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('pkb-theme', theme);
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
          <div className={styles.sidebarHeader}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>◆</span>
              <span className={styles.logoText}>Knowledge Base</span>
            </div>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          <nav className={styles.nav}>
            <div className={styles.navSection}>
              <h3 className={styles.navSectionTitle}>Library</h3>
              {sidebarData.map(item => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${activeSection === item.id ? styles.navItemActive : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.title}</span>
                </button>
              ))}
            </div>

            <div className={styles.navSection}>
              <h3 className={styles.navSectionTitle}>Projects</h3>
              {projectItems.map(item => (
                <button
                  key={item.id}
                  className={`${styles.navItem} ${activeSection === item.id ? styles.navItemActive : ''}`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.title}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.stats}>
              <span className={styles.statItem}>
                <strong>42</strong> notes
              </span>
              <span className={styles.statDivider}>·</span>
              <span className={styles.statItem}>
                <strong>12</strong> tags
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
