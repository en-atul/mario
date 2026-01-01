# Mario Design System

A modern, accessible React component library built with TypeScript, Tailwind CSS v4, and Storybook. Mario provides a comprehensive set of design tokens and reusable components for building consistent user interfaces.

## ✨ Features

- 🎨 **Design Tokens** - Comprehensive color palette, typography, spacing, radius, and elevation tokens
- 🧩 **20+ Components** - Form controls, feedback components, overlays, navigation, and more
- 📚 **Storybook Documentation** - Interactive component playground with comprehensive docs
- 🎭 **Dark Mode Support** - Built-in theme switching
- ♿ **Accessible** - Components built with accessibility in mind
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 🎨 **Tailwind CSS v4** - Modern CSS-first approach with custom design tokens
- 🚀 **Framer Motion** - Smooth animations for overlays and interactions

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling with CSS-first approach
- **Storybook 10** - Component documentation and testing
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/en-atul/mario.git
cd mario

# Install dependencies
pnpm install
```

### Development

```bash
# Start Storybook development server
pnpm storybook

# Start Vite dev server (if needed)
pnpm dev

# Run linting
pnpm lint

# Build Storybook for production
pnpm build-storybook
```

## 📦 Components

### Forms

- **Input** - Text input with currency support
- **Textarea** - Multi-line text input
- **Select** - Native select dropdown
- **SelectMulti** - Multi-select with tags
- **SelectAsync** - Async select with infinite scroll
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **Switch** - Toggle switch
- **Label** - Form label

### Actions

- **Button** - Primary action button with variants
- **Link** - Styled link component

### Feedback

- **Badge** - Status and category badges
- **Toast** - Notification toasts
- **Tooltip** - Contextual tooltips
- **Skeleton** - Loading placeholders

### Layout

- **Separator** - Visual dividers
- **Typography** - Text components with semantic variants

### Overlays

- **Modal** - Modal dialogs with animations
- **Dialog** - Dialog components
- **Dropdown** - Dropdown menus

### Navigation

- **Tabs** - Tab navigation

## 🎨 Design Tokens

All design tokens are centralized in `src/tokens/`:

- **Colors** - Primary, secondary, accent, and semantic color palettes
- **Typography** - Font sizes, line heights, and font weights
- **Spacing** - Consistent spacing scale
- **Radius** - Border radius values
- **Elevation** - Box shadow tokens

View all tokens in Storybook under the "Tokens" section.

## 📚 Documentation

Comprehensive documentation is available in Storybook:

```bash
pnpm storybook
```

Storybook includes:

- Interactive component playground
- Component API documentation
- Design token reference
- Usage examples and best practices
- Accessibility guidelines

## 📁 Project Structure

```
mario/
├── .storybook/          # Storybook configuration
├── src/
│   ├── components/      # React components
│   │   ├── badge/
│   │   ├── button/
│   │   ├── input/
│   │   └── ...
│   ├── tokens/          # Design tokens
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── radius.ts
│   │   └── elevation.ts
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
└── package.json
```

## 🧪 Testing

```bash
# Run Storybook tests
pnpm test-storybook

# Visual regression testing with Chromatic
pnpm chromatic
```

## 🎯 Usage Example

```tsx
import { Button, Input, Modal } from "./components";

function App() {
  return (
    <div>
      <Button variant="primary" size="md">
        Click me
      </Button>
      <Input placeholder="Enter text..." />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Hello</ModalTitle>
        </ModalHeader>
        <ModalBody>Content here</ModalBody>
      </Modal>
    </div>
  );
}
```

<!-- ## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. -->

## 📄 License

UNLICENSED

<!-- ## 🔗 Links -->

<!-- - [GitHub Repository](https://github.com/en-atul/mario) -->
<!-- - [Storybook Documentation (when deployed)](https://your-storybook-url) -->

<!-- Built with ❤️ by [Atul](https://github.com/en-atul) -->
