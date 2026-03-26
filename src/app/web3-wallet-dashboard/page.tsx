'use client';

import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// SVG Icons
const Icons = {
  Logo: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Wallet: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 4H3a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V6a2 2 0 00-2-2z" />
      <path d="M1 10h22" />
    </svg>
  ),
  Transactions: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  Analytics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
  Security: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  Receive: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  Swap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
    </svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <path d="M22 4L12 14.01l-3-3" />
    </svg>
  ),
};

// Mock Data Types
interface Token {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  value: number;
  change: number;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'swap';
  token: string;
  amount: number;
  value: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
}

// Mock Data
const STATS_DATA = [
  { label: 'Total Balance', value: '$128,432', change: '+12.5%', positive: true, icon: Icons.Wallet, iconClass: 'balance' },
  { label: 'Portfolio Value', value: '$142,891', change: '+8.3%', positive: true, icon: Icons.Transactions, iconClass: 'portfolio' },
  { label: 'Transactions', value: '1,247', change: '+23.1%', positive: true, icon: Icons.Analytics, iconClass: 'transactions' },
  { label: 'Security Score', value: '98/100', change: 'A+', positive: true, icon: Icons.Security, iconClass: 'security' },
];

const TOKENS_DATA: Token[] = [
  { id: '1', name: 'Bitcoin', symbol: 'BTC', amount: 1.847, value: 89432.50, change: 2.34 },
  { id: '2', name: 'Ethereum', symbol: 'ETH', amount: 12.56, value: 28432.80, change: -1.23 },
  { id: '3', name: 'Solana', symbol: 'SOL', amount: 156.78, value: 12345.67, change: 5.67 },
  { id: '4', name: 'Cardano', symbol: 'ADA', amount: 5000, value: 4221.92, change: -0.89 },
];

const TRANSACTIONS_DATA: Transaction[] = [
  { id: '1', type: 'send', token: 'BTC', amount: 0.05, value: 2421.50, status: 'completed', date: 'Mar 25, 14:32' },
  { id: '2', type: 'receive', token: 'ETH', amount: 2.5, value: 5660.00, status: 'completed', date: 'Mar 25, 10:15' },
  { id: '3', type: 'swap', token: 'SOL', amount: 50, value: 3928.50, status: 'completed', date: 'Mar 24, 18:45' },
  { id: '4', type: 'send', token: 'ETH', amount: 1.0, value: 2264.00, status: 'pending', date: 'Mar 24, 09:22' },
  { id: '5', type: 'receive', token: 'BTC', amount: 0.12, value: 5811.60, status: 'completed', date: 'Mar 23, 16:08' },
];

const ALERTS_DATA: Alert[] = [
  { id: '1', type: 'critical', title: 'Unusual Login Detected', message: 'New device login from Singapore. Verify if this was you.', time: '2 hours ago' },
  { id: '2', type: 'warning', title: 'High Gas Fees', message: 'Ethereum network fees are currently 40% higher than usual.', time: '5 hours ago' },
  { id: '3', type: 'info', title: 'Wallet Backup Reminder', message: 'Your wallet backup is recommended for enhanced security.', time: '1 day ago' },
  { id: '4', type: 'success', title: 'Security Audit Passed', message: 'Your wallet passed all security checks successfully.', time: '2 days ago' },
];

const PORTFOLIO_CHART_DATA = [
  { name: 'Jan', value: 85000 },
  { name: 'Feb', value: 92000 },
  { name: 'Mar', value: 88000 },
  { name: 'Apr', value: 105000 },
  { name: 'May', value: 112000 },
  { name: 'Jun', value: 108000 },
  { name: 'Jul', value: 128432 },
];

const ALLOCATION_DATA = [
  { name: 'Bitcoin', value: 70, color: '#f7931a' },
  { name: 'Ethereum', value: 22, color: '#627eea' },
  { name: 'Others', value: 8, color: '#00ff88' },
];

const COLORS = ['#f7931a', '#627eea', '#00ff88'];

// Tooltip
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1a1a1a',
        border: '1px solid #2a2a2a',
        borderRadius: '4px',
        padding: '8px 12px'
      }}>
        <p style={{ color: '#888', fontSize: '12px' }}>${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function Web3WalletDashboard() {
  const [activeChartTab, setActiveChartTab] = useState('7D');
  const chartTabs = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <div className="dashboard-content">
      {/* Stats Grid */}
      <section className="dashboard-grid">
        {STATS_DATA.map((stat, index) => {
          const IconComponent = stat.icon as React.ComponentType;
          return (
            <div key={stat.label} className={`stat-card animate-fade-in-up delay-${index + 1}`}>
              <div className={`stat-icon ${stat.iconClass}`}>
                <IconComponent />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? '↑' : '↓'} {stat.change}
              </div>
            </div>
          );
        })}
      </section>

      {/* Charts Section */}
      <section className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Portfolio Performance</h3>
            <div className="chart-tabs">
              {chartTabs.map((tab) => (
                <button
                  key={tab}
                  className={`chart-tab ${activeChartTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveChartTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="name" stroke="#555" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#555" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#00ff88" strokeWidth={2} fill="url(#chartGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Asset Allocation</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {ALLOCATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '-20px' }}>
              {ALLOCATION_DATA.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{ color: '#888' }}>{item.name}</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Token Balances */}
      <section className="tokens-section">
        <div className="section-header">
          <h2 className="section-title">Token Balances</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <div className="tokens-grid">
          {TOKENS_DATA.map((token) => (
            <div key={token.id} className="token-card">
              <div className={`token-icon ${token.symbol.toLowerCase()}`}>
                {token.symbol === 'BTC' && <Icons.Wallet />}
                {token.symbol === 'ETH' && <Icons.Security />}
                {token.symbol === 'SOL' && <Icons.Analytics />}
                {token.symbol === 'ADA' && <Icons.Settings />}
              </div>
              <div className="token-info">
                <div className="token-name">{token.name}</div>
                <div className="token-symbol">{token.symbol}</div>
              </div>
              <div className="token-values">
                <div className="token-amount">{token.amount.toLocaleString()}</div>
                <div className="token-value">${token.value.toLocaleString()}</div>
                <div className={`token-change ${token.change >= 0 ? 'positive' : 'negative'}`}>
                  {token.change >= 0 ? '↑' : '↓'} {Math.abs(token.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Transaction History */}
      <section className="transactions-section">
        <div className="section-header">
          <h2 className="section-title">Recent Transactions</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <div className="transactions-table">
          <div className="table-header">
            <span>Transaction</span>
            <span>Amount</span>
            <span>Value</span>
            <span>Status</span>
            <span>Date</span>
          </div>
          {TRANSACTIONS_DATA.map((tx) => (
            <div key={tx.id} className="table-row">
              <div className="tx-info">
                <div className={`tx-icon ${tx.type}`}>
                  {tx.type === 'send' && <Icons.Send />}
                  {tx.type === 'receive' && <Icons.Receive />}
                  {tx.type === 'swap' && <Icons.Swap />}
                </div>
                <div className="tx-details">
                  <h4>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} {tx.token}</h4>
                  <p>{tx.type === 'swap' ? 'Swap' : `${tx.type === 'send' ? 'To' : 'From'} wallet`}</p>
                </div>
              </div>
              <div className="tx-amount">{tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}</div>
              <div className={`tx-amount ${tx.type === 'send' ? 'negative' : 'positive'}`}>${tx.value.toLocaleString()}</div>
              <div className="tx-status">
                <span className={`status-dot ${tx.status}`} />
                <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
              </div>
              <div className="tx-date">{tx.date}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Alerts */}
      <section className="alerts-section">
        <div className="section-header">
          <h2 className="section-title">Security Alerts</h2>
          <a href="#" className="view-all">View All →</a>
        </div>
        <div className="alerts-grid">
          {ALERTS_DATA.map((alert) => (
            <div key={alert.id} className={`alert-card ${alert.type}`}>
              <div className="alert-icon">
                {alert.type === 'critical' && <Icons.Alert />}
                {alert.type === 'warning' && <Icons.Alert />}
                {alert.type === 'info' && <Icons.Info />}
                {alert.type === 'success' && <Icons.Check />}
              </div>
              <div className="alert-content">
                <span className="alert-severity">
                  {alert.type === 'critical' && '🔴 Critical'}
                  {alert.type === 'warning' && '🟡 Warning'}
                  {alert.type === 'info' && '🔵 Info'}
                  {alert.type === 'success' && '🟢 Success'}
                </span>
                <h4>{alert.title}</h4>
                <p>{alert.message}</p>
                <div className="alert-meta">
                  <span className="alert-time">{alert.time}</span>
                  {alert.type === 'critical' && <span className="alert-action">Take Action →</span>}
                  {alert.type === 'warning' && <span className="alert-action">View Details →</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2 className="section-title">Analytics Overview</h2>
        </div>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-value">87%</div>
            <div className="analytics-label">Portfolio Growth</div>
            <div className="analytics-stats">
              <div className="analytics-stat">
                <span className="analytics-stat-value">+$18,432</span>
                <span className="analytics-stat-label">This Month</span>
              </div>
              <div className="analytics-stat">
                <span className="analytics-stat-value analytics-trend positive">↑ 12.5%</span>
                <span className="analytics-stat-label">vs Last Month</span>
              </div>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-value">2.4s</div>
            <div className="analytics-label">Avg. Transaction Time</div>
            <div className="analytics-stats">
              <div className="analytics-stat">
                <span className="analytics-stat-value">1,247</span>
                <span className="analytics-stat-label">Total TX</span>
              </div>
              <div className="analytics-stat">
                <span className="analytics-stat-value analytics-trend positive">↑ 23%</span>
                <span className="analytics-stat-label">vs Last Month</span>
              </div>
            </div>
          </div>
          <div className="analytics-card">
            <div className="analytics-value">$0</div>
            <div className="analytics-label">Unsecured Assets</div>
            <div className="analytics-stats">
              <div className="analytics-stat">
                <span className="analytics-stat-value">100%</span>
                <span className="analytics-stat-label">Secured</span>
              </div>
              <div className="analytics-stat">
                <span className="analytics-stat-value analytics-trend positive">A+</span>
                <span className="analytics-stat-label">Security Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
