'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';

// Mock note data
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  project: string;
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: `# React Fundamentals

React is a powerful library for building user interfaces. Here are the key concepts:

## Components
Components are the building blocks of React applications. They can be:

- **Function Components**: Simple, stateless components
- **Class Components**: More complex, with state management

## State & Props
- **Props**: Data passed from parent to child
- **State**: Internal component data that can change

\`\`\`javascript
const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
\`\`\`

## Hooks
React hooks allow you to use state and other features without writing a class:

- useState
- useEffect
- useContext
- useReducer`,
    tags: ['react', 'javascript', 'tutorial'],
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20',
    isFavorite: true,
    project: 'learning'
  },
  {
    id: '2',
    title: 'Project Ideas: AI Personal Assistant',
    content: `# AI Personal Assistant

## Vision
Build a personal AI assistant that helps with daily tasks.

## Features
1. **Task Management** - Add, complete, and organize tasks
2. **Schedule Integration** - Calendar sync and reminders
3. **Note Taking** - Voice and text note capture
4. **Research Helper** - Summarize articles and documents

## Tech Stack
- Frontend: React + TypeScript
- Backend: Python/FastAPI
- AI: GPT-4 API
- Database: PostgreSQL

## Milestones
- [ ] MVP with task management
- [ ] Voice input capability
- [ ] Calendar integration
- [ ] AI-powered summaries`,
    tags: ['ai', 'project', 'ideas'],
    createdAt: '2024-01-20',
    updatedAt: '2024-03-01',
    isFavorite: true,
    project: 'ideas'
  },
  {
    id: '3',
    title: 'Design System Guidelines',
    content: `# Design System Guidelines

## Typography

### Font Families
- **Headings**: Playfair Display
- **Body**: DM Sans
- **Code**: JetBrains Mono

### Scale
- H1: 48px / 3rem
- H2: 36px / 2.25rem
- H3: 24px / 1.5rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem

## Color Palette

### Primary Colors
- Accent: #d45d3b (Burnt Orange)
- Secondary: #7eb8a2 (Sage Green)

### Neutral
- Dark: #1a1a1a
- Medium: #5c5c5c
- Light: #faf9f7

## Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

## Components
- Cards with subtle shadows
- Rounded corners (8px)
- Smooth transitions (0.3s)`,
    tags: ['design', 'ui', 'reference'],
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15',
    isFavorite: false,
    project: 'work'
  },
  {
    id: '4',
    title: 'Meeting Notes: Q1 Planning',
    content: `# Q1 Planning Meeting

## Attendees
- Sarah (Product)
- Mike (Engineering)
- Lisa (Design)

## Discussion Points

### 1. Product Roadmap
- Focus on core features
- Defer AI features to Q2
- Improve mobile experience

### 2. Engineering Capacity
- 2 developers available
- Need to hire 1 more
- Tech debt: address API versioning

### 3. Design Priorities
- New design system implementation
- Accessibility improvements
- Animation polish

## Action Items
- [ ] Schedule follow-up on hiring
- [ ] Create technical spec for API v2
- [ ] Finalize design system components

## Next Steps
Next meeting: Feb 15th, 2pm`,
    tags: ['meeting', 'work', 'planning'],
    createdAt: '2024-02-10',
    updatedAt: '2024-02-10',
    isFavorite: false,
    project: 'work'
  },
  {
    id: '5',
    title: 'TypeScript Best Practices',
    content: `# TypeScript Best Practices

## Type Definitions

### Prefer Explicit Types
\`\`\`typescript
// Good
const name: string = "John";

// Avoid
const name = "John";
\`\`\`

### Use Interfaces for Objects
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

### Union Types for Options
\`\`\`typescript
type Status = 'pending' | 'active' | 'completed';
\`\`\`

## Utility Types
- Partial<T>
- Required<T>
- Pick<T, K>
- Omit<T, K>

## Generics
Use generics for reusable components:
\`\`\`typescript
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}
\`\`\`

## Best Practices
1. Enable strict mode
2. Use type inference when obvious
3. Avoid \`any\`
4. Document complex types`,
    tags: ['typescript', 'javascript', 'reference'],
    createdAt: '2024-01-25',
    updatedAt: '2024-02-28',
    isFavorite: true,
    project: 'learning'
  },
  {
    id: '6',
    title: 'Book Notes: Atomic Habits',
    content: `# Atomic Habits by James Clear

## Core Concept
Small changes lead to remarkable results.

## The Four Laws

### 1. Make it Obvious
- Design your environment
- Use habit stacking
- Implementation intentions

### 2. Make it Attractive
- Pair with something enjoyable
- Join a culture where your desired behavior is the normal behavior

### 3. Make it Easy
- Reduce friction for good habits
- Prime your environment
- Master the art of showing up

### 4. Make it Satisfying
- Immediate reward
- Use a habit tracker
- Never break the chain

## Key Takeaways
1% better every day = 37x better over a year
Focus on systems, not goals

> "You do not rise to the level of your goals. You fall to the level of your systems."`,
    tags: ['books', 'productivity', 'personal'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-05',
    isFavorite: false,
    project: 'personal'
  }
];

// All unique tags
const allTags = Array.from(new Set(mockNotes.flatMap(note => note.tags))).sort();

// Simple markdown parser
function parseMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

  // Lists
  html = html.replace(/^- \[ \] (.*$)/gm, '<li class="task"><input type="checkbox" disabled /> $1</li>');
  html = html.replace(/^- \[x\] (.*$)/gm, '<li class="task done"><input type="checkbox" checked disabled /> $1</li>');
  html = html.replace(/^- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

  // Numbered lists
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
  html = html.replace(/<p>(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)<\/p>/g, '$1');
  html = html.replace(/<p>(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)<\/p>/g, '$1');
  html = html.replace(/<p>(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');

  return html;
}

export default function PersonalKnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Filter notes
  const filteredNotes = useMemo(() => {
    return mockNotes.filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some(tag => note.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            {selectedNote ? selectedNote.title : 'All Notes'}
          </h1>
          {!selectedNote && (
            <p className={styles.subtitle}>
              {filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}
              {selectedTags.length > 0 && ` matching ${selectedTags.length} tag${selectedTags.length !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>
      </header>

      {/* Search & Filters */}
      {!selectedNote && (
        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className={styles.tagsContainer}>
            <span className={styles.tagsLabel}>Filter by tags:</span>
            <div className={styles.tags}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                className={styles.clearTags}
                onClick={() => setSelectedTags([])}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className={styles.content}>
        {selectedNote ? (
          // Note Detail View
          <div className={styles.noteDetail}>
            <button
              className={styles.backButton}
              onClick={() => setSelectedNote(null)}
            >
              ← Back to notes
            </button>

            <div className={styles.noteMeta}>
              <div className={styles.noteTags}>
                {selectedNote.tags.map(tag => (
                  <span key={tag} className={styles.noteTag}>{tag}</span>
                ))}
              </div>
              <span className={styles.noteDate}>
                Updated {selectedNote.updatedAt}
              </span>
            </div>

            <article
              className={styles.markdownContent}
              dangerouslySetInnerHTML={{ __html: parseMarkdown(selectedNote.content) }}
            />
          </div>
        ) : (
          // Notes Grid View
          <div className={styles.notesGrid}>
            {filteredNotes.map((note, index) => (
              <article
                key={note.id}
                className={styles.noteCard}
                onClick={() => setSelectedNote(note)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.noteCardHeader}>
                  <h3 className={styles.noteCardTitle}>{note.title}</h3>
                  {note.isFavorite && <span className={styles.favoriteIcon}>⭐</span>}
                </div>

                <p className={styles.noteCardPreview}>
                  {note.content.split('\n')[0].replace(/^# /, '')}
                </p>

                <div className={styles.noteCardFooter}>
                  <div className={styles.noteCardTags}>
                    {note.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={styles.noteCardTag}>{tag}</span>
                    ))}
                  </div>
                  <span className={styles.noteCardDate}>{note.updatedAt}</span>
                </div>
              </article>
            ))}

            {filteredNotes.length === 0 && (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📝</span>
                <h3>No notes found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
