# Korean Enterprise Intranet Interface

A modern, responsive Korean enterprise intranet interface built with React, TypeScript, and Emotion CSS-in-JS.

## 🚀 Features

- **Modern React Architecture**: Built with functional components and hooks
- **TypeScript**: Full type safety and better developer experience
- **Responsive Design**: Mobile-first approach with multiple breakpoints
- **Korean Language Support**: Optimized for Korean content with proper fonts
- **Modular Components**: Reusable, well-structured component architecture
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Performance**: Code splitting and optimized bundle sizes

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── Layout/
│   │   ├── EnterpriseLayout.tsx    # Main layout wrapper
│   │   ├── Header.tsx              # Top navigation header
│   │   ├── Sidebar.tsx             # Collapsible sidebar with apps
│   │   └── MainContent.tsx         # Main content area
│   └── UI/
│       └── AppIcon.tsx             # Reusable app icon component
├── types/
│   └── index.ts                    # TypeScript interfaces
├── styles/
│   └── globals.css                 # Global styles and CSS variables
├── App.tsx                         # Root application component
└── main.tsx                        # Application entry point
```

### Key Components

#### EnterpriseLayout
The main layout component that orchestrates the entire interface:
- Responsive header with logo and navigation
- Collapsible sidebar with app icons
- Dynamic content area

#### Header
Top navigation bar featuring:
- Company logo
- Navigation items (게시판, 커뮤니티)
- Breadcrumb navigation
- Responsive design with mobile optimization

#### Sidebar
Collapsible application launcher with:
- Toggle functionality
- Grid layout of app icons
- Two sections separated by divider
- Responsive sizing

#### AppIcon
Reusable component for application icons:
- Multiple size variants (small, medium, large)
- Support for SVG icons and custom content
- Hover and active states
- Korean labels

## 🎨 Design System

### Colors
- **Primary Blue**: `#15213D` - Main brand color
- **White**: `#FFF` - Text and backgrounds
- **Border Gray**: `#E1E6EC` - Borders and dividers
- **Text Gray**: `#727E88` - Secondary text

### Typography
- **Primary Font**: Pretendard (Korean optimized)
- **Secondary Font**: OneShinhan (Brand specific)
- **Fallbacks**: System fonts for reliability

### Breakpoints
- **Desktop**: Default styles
- **Tablet**: `@media (max-width: 991px)`
- **Mobile**: `@media (max-width: 640px)`

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Build for production**:
```bash
npm run build
```

4. **Preview production build**:
```bash
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Behavior

### Desktop (1920px+)
- Full sidebar with all app icons
- Complete header with breadcrumbs
- Maximum content width

### Tablet (991px and below)
- Reduced sidebar width
- Condensed header navigation
- Adjusted padding and spacing

### Mobile (640px and below)
- Minimal sidebar
- Hidden header breadcrumbs
- Touch-optimized interactions

## 🧩 Customization

### Adding New App Icons

1. **Add icon data to Sidebar component**:
```typescript
const newApp = {
  id: 'new-app',
  icon: `<svg>...</svg>`, // SVG markup
  label: '새 앱'
};
```

2. **For custom content** (like S.A.Q):
```typescript
const customApp = {
  id: 'custom-app',
  customContent: 'TEXT',
  label: '커스텀'
};
```

### Modifying Layout

The layout is controlled by the `EnterpriseLayout` component. Key props:
- `children`: Content to display in main area
- Sidebar collapse state managed internally

### Styling

This project uses Emotion CSS-in-JS for styling:

```typescript
const myStyle = css`
  color: #15213D;
  font-family: 'Pretendard', sans-serif;
`;
```

Global styles and CSS variables are in `src/styles/globals.css`.

## 🔧 Advanced Configuration

### TypeScript Paths
Configured aliases for cleaner imports:
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/types/*` → `src/types/*`

### Performance Optimizations
- Code splitting by vendor and emotion libraries
- Preloaded Korean fonts
- Optimized SVG icons
- Lazy loading support ready

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please create a GitHub issue or contact the development team.
#   u p l e a t _ s h i n h a n  
 #   u p l e a t _ s h i n h a n  
 # upleat_shinhan
# upleat_shinhan
