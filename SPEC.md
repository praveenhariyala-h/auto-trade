# Indian Market Trading Application - Specification

## Project Overview
- **Project Name**: TradePulse India
- **Type**: Next.js 14+ Web Application with Node.js Backend
- **Core Functionality**: Real-time trading dashboard for Indian stock markets with market analysis, trade execution, and portfolio management
- **Target Users**: Indian retail traders and investors

---

## UI/UX Specification

### Layout Structure

**Main Container**
- Full viewport height application (100vh)
- Fixed header (60px height)
- Tab navigation bar (48px height)
- Main content area (calc(100vh - 108px))

**Tab 1: Market Analysis Dashboard**
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Market Status | User Profile                 │
├──────────────┬──────────────────────────────────────────────┤
│   Sidebar    │           TradingView Chart                  │
│   (280px)    │           (NSE:NIFTY)                        │
│              │                                              │
│ Live Signals │                                              │
│ - DeepTracker│                                              │
│ - Choice     │                                              │
│              │                                              │
├──────────────┴──────────────────────────────────────────────┤
│ News Ticker (40px height) - Continuous scroll               │
└─────────────────────────────────────────────────────────────┘
```

**Tab 2: Trade Dashboard**
```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logo | Market Status | User Profile                │
├─────────────────────────────────────────────────────────────┤
│  Trade Execution Panel                                     │
│  ┌─────────┬──────────┬──────────┬──────────────────────┐  │
│  │ Instrument│Order Type│Product Type│  BUY   │  SELL   │  │
│  │ [NIFTY▼] │[Market▼] │ [CNC▼]   │  [●]   │  [●]   │  │
│  └─────────┴──────────┴──────────┴──────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  Live Portfolio Table                                       │
│  ┌─────────────┬────────────┬─────────┬─────────┬────────┐ │
│  │ Instrument  │ Avg Price  │   LTP   │  P&L    │  Action│ │
│  ├─────────────┼────────────┼─────────┼─────────┼────────┤ │
│  │ NIFTY 50    │ 22,450.00  │ 22,485.30│ +35.30  │ [Close]│ │
│  │ RELIANCE    │ 2,980.50   │ 2,975.20 │ -5.30   │ [Close]│ │
│  └─────────────┴────────────┴─────────┴─────────┴────────┘ │
├─────────────────────────────────────────────────────────────┤
│  [KILL SWITCH - Emergency Exit]                             │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
- **Desktop**: >= 1280px (full layout)
- **Tablet**: 768px - 1279px (collapsed sidebar)
- **Mobile**: < 768px (stacked layout, bottom nav)

### Visual Design

**Color Palette**
- **Background Primary**: #0A0E17 (Deep navy black)
- **Background Secondary**: #111827 (Dark slate)
- **Background Tertiary**: #1F2937 (Gray slate)
- **Accent Primary**: #00D4AA (Teal/Mint green)
- **Accent Secondary**: #3B82F6 (Electric blue)
- **Positive/Buy**: #10B981 (Emerald green)
- **Negative/Sell**: #EF4444 (Red)
- **Warning**: #F59E0B (Amber)
- **Text Primary**: #F9FAFB (Off-white)
- **Text Secondary**: #9CA3AF (Gray)
- **Text Muted**: #6B7280 (Dark gray)
- **Border**: #374151 (Gray border)
- **Kill Switch**: #DC2626 (Bright red) with pulsing animation

**Typography**
- **Font Family**: 'JetBrains Mono' for numbers, 'DM Sans' for UI text
- **Headings**:
  - H1: 28px, 700 weight
  - H2: 22px, 600 weight
  - H3: 18px, 600 weight
- **Body**: 14px, 400 weight
- **Numbers/Data**: 14px, 500 weight, monospace
- **Small**: 12px, 400 weight

**Spacing System**
- Base unit: 4px
- Component padding: 16px (4 units)
- Card padding: 20px (5 units)
- Section gaps: 24px (6 units)
- Grid gap: 12px (3 units)

**Visual Effects**
- Card shadows: 0 4px 20px rgba(0, 0, 0, 0.4)
- Glassmorphism: backdrop-blur-md with 80% opacity backgrounds
- Borders: 1px solid with 10% white opacity
- Hover states: brightness(1.1) with 150ms transition
- Active states: scale(0.98) with 100ms transition
- Positive values: green glow effect
- Negative values: red glow effect
- Kill switch: pulsing red glow animation (box-shadow pulse)

### Components

**Header Component**
- Logo (left): "TradePulse" in teal accent
- Market status indicator (center): Live/Closed with green/red dot
- User avatar (right): circular with dropdown

**Tab Navigation**
- Two tabs: "Market Analysis" | "Trade Dashboard"
- Active tab: underline in teal, background highlight
- Smooth slide transition between tabs (Framer Motion)

**TradingView Widget**
- Advanced Chart widget
- Symbol: NSE:NIFTY
- Theme: Dark
- Interval: 15 minutes default
- Auto-resize container
- Proper cleanup in useEffect (remove on unmount)

**Live Signals Sidebar**
- Section: DeepTracker AI (Risk Mapping)
  - Risk Score gauge (0-100)
  - Signal: BUY/SELL/HOLD
  - Confidence percentage
  - Mini sparkline
- Section: Choice India (Weekly Predictions)
  - Prediction cards with accuracy %
  - Weekly target prices
  - Trend indicator

**News Ticker**
- Horizontal scrolling marquee
- Source icons (Moneycontrol, Investing.com)
- Click to expand headline
- Pause on hover

**Trade Execution Panel**
- Instrument selector dropdown
- Order Type: Market / Limit (with price input for Limit)
- Product Type: CNC / MIS
- Quantity input (auto-calculated based on margin)
- Buy button (green, prominent)
- Sell button (red, prominent)
- Estimated cost display

**Portfolio Table**
- Sortable columns
- Color-coded P&L (green/red)
- Real-time LTP updates (flash animation)
- Close position button
- Total P&L summary row

**Kill Switch Button**
- Large, prominent red button
- Pulsing animation to draw attention
- Confirmation modal on click
- Disabled state when no positions

---

## Functionality Specification

### Core Features

**Tab Switching**
- Framer Motion animatePresence for smooth transitions
- Tab state managed in React useState
- URL hash sync for direct linking

**TradingView Integration**
- useEffect hook for widget initialization
- Cleanup function to prevent memory leaks
- Configurable symbol and interval
- Dark theme matching app design

**Live Market Signals (Mock Data)**
- DeepTracker AI:
  - Risk Score: 45-85 (randomized)
  - Signal: Random from [BUY, SELL, HOLD]
  - Confidence: 65-95%
  - Last updated timestamp
- Choice India:
  - Weekly predictions for 3-5 instruments
  - Target price, current price, prediction accuracy
  - Auto-refresh every 30 seconds

**News Ticker**
- Mock headlines array
- Continuous scroll animation (CSS)
- News sources: Moneycontrol, Investing.com
- Click to show full headline modal

**Trade Execution**
- Form validation
- Order type toggle (Market/Limit)
- Product type toggle (CNC/MIS)
- Real-time margin calculation
- Order confirmation modal

**Portfolio Management**
- Mock portfolio data (5-10 positions)
- Real-time P&L calculation
- Position close functionality
- Summary statistics (total P&L, day's P&L)

**Kill Switch**
- Emergency close all positions
- Confirmation dialog
- Visual warning (pulsing red)
- SEBI compliance notice

**Backend - WebSocket Server**
- Node.js with ws library
- Simulated live price ticks
- Price updates every 1-2 seconds
- Connection status indicator

### User Interactions
- Tab click → smooth transition
- Signal card hover → detailed tooltip
- News headline click → modal with full article
- Buy/Sell button → order modal
- Portfolio row hover → action buttons
- Kill switch click → confirmation → execute

### Edge Cases
- Market closed state (disable trading)
- WebSocket disconnection (reconnect logic)
- Invalid order inputs (validation messages)
- Empty portfolio (placeholder message)
- Network errors (toast notifications)

---

## Technical Architecture

### Frontend (Next.js 14+)
```
/app
  /layout.tsx          - Root layout with fonts
  /page.tsx            - Main page with tabs
  /globals.css         - Tailwind + custom styles
/components
  /Header.tsx          - App header
  /TabNavigation.tsx   - Tab switcher
  /MarketDashboard.tsx - Tab 1 container
  /TradeDashboard.tsx  - Tab 2 container
  /TradingViewChart.tsx - Chart widget
  /LiveSignals.tsx    - Signal sidebar
  /NewsTicker.tsx     - News marquee
  /TradePanel.tsx     - Execution form
  /Portfolio.tsx      - Positions table
  /KillSwitch.tsx    - Emergency button
/lib
  /websocket.ts       - WebSocket client
  /mockData.ts        - Mock data generators
  /types.ts           - TypeScript types
```

### Backend (Node.js)
```
/server
  /index.js           - Express + WebSocket server
  /priceTicker.js    - Price simulation logic
```

---

## Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme applied consistently across all components
- [ ] Teal accent color visible in active elements
- [ ] Red kill switch has pulsing animation
- [ ] Smooth tab transitions with Framer Motion
- [ ] Number formatting with proper Indian currency (₹)
- [ ] P&L colors: green for positive, red for negative
- [ ] TradingView chart loads with dark theme

### Functional Checkpoints
- [ ] Tab switching works smoothly
- [ ] TradingView widget renders without console errors
- [ ] Live signals display mock data correctly
- [ ] News ticker scrolls continuously
- [ ] Trade form validates inputs
- [ ] Portfolio displays with real-time updates
- [ ] Kill switch shows confirmation modal
- [ ] WebSocket connects and receives price updates

### Technical Checkpoints
- [ ] Next.js 14+ with App Router
- [ ] Tailwind CSS configured
- [ ] Framer Motion for animations
- [ ] TradingView wrapped in useEffect
- [ ] Node.js WebSocket server running
- [ ] No memory leaks in chart component
- [ ] TypeScript types properly defined