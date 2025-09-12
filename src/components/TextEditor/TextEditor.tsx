import React, { useEffect, useState, useCallback } from "react";
import type { EditorState, LexicalEditor } from "lexical";
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $createTextNode,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $isTextNode,
} from "lexical";
import { $setBlocksType, $patchStyleText } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { $createImageNode } from "./components/ImageNode";
import { $generateHtmlFromNodes } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Unlink,
  Undo,
  Redo,
  Image,
  Table,
  Maximize,
  Minimize,
} from "lucide-react";
import type { TextFormatType, ElementFormatType } from "lexical";

import { editorConfig, calculateWordCount, getEditorClassNames } from "./utils";
import { ToolbarButton } from "./components/ToolbarButton";
import { ColorDropdown } from "./components/ColorDropdown";
import { LinkModal, ImageModal, TableModal } from "./components/Modals";
import styles from "./TextEditor.module.css";

interface ToolbarPluginProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

function ToolbarPlugin({
  isFullscreen,
  onToggleFullscreen,
}: ToolbarPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [blockType, setBlockType] = useState("paragraph");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [currentTextColor, setCurrentTextColor] = useState("#000000");
  const [isLinkSelected, setIsLinkSelected] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setActiveFormats({
        bold: selection.hasFormat("bold"),
        italic: selection.hasFormat("italic"),
        underline: selection.hasFormat("underline"),
      });

      const anchorNode = selection.anchor.getNode();
      const element = anchorNode.getTopLevelElementOrThrow();

      if ($isHeadingNode(element)) {
        setBlockType(element.getTag());
      } else {
        setBlockType(element.getType());
      }

      // Get current text color from selection
      const nodes = selection.getNodes();
      if (nodes.length > 0) {
        const firstNode = nodes[0];
        if ($isTextNode(firstNode)) {
          const style = firstNode.getStyle();
          const colorMatch = style.match(/color:\s*([^;]+)/);
          if (colorMatch) {
            setCurrentTextColor(colorMatch[1].trim());
          } else {
            setCurrentTextColor("#000000");
          }
        }
      }

      // Check if a link is selected
      let linkFound = false;
      for (const node of nodes) {
        if (node.getType && node.getType() === "link") {
          linkFound = true;
          break;
        }
      }
      setIsLinkSelected(linkFound);
    } else {
      setIsLinkSelected(false);
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      1,
    );
  }, [editor, updateToolbar]);

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatAlignment = (alignment: ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
  };

  const formatHeading = (headingSize: string) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () =>
            $createHeadingNode(
              headingSize as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
            ),
          );
        }
      });
    }
  };

  const handleTextColor = (color: string) => {
    setCurrentTextColor(color);
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, { color });
      }
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const handleInsertLink = (url: string, text: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (text && text.trim()) {
          const linkNode = $createLinkNode(url);
          const textNode = $createTextNode(text);
          linkNode.append(textNode);
          selection.insertNodes([linkNode]);
        } else {
          if (selection.isCollapsed()) {
            const linkNode = $createLinkNode(url);
            const textNode = $createTextNode(url);
            linkNode.append(textNode);
            selection.insertNodes([linkNode]);
          } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
          }
        }
      }
    });
  };

  // Unlink selected link
  const handleUnlink = () => {
    editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
  };

  const handleInsertImage = (url: string, altText: string) => {
    editor.update(() => {
      const imageNode = $createImageNode({
        src: url,
        altText: altText,
      });
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.insertNodes([imageNode]);
      }
    });
  };

  const handleInsertTable = (rows: number, columns: number) => {
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: columns.toString(),
      rows: rows.toString(),
    });
  };

  const insertUnorderedList = () => {
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };

  const insertOrderedList = () => {
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
  };

  const handleBlockTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "paragraph") {
      formatParagraph();
    } else if (value.startsWith("h")) {
      formatHeading(value);
    } else if (value === "quote") {
      formatQuote();
    }
  };

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          title="Undo"
        >
          <Undo size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          title="Redo"
        >
          <Redo size={14} />
        </ToolbarButton>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <select
          className={styles.select}
          value={blockType}
          onChange={handleBlockTypeChange}
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="quote">Quote</option>
        </select>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => formatText("bold")}
          isActive={activeFormats.bold}
          title="Bold (Ctrl+B)"
        >
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("italic")}
          isActive={activeFormats.italic}
          title="Italic (Ctrl+I)"
        >
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatText("underline")}
          isActive={activeFormats.underline}
          title="Underline (Ctrl+U)"
        >
          <Underline size={14} />
        </ToolbarButton>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ColorDropdown
          currentColor={currentTextColor}
          onSelectColor={handleTextColor}
        />
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => formatAlignment("left")}
          title="Align Left"
        >
          <AlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatAlignment("center")}
          title="Align Center"
        >
          <AlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => formatAlignment("right")}
          title="Align Right"
        >
          <AlignRight size={14} />
        </ToolbarButton>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ToolbarButton onClick={insertUnorderedList} title="Bullet List">
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={insertOrderedList} title="Numbered List">
          <ListOrdered size={14} />
        </ToolbarButton>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={() => setShowLinkModal(true)}
          title="Insert Link"
        >
          <Link size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={handleUnlink}
          title="Unlink"
          isActive={isLinkSelected}
        >
          <Unlink size={14} style={{ textDecoration: "line-through" }} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setShowImageModal(true)}
          title="Insert Image"
        >
          <Image size={14} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setShowTableModal(true)}
          title="Insert Table"
        >
          <Table size={14} />
        </ToolbarButton>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.toolbarGroup}>
        <ToolbarButton
          onClick={onToggleFullscreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
        </ToolbarButton>
      </div>

      <LinkModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onInsert={handleInsertLink}
      />
      <ImageModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleInsertImage}
      />
      <TableModal
        isOpen={showTableModal}
        onClose={() => setShowTableModal(false)}
        onInsert={handleInsertTable}
      />
    </div>
  );
}

function Placeholder() {
  return <div className={styles.placeholder}>Describe the issue...</div>;
}

function PastePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData;
      if (!clipboardData) return;

      const items = clipboardData.items;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          event.preventDefault();
          const file = item.getAsFile();

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              editor.update(() => {
                const imageNode = $createImageNode({
                  src: e.target?.result as string,
                  altText: "Pasted image",
                });
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                  selection.insertNodes([imageNode]);
                }
              });
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    const editorElement = editor.getRootElement();
    if (editorElement) {
      editorElement.addEventListener("paste", handlePaste);
      return () => {
        editorElement.removeEventListener("paste", handlePaste);
      };
    }
  }, [editor]);

  return null;
}


interface TextEditorProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

export default function TextEditor({ value, onValueChange }: TextEditorProps) {
  const [wordCount, setWordCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  const onChange = (newEditorState: EditorState, editorInstance: LexicalEditor) => {
    if (!editor) {
      setEditor(editorInstance);
    }
    
    newEditorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      setWordCount(calculateWordCount(textContent));

      if (onValueChange) {
        if (!textContent.trim()) {
          onValueChange("");
        } else {
          const htmlContent = $generateHtmlFromNodes(editorInstance, null);
          onValueChange(htmlContent);
        }
      }
    });
  };

  // Effect to handle value prop changes (like clearing the editor)
  useEffect(() => {
    if (editor && value === "") {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        const paragraph = $createParagraphNode();
        root.append(paragraph);
      });
    }
  }, [editor, value]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = getEditorClassNames();
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const containerStyle = isFullscreen
    ? styles.fullscreenContainer
    : styles.editorContainer;
  const editorStyle = isFullscreen ? styles.fullscreenEditor : styles.editor;

  const initialConfig = {
    ...editorConfig,
    editorState: value
      ? () => {
          const root = $getRoot();
          const paragraph = $createParagraphNode();
          paragraph.append($createTextNode(value));
          root.append(paragraph);
        }
      : undefined,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={containerStyle}>
        <ToolbarPlugin
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />
        <div
          style={{ position: "relative", flex: isFullscreen ? 1 : undefined }}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className={editorStyle} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <TablePlugin />
          <PastePlugin />
          <OnChangePlugin onChange={onChange} />
        </div>
        <div className={styles.editorFooter}>{wordCount} words</div>
      </div>
    </LexicalComposer>
  );
}
