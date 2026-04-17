'use client';

import { useState, useEffect } from 'react';
import './globals.css';

// Types
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  readTime: number;
  isBookmarked: boolean;
  aiSummary?: string;
}

// Mock Data
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Quantum Computing in Finance',
    summary: 'Major banks are investing billions in quantum technology to revolutionize risk analysis and trading strategies.',
    content: `Quantum computing represents one of the most significant technological advances of our time, with the potential to transform how financial institutions approach complex calculations, risk assessment, and market prediction.

    Major investment banks including JPMorgan Chase, Goldman Sachs, and Morgan Stanley have been actively exploring quantum computing applications. These institutions recognize that quantum computers could solve certain problems exponentially faster than classical computers.

    "We're on the cusp of a quantum advantage in finance," says Dr. Sarah Chen, a quantum researcher at MIT. "Problems that would take classical computers thousands of years could potentially be solved in minutes."

    The applications range from portfolio optimization to fraud detection, with Monte Carlo simulations being one of the most promising use cases. Quantum algorithms could dramatically improve the accuracy and speed of these simulations.

    However, challenges remain. Quantum computers require extremely controlled environments and are prone to errors from environmental noise. The technology is still in its early stages, but progress is accelerating.`,
    category: 'Technology',
    source: 'Financial Times',
    author: 'Michael Roberts',
    publishedAt: '2026-03-27T08:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
    readTime: 8,
    isBookmarked: false,
    aiSummary: 'Quantum computing is poised to transform financial services, with major banks investing billions. Key applications include risk analysis, portfolio optimization, and fraud detection. While technical challenges remain, experts predict quantum advantage within the next 5-10 years.'
  },
  {
    id: '2',
    title: 'Climate Summit Reaches Historic Agreement',
    summary: 'World leaders commit to unprecedented emissions targets while pledging $500 billion for green infrastructure.',
    content: `In a landmark decision that climate activists are calling "the beginning of a new era," representatives from 195 nations have agreed to the most ambitious climate targets in history.

    The agreement, reached after two weeks of intense negotiations in Geneva, commits signatory nations to reducing carbon emissions by 60% by 2035, compared to 2019 levels.

    "This is the moment we've been working toward," said UN Secretary-General António Guterres. "For the first time, we have a truly global commitment that matches the scale of the climate crisis."

    The agreement includes a $500 billion fund to help developing nations transition to renewable energy sources and build climate-resilient infrastructure.

    Key provisions include:
    - Mandatory emissions reporting for all signatory nations
    - Phase-out of coal power plants by 2035
    - Protection of 30% of global land and ocean areas
    - Establishment of a global carbon pricing mechanism

    Critics argue the targets don't go far enough, but supporters say the agreement provides a solid foundation for future action.`,
    category: 'World',
    source: 'The Guardian',
    author: 'Emma Thompson',
    publishedAt: '2026-03-27T07:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&auto=format&fit=crop',
    readTime: 6,
    isBookmarked: true,
    aiSummary: '195 nations agreed to cut emissions by 60% by 2035 in a historic climate deal. The agreement includes $500 billion for green infrastructure in developing nations and mandates emissions reporting. While critics say targets don\'t go far enough, it\'s being called a turning point in global climate action.'
  },
  {
    id: '3',
    title: 'AI Startup Raises $2 Billion in Record Funding Round',
    summary: 'NeuralMind secures largest-ever AI funding as investors bet on breakthrough in artificial general intelligence.',
    content: `Silicon Valley-based AI company NeuralMind has closed a $2 billion funding round, the largest ever for an artificial intelligence startup, as venture capital continues to flood into the AI sector.

    The round was led by Sequoia Capital with participation from Andreessen Horowitz, Tiger Global, and several sovereign wealth funds. The company's valuation now stands at $15 billion, making it one of the most valuable private AI companies in the world.

    NeuralMind was founded three years ago by former Google DeepMind researchers who left to pursue their vision of developing artificial general intelligence (AGI) - AI systems that can match or exceed human intelligence across all cognitive domains.

    "We're not just building better chatbots," said CEO Dr. James Liu. "Our focus is on developing AI systems that can truly reason, learn, and understand the world at a human level or beyond."

    The funding will be used to expand the company's research team, build new computing infrastructure, and accelerate development of their flagship AGI project codenamed "Prometheus."

    Industry analysts note the funding reflects continued investor enthusiasm for AI, despite concerns about valuation bubbles and regulatory scrutiny.`,
    category: 'Business',
    source: 'TechCrunch',
    author: 'Alex Wang',
    publishedAt: '2026-03-27T06:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop',
    readTime: 5,
    isBookmarked: false,
    aiSummary: 'AI startup NeuralMind raised $2 billion in the largest AI funding round ever, reaching a $15 billion valuation. Founded by ex-Google DeepMind researchers, the company is developing artificial general intelligence. Funding will expand research and computing infrastructure for their "Prometheus" AGI project.'
  },
  {
    id: '4',
    title: 'Breakthrough in Solid-State Batteries Promises 1000-Mile Range',
    summary: 'New battery technology could double electric vehicle range and reduce charging time to under 15 minutes.',
    content: `A team of researchers at Stanford University has announced a breakthrough in solid-state battery technology that could revolutionize the electric vehicle industry and transform energy storage.

    The new battery design uses a novel ceramic electrolyte that is both highly conductive and stable, addressing one of the biggest challenges in solid-state battery development. The innovation could enable EVs with ranges exceeding 1,000 miles on a single charge.

    "This is the kind of breakthrough we've been waiting for," said Professor Yi Chen, who led the research. "We've created a battery that's safer, longer-lasting, and charges faster than anything currently on the market."

    Key improvements include:
    - Energy density of 500 Wh/kg (vs 250 Wh/kg for current lithium-ion)
    - Charging time of under 15 minutes to 80%
    - Projected lifespan of over 1 million miles
    - Reduced fire risk compared to liquid electrolytes

    Several major automakers, including Toyota, Ford, and Volkswagen, have already expressed interest in licensing the technology. Production could begin within three years.

    The research was published in the journal Nature Energy and has been hailed as a potential turning point for electric vehicle adoption.`,
    category: 'Technology',
    source: 'Wired',
    author: 'Sarah Park',
    publishedAt: '2026-03-26T22:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop',
    readTime: 7,
    isBookmarked: false,
    aiSummary: 'Stanford researchers developed a solid-state battery with 500 Wh/kg energy density, enabling 1,000+ mile EV range. The battery charges to 80% in under 15 minutes and lasts over 1 million miles. Major automakers are interested in licensing the technology, with production potentially starting within three years.'
  },
  {
    id: '5',
    title: 'Global Markets Rally on Strong Economic Data',
    summary: 'Stock indices reach new highs as employment figures and GDP growth exceed analyst expectations.',
    content: `Global stock markets surged to record highs today following the release of stronger-than-expected economic data from major economies, signaling that the world economy may be heading for a "soft landing."

    The S&P 500 rose 2.3% to close at a new all-time high, while the Dow Jones Industrial Average gained over 600 points. European and Asian markets also posted significant gains.

    Key economic indicators released today included:
    - US unemployment fell to 3.2%, the lowest level in 50 years
    - US GDP grew 3.1% in Q4, beating expectations of 2.5%
    - Consumer confidence index reached a 20-year high
    - Manufacturing PMI expanded for the 14th consecutive month

    "This is the best economic data we've seen in a decade," said economist Maria Rodriguez at Goldman Sachs. "The combination of strong employment, solid growth, and controlled inflation is exactly what markets have been hoping for."

    However, some analysts warn that markets may be getting ahead of themselves. "Valuations are stretched," noted Jeremy Grantham ofGMO. "While the fundamentals are good, investors should remain cautious."

    Central banks around the world are closely watching the data as they consider their monetary policy positions.`,
    category: 'Finance',
    source: 'Bloomberg',
    author: 'David Miller',
    publishedAt: '2026-03-26T18:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
    readTime: 4,
    isBookmarked: true,
    aiSummary: 'Global markets hit record highs after strong economic data: US unemployment dropped to 3.2% and GDP grew 3.1% in Q4. The combination of strong employment, solid growth, and controlled inflation suggests a potential "soft landing." However, some analysts warn about stretched valuations.'
  },
  {
    id: '6',
    title: 'SpaceX Successfully Launches First Mars Mission Prototype',
    summary: 'Starship completes 100km test flight as company inches closer to interplanetary travel.',
    content: `SpaceX has achieved a major milestone in its quest to make humanity a multi-planetary species, successfully launching and landing a prototype of its next-generation Starship vehicle designed for Mars missions.

    The test flight, which lasted 90 minutes, saw the vehicle, dubbed "Olympus," complete a suborbital journey to 100km altitude before executing a precision landing at SpaceX's Boca Chica facility in Texas.

    "Today we took one giant leap toward becoming a spacefaring civilization," said Elon Musk during a post-launch press conference. "This is just the beginning."

    The successful test brings SpaceX closer to its ambitious goal of sending humans to Mars by the 2030s. The company plans to conduct orbital tests of the full Starship system later this year.

    Key features of the Starship system include:
    - Full reusability (both booster and spacecraft)
    - Capacity for 100 passengers
    - In-orbit refueling capability
    - Designed for long-duration spaceflight

    NASA Administrator Bill Nelson congratulated SpaceX on the achievement, calling it "an exciting step forward for human space exploration."

    The next major milestone will be an orbital flight test with the full Super Heavy booster and Starship upper stage.`,
    category: 'Science',
    source: 'Ars Technica',
    author: 'Jennifer Hayes',
    publishedAt: '2026-03-26T14:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&auto=format&fit=crop',
    readTime: 6,
    isBookmarked: false,
    aiSummary: 'SpaceX successfully launched and landed its "Olympus" Starship prototype in a 90-minute test flight to 100km altitude. The milestone brings SpaceX closer to its goal of sending humans to Mars in the 2030s. Full orbital tests with the Super Heavy booster are planned for later this year.'
  },
  {
    id: '7',
    title: 'Revolutionary Gene Therapy Shows Promise for Alzheimer\'s',
    summary: 'Clinical trials demonstrate significant cognitive improvement in early-stage Alzheimer\'s patients.',
    content: `A groundbreaking gene therapy treatment has shown remarkable results in early-stage Alzheimer's disease patients, offering hope for the millions affected by the devastating neurological condition.

    In Phase 2 clinical trials conducted at Massachusetts General Hospital, 67% of patients receiving the treatment showed measurable cognitive improvement after 12 months, compared to just 12% in the placebo group.

    The therapy, developed by biotech startup NeuroGene, works by delivering genes that promote the production of a protein called BDNF (brain-derived neurotrophic factor), which helps protect and regenerate neurons.

    "We're seeing not just a slowing of cognitive decline, but actual improvement," said Dr. Lisa Chang, lead researcher on the study. "This is something we've never observed in Alzheimer's research before."

    The treatment involves a single injection directly into the brain's cerebrospinal fluid, a minimally invasive procedure that researchers say could be widely accessible if approved.

    NeuroGene plans to begin Phase 3 trials later this year, with hopes of FDA approval within five years. If successful, the treatment could transform how we approach Alzheimer's disease.

    Currently, over 55 million people worldwide live with dementia, with Alzheimer's accounting for 60-70% of cases.`,
    category: 'Health',
    source: 'STAT News',
    author: 'Dr. Rachel Kim',
    publishedAt: '2026-03-26T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&auto=format&fit=crop',
    readTime: 5,
    isBookmarked: false,
    aiSummary: 'Gene therapy from NeuroGene showed 67% cognitive improvement in early-stage Alzheimer\'s patients vs 12% in placebo. The treatment delivers genes that produce BDNF protein to protect and regenerate neurons. Phase 3 trials are planned for later this year, with potential FDA approval within five years.'
  },
  {
    id: '8',
    title: 'Remote Work Revolution: Companies Embrace Four-Day Week',
    summary: 'Major corporations report higher productivity and employee satisfaction after switching to shorter workweeks.',
    content: `A growing number of major corporations are experimenting with four-day workweeks, with early results suggesting that reduced hours can lead to higher productivity, better employee well-being, and improved retention rates.

    Microsoft's Japan subsidiary reported a 40% increase in productivity after implementing a four-day workweek, while Unilever's UK pilot program showed similar positive outcomes with no reduction in output.

    The movement has gained significant momentum as companies compete for talent in a tight labor market and seek to address employee burnout concerns that emerged during the pandemic.

    "The traditional five-day workweek is a relic of the industrial age," said organizational psychologist Dr. Erin McFee. "We're learning that hours worked is a poor proxy for value created."

    Companies that have adopted the four-day week report:
    - 15-20% reduction in employee turnover
    - 25% decrease in sick days taken
    - Higher employee engagement scores
    - Improved recruitment competitiveness

    However, critics argue that the model doesn't work for all industries. Manufacturing, healthcare, and service sectors face unique challenges in implementing shortened workweeks.

    Several European countries are now exploring legislation to make the four-day week a legal option for workers, with Spain piloting a nationwide program.`,
    category: 'Business',
    source: 'Harvard Business Review',
    author: 'Thomas Wright',
    publishedAt: '2026-03-25T20:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop',
    readTime: 5,
    isBookmarked: true,
    aiSummary: 'Major companies like Microsoft and Unilever report 40% productivity gains with four-day workweeks. Benefits include 15-20% lower turnover, fewer sick days, and higher engagement. While the model doesn\'t suit all industries, several European countries are piloting nationwide four-day week programs.'
  },
  {
    id: '9',
    title: 'Cryptocurrency Regulation Framework Takes Shape',
    summary: 'G20 nations agree on comprehensive crypto regulations aimed at protecting investors and preventing illicit use.',
    content: `Finance ministers from the world's largest economies have reached a landmark agreement on comprehensive cryptocurrency regulation, creating a unified framework that aims to balance innovation with consumer protection.

    The agreement, reached at the G20 summit in New Delhi, establishes common standards for:
    - Consumer protection and disclosure requirements
    - Anti-money laundering (AML) and know-your-customer (KYC) protocols
    - Taxation of crypto assets
    - Cross-border cooperation on enforcement

    "This framework will provide clarity for businesses and confidence for consumers," said US Treasury Secretary Janet Yellen. "We\'re not trying to stifle innovation, but we need to ensure that innovation doesn\'t come at the cost of investor protection."

    Key provisions include:
    - Mandatory registration for crypto exchanges
    - Reserve backing requirements for stablecoins
    - Enhanced reporting for transactions over $3,000
    - Harmonized taxation rules across member nations

    The crypto industry has generally welcomed the move, with many executives saying that clear regulation will help legitimize the industry and encourage mainstream adoption.

    Implementation will begin in 2027, giving companies time to adapt their systems and practices to meet the new requirements.`,
    category: 'Finance',
    source: 'CoinDesk',
    author: 'Marcus Johnson',
    publishedAt: '2026-03-25T16:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&auto=format&fit=crop',
    readTime: 4,
    isBookmarked: false,
    aiSummary: 'G20 nations agreed on comprehensive crypto regulations covering consumer protection, AML/KYC, and taxation. Key provisions include mandatory exchange registration, stablecoin reserve requirements, and enhanced transaction reporting. Implementation begins in 2027, with the crypto industry generally welcoming clearer rules.'
  },
  {
    id: '10',
    title: 'Urban Farming Revolution: Vertical Gardens Feed Cities',
    summary: 'Skyrise agriculture projects produce fresh vegetables for urban residents while reducing food miles to zero.',
    content: `Cities around the world are embracing vertical farming as a solution to food security, climate change, and the environmental costs of long-distance food transportation.

    New York, Singapore, Tokyo, and Dubai have all announced major vertical farming initiatives that will produce fresh vegetables in the heart of urban areas, eliminating "food miles" and ensuring year-round crop production regardless of climate.

    "Vertical farming represents a fundamental shift in how we think about food production," said Dr. Hiroki Tanaka, founder of Sky Greens, one of the leading companies in the industry. "We can grow food where people live, using 95% less water than traditional agriculture."

    Key benefits of vertical farming include:
    - Year-round production independent of weather
    - 95% less water usage than field farming
    - Zero pesticides or herbicides
    - Reduced transportation emissions
    - Fresh produce available within hours of harvest

    The technology uses LED lighting optimized for plant growth, automated nutrient delivery systems, and sophisticated climate control to maximize yields in minimal space.

    Investment in vertical farming has tripled over the past two years, with the industry projected to reach $20 billion by 2030. Several major grocery chains have already committed to sourcing from local vertical farms.

    Critics note that the high energy costs of artificial lighting remain a challenge, though many companies are transitioning to renewable energy sources.`,
    category: 'Environment',
    source: 'National Geographic',
    author: 'Lisa Chen',
    publishedAt: '2026-03-25T12:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop',
    readTime: 6,
    isBookmarked: false,
    aiSummary: 'Major cities are adopting vertical farming to produce fresh vegetables locally, using 95% less water than traditional agriculture. The industry is projected to reach $20 billion by 2030, with companies using LED lighting and automated systems. Critics note high energy costs, though many are transitioning to renewables.'
  },
  {
    id: '11',
    title: 'The Renaissance of Vinyl: Record Sales Hit 30-Year High',
    summary: 'Vinyl records outsell CDs for first time since 1987 as music lovers embrace physical media.',
    content: `In a surprising twist for the digital age, vinyl record sales have reached their highest level since 1987, with over 40 million units sold in the US alone last year - outselling CDs for the first time in nearly four decades.

    The resurgence of vinyl has been driven by younger generations discovering the tactile pleasure of physical music collections, as well as older audiophiles who appreciate the warm sound quality that vinyl provides.

    "There's something magical about dropping a needle on a record," said 24-year-old musician and vinyl collector Maya Rodriguez. "It\'s a more intentional way of listening to music. You\'re not just shuffling through a playlist."

    Record stores, once thought to be endangered species, have experienced a renaissance. Over 200 new vinyl-focused record stores have opened in the US in the past two years.

    Artists have embraced the format, with major releases often including vinyl editions as standard. Limited edition colored vinyl pressings have become collector's items, sometimes selling for hundreds of dollars.

    The vinyl trend is part of a broader appreciation for physical media in a streaming-dominated world. Film enthusiasts have also seen a similar resurgence in vinyl soundtracks and boutique Blu-ray releases.

    Industry analysts predict vinyl sales will continue to grow, with some projecting 50 million units annually by 2028.`,
    category: 'Culture',
    source: 'Rolling Stone',
    author: 'James Morrison',
    publishedAt: '2026-03-24T18:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=800&auto=format&fit=crop',
    readTime: 4,
    isBookmarked: false,
    aiSummary: 'Vinyl sales hit a 30-year high of 40 million units in the US, outselling CDs for the first time since 1987. Younger generations are embracing the tactile experience while audiophiles appreciate the sound quality. Over 200 new vinyl-focused record stores have opened, with industry projections of continued growth.'
  },
  {
    id: '12',
    title: 'Neural Interface Allows Paralyzed Patients to Control Devices',
    summary: 'Brain-computer interface breakthrough enables thought-based control of smartphones and computers.',
    content: `A revolutionary brain-computer interface (BCI) has allowed paralyzed patients to control smartphones and computers with their thoughts, marking a major breakthrough in assistive technology.

    The system, developed by researchers at Stanford University and the company Neuralink, uses tiny electrodes implanted in the brain to decode neural activity and translate it into digital commands.

    In clinical trials, three patients with paralysis were able to type at 60 words per minute - roughly the speed of able-bodied typing - and perform complex tasks like browsing the internet and playing video games.

    "This is giving people their independence back," said Dr. Jaimie Henderson, the neurosurgeon who led the research. "These patients can communicate, access information, and interact with the digital world in ways that were previously impossible."

    The technology works by:
    - Implanting 1,024 microelectrodes in the motor cortex
    - Using machine learning algorithms to decode neural signals
    - Translating thoughts into cursor movements and clicks
    - Connecting to external devices via Bluetooth

    While the current version requires surgical implantation, the company is developing a less invasive version that could be placed under the scalp rather than in the brain.

    FDA approval for broader clinical trials is expected next year, with hopes that the technology could become commercially available within five years.`,
    category: 'Science',
    source: 'MIT Technology Review',
    author: 'Dr. Robert Zhang',
    publishedAt: '2026-03-24T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop',
    readTime: 5,
    isBookmarked: false,
    aiSummary: 'A brain-computer interface developed by Stanford and Neuralink allows paralyzed patients to type at 60 words per minute using thoughts. The system uses 1,024 microelectrodes to decode neural activity. FDA approval for broader trials is expected next year, with commercial availability projected within five years.'
  }
];

// Categories
const categories = [
  { id: 'all', name: 'All News', color: 'default' },
  { id: 'Technology', name: 'Technology', color: 'burgundy' },
  { id: 'Business', name: 'Business', color: 'gold' },
  { id: 'Finance', name: 'Finance', color: 'sage' },
  { id: 'Science', name: 'Science', color: 'slate' },
  { id: 'World', name: 'World', color: 'burgundy' },
  { id: 'Health', name: 'Health', color: 'sage' },
  { id: 'Environment', name: 'Environment', color: 'gold' },
  { id: 'Culture', name: 'Culture', color: 'slate' },
];

// Icons as SVG components
const BookmarkIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// Article Card Component
function ArticleCard({
  article,
  onBookmark,
  onRead,
  index
}: {
  article: Article;
  onBookmark: (id: string) => void;
  onRead: (article: Article) => void;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className={`news-card animate-fade-in-up delay-${(index % 5 + 1) * 100}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="card-image-wrapper" onClick={() => onRead(article)}>
        <img
          src={article.imageUrl}
          alt={article.title}
          onLoad={() => setImageLoaded(true)}
          className={imageLoaded ? 'loaded' : ''}
        />
        <span className={`category-tag tag-${categories.find(c => c.id === article.category)?.color || 'default'}`}>
          {article.category}
        </span>
      </div>

      <div className="card-content">
        <div className="card-meta">
          <span className="source">{article.source}</span>
          <span className="separator">•</span>
          <span className="time">
            <ClockIcon />
            {article.readTime} min read
          </span>
        </div>

        <h3 className="card-title" onClick={() => onRead(article)}>
          {article.title}
        </h3>

        <p className="card-summary">{article.summary}</p>

        {article.aiSummary && (
          <div className="ai-summary">
            <span className="ai-badge">
              <SparklesIcon />
              AI Summary
            </span>
            <p>{article.aiSummary}</p>
          </div>
        )}

        <div className="card-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => onRead(article)}>
            Read Article
          </button>
          <button
            className={`btn btn-icon bookmark-btn ${article.isBookmarked ? 'bookmarked' : ''}`}
            onClick={() => onBookmark(article.id)}
            aria-label={article.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <BookmarkIcon filled={article.isBookmarked} />
          </button>
        </div>
      </div>
    </article>
  );
}

// Reading Mode Component
function ReadingMode({
  article,
  onClose
}: {
  article: Article;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="reading-mode">
      <button className="close-reading-btn" onClick={onClose}>
        <XIcon />
        Close Reading Mode
      </button>

      <div className="reading-container">
        <header className="reading-header">
          <span className={`category-tag tag-${categories.find(c => c.id === article.category)?.color || 'default'}`}>
            {article.category}
          </span>
          <h1>{article.title}</h1>
          <div className="reading-meta">
            <span className="author">By {article.author}</span>
            <span className="separator">•</span>
            <span className="source">{article.source}</span>
            <span className="separator">•</span>
            <span className="date">{new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </header>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="reading-image"
        />

        {article.aiSummary && (
          <div className="reading-ai-summary">
            <div className="ai-summary-header">
              <SparklesIcon />
              <span>AI Summary</span>
            </div>
            <p>{article.aiSummary}</p>
          </div>
        )}

        <div className="reading-content">
          {article.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function NewsAggregator() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmarks = !showBookmarks || article.isBookmarked;
    return matchesCategory && matchesSearch && matchesBookmarks;
  });

  // Toggle bookmark
  const handleBookmark = (id: string) => {
    setArticles(prev => prev.map(article =>
      article.id === id
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
  };

  // Open reading mode
  const handleRead = (article: Article) => {
    setReadingArticle(article);
  };

  // Close reading mode
  const handleCloseReading = () => {
    setReadingArticle(null);
  };

  // Get bookmark count
  const bookmarkCount = articles.filter(a => a.isBookmarked).length;

  return (
    <div className="dashboard" style={{ display: 'block', minHeight: '100vh' }}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">✦</span>
            <span className="logo-text">NewsWire</span>
          </div>

          <div className="header-actions">
            <div className="search-wrapper">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <XIcon />
                </button>
              )}
            </div>

            <button
              className={`btn bookmarks-btn ${showBookmarks ? 'active' : ''}`}
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <BookmarkIcon filled={showBookmarks} />
              <span>Saved</span>
              {bookmarkCount > 0 && <span className="badge">{bookmarkCount}</span>}
            </button>

            <button
              className="btn btn-icon mobile-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Category Navigation */}
        <nav className={`category-nav ${showFilters ? 'show' : ''}`}>
          <div className="category-scroll">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowFilters(false);
                }}
              >
                <span className={`category-dot tag-${category.color}`}></span>
                {category.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Featured Section */}
        {activeCategory === 'all' && !searchQuery && !showBookmarks && (
          <section className="featured-section">
            <div className="featured-card animate-fade-in-up">
              <img
                src={articles[0].imageUrl}
                alt={articles[0].title}
                className="featured-image"
              />
              <div className="featured-content">
                <span className={`category-tag tag-${categories.find(c => c.id === articles[0].category)?.color || 'default'}`}>
                  {articles[0].category}
                </span>
                <h2>{articles[0].title}</h2>
                <p>{articles[0].summary}</p>
                {articles[0].aiSummary && (
                  <div className="featured-ai">
                    <SparklesIcon />
                    <span>{articles[0].aiSummary}</span>
                  </div>
                )}
                <div className="featured-actions">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRead(articles[0])}
                  >
                    Read Full Story
                  </button>
                  <button
                    className={`btn btn-icon ${articles[0].isBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => handleBookmark(articles[0].id)}
                  >
                    <BookmarkIcon filled={articles[0].isBookmarked} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="articles-section">
          <div className="section-header">
            <h2>
              {showBookmarks
                ? 'Saved Articles'
                : activeCategory === 'all'
                  ? 'Latest News'
                  : `${activeCategory} News`
              }
            </h2>
            <span className="article-count">{filteredArticles.length} articles</span>
          </div>

          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                onBookmark={handleBookmark}
                onRead={handleRead}
                index={activeCategory === 'all' && !searchQuery && !showBookmarks ? index + 1 : index}
              />
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">📰</span>
              <h3>No articles found</h3>
              <p>Try adjusting your filters or search query</p>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                  setShowBookmarks(false);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">✦</span>
            <span className="logo-text">NewsWire</span>
          </div>
          <p className="footer-tagline">AI-Powered News for the Modern Reader</p>
          <p className="footer-copy">© 2026 NewsWire. All rights reserved.</p>
        </div>
      </footer>

      {/* Reading Mode Modal */}
      {readingArticle && (
        <ReadingMode
          article={readingArticle}
          onClose={handleCloseReading}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        /* Header Styles */
        .header {
          position: sticky;
          top: 0;
          background: rgba(247, 244, 239, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-paper-dark);
          z-index: 100;
        }
        
        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-md) var(--space-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-lg);
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .logo-icon {
          font-size: 1.5rem;
          color: var(--color-accent-burgundy);
        }
        
        .logo-text {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-ink);
        }
        
        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        
        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-wrapper svg {
          position: absolute;
          left: var(--space-md);
          color: var(--color-ink-muted);
        }
        
        .search-wrapper input {
          padding-left: 2.5rem;
          padding-right: 2.5rem;
          width: 280px;
          height: 42px;
          border-radius: var(--radius-lg);
        }
        
        .clear-search {
          position: absolute;
          right: var(--space-sm);
          padding: var(--space-xs);
          color: var(--color-ink-muted);
          cursor: pointer;
        }
        
        .clear-search:hover {
          color: var(--color-ink);
        }
        
        .bookmarks-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
        }
        
        .bookmarks-btn.active {
          background: var(--color-ink);
          color: var(--color-paper);
        }
        
        .bookmarks-btn .badge {
          margin-left: var(--space-xs);
        }
        
        .mobile-filter-btn {
          display: none;
        }
        
        /* Category Navigation */
        .category-nav {
          background: var(--color-paper);
          border-bottom: 1px solid var(--color-paper-dark);
          padding: var(--space-sm) 0;
        }
        
        .category-scroll {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--space-lg);
          display: flex;
          gap: var(--space-sm);
          overflow-x: auto;
          scrollbar-width: none;
        }
        
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .category-btn {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-ink-muted);
          background: transparent;
          border-radius: var(--radius-md);
          white-space: nowrap;
          transition: all var(--transition-fast);
        }
        
        .category-btn:hover {
          color: var(--color-ink);
          background: var(--color-paper-dark);
        }
        
        .category-btn.active {
          color: var(--color-ink);
          background: var(--color-ink);
          color: var(--color-paper);
        }
        
        .category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        
        .category-dot.tag-burgundy { background: var(--color-accent-burgundy); }
        .category-dot.tag-gold { background: var(--color-accent-gold); }
        .category-dot.tag-sage { background: var(--color-accent-sage); }
        .category-dot.tag-slate { background: var(--color-accent-slate); }
        .category-dot.default { background: var(--color-ink-muted); }
        
        /* Main Content */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: var(--space-xl) var(--space-lg);
        }
        
        /* Featured Section */
        .featured-section {
          margin-bottom: var(--space-3xl);
        }
        
        .featured-card {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: var(--space-xl);
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        
        .featured-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
        }
        
        .featured-content {
          padding: var(--space-xl);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        
        .featured-content h2 {
          font-size: 2rem;
          line-height: 1.2;
        }
        
        .featured-content p {
          color: var(--color-ink-light);
          font-size: 1.0625rem;
        }
        
        .featured-ai {
          display: flex;
          align-items: flex-start;
          gap: var(--space-sm);
          padding: var(--space-md);
          background: rgba(139, 35, 50, 0.05);
          border-radius: var(--radius-md);
          font-size: 0.9375rem;
          color: var(--color-ink-light);
        }
        
        .featured-ai svg {
          color: var(--color-accent-burgundy);
          flex-shrink: 0;
          margin-top: 2px;
        }
        
        .featured-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-top: auto;
        }
        
        /* Articles Section */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: var(--space-lg);
        }
        
        .section-header h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
        }
        
        .article-count {
          font-size: 0.875rem;
          color: var(--color-ink-muted);
        }
        
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
        }
        
        /* News Card */
        .news-card {
          background: #FFFFFF;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }
        
        .news-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-4px);
        }
        
        .card-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
          cursor: pointer;
        }
        
        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity var(--transition-slow), transform var(--transition-slow);
        }
        
        .card-image-wrapper img.loaded {
          opacity: 1;
        }
        
        .news-card:hover .card-image-wrapper img {
          transform: scale(1.05);
        }
        
        .category-tag {
          position: absolute;
          top: var(--space-md);
          left: var(--space-md);
        }
        
        .card-content {
          padding: var(--space-lg);
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
        }
        
        .card-meta {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-size: 0.8125rem;
          color: var(--color-ink-muted);
        }
        
        .card-meta .separator {
          color: var(--color-paper-dark);
        }
        
        .card-meta .time {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
        }
        
        .card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
          cursor: pointer;
          transition: color var(--transition-fast);
        }
        
        .card-title:hover {
          color: var(--color-accent-burgundy);
        }
        
        .card-summary {
          font-size: 0.9375rem;
          color: var(--color-ink-light);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .ai-summary {
          padding: var(--space-md);
          background: rgba(139, 35, 50, 0.04);
          border-radius: var(--radius-md);
          border-left: 3px solid var(--color-accent-burgundy);
        }
        
        .ai-summary .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-accent-burgundy);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: var(--space-xs);
        }
        
        .ai-summary p {
          font-size: 0.875rem;
          color: var(--color-ink-light);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: var(--space-sm);
          padding-top: var(--space-md);
          border-top: 1px solid var(--color-paper-dark);
        }
        
        .btn-sm {
          padding: var(--space-xs) var(--space-md);
          font-size: 0.8125rem;
        }
        
        .bookmark-btn {
          color: var(--color-ink-muted);
        }
        
        .bookmark-btn:hover,
        .bookmark-btn.bookmarked {
          color: var(--color-accent-gold);
        }
        
        /* Reading Mode */
        .reading-mode {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-paper);
          z-index: 1000;
          overflow-y: auto;
        }
        
        .close-reading-btn {
          position: fixed;
          top: var(--space-lg);
          right: var(--space-lg);
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: var(--space-sm) var(--space-md);
          background: var(--color-ink);
          color: var(--color-paper);
          border-radius: var(--radius-lg);
          font-weight: 500;
          z-index: 1001;
          transition: all var(--transition-fast);
        }
        
        .close-reading-btn:hover {
          background: var(--color-accent-burgundy);
        }
        
        .reading-container {
          max-width: 720px;
          margin: 0 auto;
          padding: var(--space-4xl) var(--space-lg);
        }
        
        .reading-header {
          margin-bottom: var(--space-xl);
        }
        
        .reading-header h1 {
          margin: var(--space-md) 0;
        }
        
        .reading-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-sm);
          font-size: 0.9375rem;
          color: var(--color-ink-muted);
        }
        
        .reading-meta .separator {
          color: var(--color-paper-dark);
        }
        
        .reading-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
        }
        
        .reading-ai-summary {
          padding: var(--space-lg);
          background: rgba(139, 35, 50, 0.06);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-xl);
        }
        
        .ai-summary-header {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          font-weight: 600;
          color: var(--color-accent-burgundy);
          margin-bottom: var(--space-sm);
        }
        
        .reading-ai-summary p {
          font-size: 1.0625rem;
          color: var(--color-ink-light);
          line-height: 1.7;
        }
        
        .reading-content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--color-ink-light);
        }
        
        .reading-content p {
          margin-bottom: var(--space-lg);
        }
        
        /* No Results */
        .no-results {
          text-align: center;
          padding: var(--space-4xl) var(--space-lg);
        }
        
        .no-results-icon {
          font-size: 4rem;
          display: block;
          margin-bottom: var(--space-lg);
        }
        
        .no-results h3 {
          margin-bottom: var(--space-sm);
        }
        
        .no-results p {
          margin-bottom: var(--space-lg);
        }
        
        /* Footer */
        .footer {
          background: var(--color-ink);
          color: var(--color-paper);
          padding: var(--space-3xl) var(--space-lg);
          margin-top: var(--space-4xl);
        }
        
        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          text-align: center;
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-sm);
          margin-bottom: var(--space-md);
        }
        
        .footer-brand .logo-icon {
          color: var(--color-accent-gold);
        }
        
        .footer-brand .logo-text {
          color: var(--color-paper);
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .footer-tagline {
          color: var(--color-ink-muted);
          margin-bottom: var(--space-lg);
        }
        
        .footer-copy {
          font-size: 0.875rem;
          color: var(--color-ink-muted);
        }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .featured-card {
            grid-template-columns: 1fr;
          }
          
          .featured-image {
            height: 300px;
          }
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-wrap: wrap;
          }
          
          .search-wrapper {
            order: 3;
            width: 100%;
          }
          
          .search-wrapper input {
            width: 100%;
          }
          
          .mobile-filter-btn {
            display: flex;
          }
          
          .category-nav {
            display: none;
          }
          
          .category-nav.show {
            display: block;
            position: fixed;
            top: 120px;
            left: 0;
            right: 0;
            background: var(--color-paper);
            padding: var(--space-lg);
            box-shadow: var(--shadow-lg);
            z-index: 99;
          }
          
          .category-scroll {
            flex-direction: column;
            padding: 0;
          }
          
          .category-btn {
            padding: var(--space-md);
          }
          
          .articles-grid {
            grid-template-columns: 1fr;
          }
          
          .reading-container {
            padding: var(--space-3xl) var(--space-md);
          }
          
          .reading-image {
            height: 250px;
          }
          
          .close-reading-btn {
            top: var(--space-md);
            right: var(--space-md);
          }
        }
      `}</style>
    </div>
  );
}
