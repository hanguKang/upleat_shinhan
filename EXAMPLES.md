# Usage Examples

## Basic Usage

The Korean Enterprise Intranet is designed to be used as a complete layout system. Here are some common usage patterns:

### 1. Basic Layout Integration

```tsx
import React from 'react';
import EnterpriseLayout from './components/Layout/EnterpriseLayout';

function App() {
  return (
    <EnterpriseLayout>
      <YourContentComponent />
    </EnterpriseLayout>
  );
}
```

### 2. Custom Content Areas

```tsx
import EnterpriseLayout from './components/Layout/EnterpriseLayout';

function MailApp() {
  return (
    <EnterpriseLayout>
      <div style={{ padding: '20px' }}>
        <h1>메일함</h1>
        <MailList />
        <MailDetail />
      </div>
    </EnterpriseLayout>
  );
}
```

### 3. Using Individual Components

```tsx
import AppIcon from './components/UI/AppIcon';

function CustomSidebar() {
  return (
    <div>
      <AppIcon 
        id="custom-app"
        icon="<svg>...</svg>"
        label="커스텀 앱"
        size="medium"
      />
      <AppIcon 
        id="special-app"
        customContent="S.A.Q"
        label="특별 앱"
        size="medium"
      />
    </div>
  );
}
```

### 4. Responsive Behavior Example

The layout automatically adjusts based on screen size:

- **Desktop (>991px)**: Full sidebar, complete header
- **Tablet (≤991px)**: Reduced sidebar, condensed header  
- **Mobile (≤640px)**: Minimal sidebar, hidden breadcrumbs

### 5. Customizing App Icons

```tsx
const myApps = [
  {
    id: 'hr',
    icon: `<svg viewBox="0 0 24 24">...</svg>`,
    label: '인사관리'
  },
  {
    id: 'finance', 
    icon: `<svg viewBox="0 0 24 24">...</svg>`,
    label: '재무관리'
  }
];

// Use in sidebar or custom layout
```

### 6. Adding New Pages/Sections

```tsx
function DocumentManager() {
  return (
    <EnterpriseLayout>
      <div className="document-manager">
        <header>
          <h1>문서관리</h1>
          <button>새 문서</button>
        </header>
        <main>
          <DocumentList />
        </main>
      </div>
    </EnterpriseLayout>
  );
}
```

### 7. State Management Integration

```tsx
import { useState } from 'react';
import EnterpriseLayout from './components/Layout/EnterpriseLayout';

function App() {
  const [currentView, setCurrentView] = useState('mail');
  
  const renderContent = () => {
    switch(currentView) {
      case 'mail': return <MailComponent />;
      case 'calendar': return <CalendarComponent />;
      case 'documents': return <DocumentsComponent />;
      default: return <DashboardComponent />;
    }
  };

  return (
    <EnterpriseLayout>
      {renderContent()}
    </EnterpriseLayout>
  );
}
```

## Styling Examples

### Custom CSS-in-JS Styles

```tsx
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const customStyle = css`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  
  @media (max-width: 640px) {
    padding: 12px;
  }
`;

function MyComponent() {
  return <div css={customStyle}>Content</div>;
}
```

### Using CSS Variables

```css
.my-component {
  background-color: var(--primary-blue);
  color: var(--primary-white);
  border: 1px solid var(--border-gray);
}
```

## Integration Patterns

### With React Router

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnterpriseLayout from './components/Layout/EnterpriseLayout';

function App() {
  return (
    <BrowserRouter>
      <EnterpriseLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mail" element={<Mail />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </EnterpriseLayout>
    </BrowserRouter>
  );
}
```

### With Context/State Management

```tsx
import { createContext, useContext } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  return (
    <AppContext.Provider value={{ user, notifications }}>
      <EnterpriseLayout>
        {children}
      </EnterpriseLayout>
    </AppContext.Provider>
  );
}
```

## Common Customizations

### 1. Changing Colors

Update the CSS variables in `src/styles/globals.css`:

```css
:root {
  --primary-blue: #1a365d; /* Your brand color */
  --primary-white: #ffffff;
  --border-gray: #e2e8f0;
}
```

### 2. Adding New Fonts

```css
@font-face {
  font-family: 'CustomFont';
  src: url('./fonts/CustomFont.woff2') format('woff2');
}

:root {
  --font-custom: 'CustomFont', 'Pretendard', sans-serif;
}
```

### 3. Custom Breakpoints

```typescript
const customBreakpoints = {
  mobile: '480px',
  tablet: '768px', 
  desktop: '1024px',
  wide: '1200px'
};
```

## Performance Tips

1. **Lazy Loading**: Use React.lazy for large components
2. **Memoization**: Use React.memo for expensive components
3. **Code Splitting**: Separate vendor and app bundles
4. **Image Optimization**: Use WebP formats where possible
5. **Font Loading**: Preload critical fonts

## Accessibility Features

- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus management

## Testing Examples

```tsx
import { render, screen } from '@testing-library/react';
import EnterpriseLayout from './components/Layout/EnterpriseLayout';

test('renders main navigation', () => {
  render(<EnterpriseLayout>Test content</EnterpriseLayout>);
  expect(screen.getByText('게시판')).toBeInTheDocument();
  expect(screen.getByText('커뮤니티')).toBeInTheDocument();
});
```
