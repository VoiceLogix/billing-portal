import { EditorConfig } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ImageNode } from "./components/ImageNode";
import { InitialConfigType } from "@lexical/react/LexicalComposer";

// Lexical theme configuration
export const theme = {
  text: {
    bold: "editor-text-bold",
    italic: "editor-text-italic",
    underline: "editor-text-underline",
    code: "editor-text-code",
  },
  paragraph: "editor-paragraph",
  heading: {
    h1: "editor-heading-h1",
    h2: "editor-heading-h2",
    h3: "editor-heading-h3",
    h4: "editor-heading-h4",
    h5: "editor-heading-h5",
    h6: "editor-heading-h6",
  },
  list: {
    nested: {
      listitem: "editor-nested-listitem",
    },
    ol: "editor-list-ol",
    ul: "editor-list-ul",
    listitem: "editor-listitem",
  },
  quote: "editor-quote",
  link: "editor-link",
  table: "editor-table",
  tableCell: "editor-table-cell",
  tableCellHeader: "editor-table-cell-header",
  image: "editor-image",
};

// Editor configuration
export const editorConfig: InitialConfigType = {
  namespace: "TextEditor",
  theme,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    LinkNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    ImageNode,
  ],
  onError: (error: Error) => {
    console.error("Lexical error:", error);
  },
};

// Color palette for text coloring
export const colorPalette = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
  "#e6b8af",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#c9daf8",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
  "#dd7e6b",
  "#ea9999",
  "#f9cb9c",
  "#ffe599",
  "#b6d7a8",
  "#a2c4c9",
  "#a4c2f4",
  "#9fc5e8",
  "#b4a7d6",
  "#d5a6bd",
  "#cc4125",
  "#e06666",
  "#f6b26b",
  "#ffd966",
  "#93c47d",
  "#76a5af",
  "#6d9eeb",
  "#6fa8dc",
  "#8e7cc3",
  "#c27ba0",
  "#a61c00",
  "#cc0000",
  "#e69138",
  "#f1c232",
  "#6aa84f",
  "#45818e",
  "#3c78d8",
  "#3d85c6",
  "#674ea7",
  "#a64d79",
  "#85200c",
  "#990000",
  "#b45f06",
  "#bf9000",
  "#38761d",
  "#134f5c",
  "#1155cc",
  "#0b5394",
  "#351c75",
  "#741b47",
  "#5b0f00",
  "#660000",
];

// Word count utility
export const calculateWordCount = (text: string): number => {
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length === 1 && words[0] === "" ? 0 : words.length;
};

// CSS class name helper
export const getEditorClassNames = (): string => {
  return `
    .editor-text-bold {
      font-weight: bold;
    }
    .editor-text-italic {
      font-style: italic;
    }
    .editor-text-underline {
      text-decoration: underline;
    }
    .editor-paragraph {
      margin: 0 0 16px 0;
    }
    .editor-heading-h1 {
      font-size: 32px;
      font-weight: bold;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }
    .editor-heading-h2 {
      font-size: 24px;
      font-weight: bold;
      margin: 0 0 14px 0;
      line-height: 1.3;
    }
    .editor-heading-h3 {
      font-size: 20px;
      font-weight: bold;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    .editor-heading-h4 {
      font-size: 18px;
      font-weight: bold;
      margin: 0 0 10px 0;
      line-height: 1.4;
    }
    .editor-heading-h5 {
      font-size: 16px;
      font-weight: bold;
      margin: 0 0 8px 0;
      line-height: 1.4;
    }
    .editor-heading-h6 {
      font-size: 14px;
      font-weight: bold;
      margin: 0 0 6px 0;
      line-height: 1.4;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .editor-list-ol {
      padding-left: 24px;
      margin: 0 0 16px 0;
    }
    .editor-list-ul {
      padding-left: 24px;
      margin: 0 0 16px 0;
    }
    .editor-listitem {
      margin: 4px 0;
    }
    .editor-nested-listitem {
      list-style-type: none;
    }
    .editor-quote {
      border-left: 4px solid #e5e7eb;
      padding-left: 16px;
      margin: 16px 0;
      font-style: italic;
      color: #6b7280;
    }
    .editor-link {
      color: #3b82f6;
      text-decoration: underline;
      cursor: pointer;
    }
    .editor-link:hover {
      color: #1d4ed8;
    }
    .editor-table {
      border-collapse: collapse;
      border-spacing: 0;
      overflow-y: scroll;
      overflow-x: scroll;
      table-layout: fixed;
      width: max-content;
      margin: 16px 0;
    }
    .editor-table-cell {
      border: 1px solid #d1d5db;
      width: 100px;
      min-width: 100px;
      vertical-align: top;
      text-align: start;
      padding: 8px 12px;
      position: relative;
      outline: none;
    }
    .editor-table-cell-header {
      background-color: #f8f9fa;
      font-weight: bold;
    }
    .editor-image {
      cursor: default;
      display: inline-block;
      position: relative;
      user-select: none;
    }
  `;
};
