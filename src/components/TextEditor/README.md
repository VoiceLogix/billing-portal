# TextEditor Component

A comprehensive rich text editor built with Lexical for React applications.

## Features

- **Rich Text Formatting**: Bold, italic, underline, text colors
- **Headings**: Support for H1-H6 heading levels
- **Lists**: Ordered and unordered lists
- **Media**: Image insertion (upload & URL), tables, links
- **Alignment**: Left, center, right text alignment
- **Fullscreen Mode**: Distraction-free writing experience
- **Clipboard Support**: Paste images directly from clipboard
- **Undo/Redo**: Full history management
- **Word Count**: Live word count display

## File Structure

```
TextEditor/
├── TextEditor.tsx          # Main editor component
├── TextEditor.module.css   # Main editor styles
├── Modal.module.css        # Modal component styles
├── utils.ts               # Utility functions and configuration
├── index.ts               # Export file
└── components/
    ├── ColorDropdown.tsx  # Text color picker dropdown
    ├── ImageNode.tsx      # Custom Lexical image node
    ├── Modals.tsx         # Modal components (Link, Image, Table)
    └── ToolbarButton.tsx  # Reusable toolbar button component
```

## Usage

```tsx
import { TextEditor } from '../TextEditor';

function MyComponent() {
  return (
    <div>
      <TextEditor />
    </div>
  );
}
```

## Components

### TextEditor
The main editor component that provides the complete rich text editing experience.

### ColorDropdown
A dropdown component for selecting text colors with a comprehensive color palette.

### Modals
- **LinkModal**: Insert links with optional custom text
- **ImageModal**: Insert images via URL or file upload
- **TableModal**: Insert tables with custom dimensions

### ImageNode
Custom Lexical node for handling image insertion and display.

### ToolbarButton
Reusable button component for toolbar actions with hover and active states.

## Styling

The component uses CSS Modules for styling:
- `TextEditor.module.css`: Main editor and toolbar styles
- `Modal.module.css`: Modal dialog styles

All styles are scoped to prevent conflicts with other components.

## Dependencies

- `lexical`: Core editor framework
- `@lexical/react`: React integration
- `@lexical/rich-text`: Rich text functionality
- `@lexical/list`: List support
- `@lexical/link`: Link functionality
- `@lexical/table`: Table support
- `@lexical/selection`: Text selection utilities
- `lucide-react`: Icons

## Configuration

Editor configuration is centralized in `utils.ts` including:
- Theme configuration
- Node registration
- Color palette
- Utility functions