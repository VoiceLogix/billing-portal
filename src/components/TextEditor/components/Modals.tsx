import React, { useRef } from 'react';
import { X, Upload } from 'lucide-react';
import styles from '../Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button type="button" className={styles.modalCloseButton} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text: string) => void;
}

export function LinkModal({ isOpen, onClose, onInsert }: LinkModalProps) {
  const [url, setUrl] = React.useState("");
  const [text, setText] = React.useState("");

  const handleInsert = () => {
    if (url) {
      onInsert(url, text);
      setUrl("");
      setText("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Insert Link">
      <div className={styles.modalBody}>
        <label className={styles.label}>URL</label>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          autoFocus
        />
        <label className={styles.label}>Link Text (optional)</label>
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Link text"
        />
      </div>
      <div className={styles.modalFooter}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={handleInsert}
          disabled={!url}
        >
          Insert Link
        </button>
      </div>
    </Modal>
  );
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, altText: string) => void;
}

export function ImageModal({ isOpen, onClose, onInsert }: ImageModalProps) {
  const [url, setUrl] = React.useState("");
  const [altText, setAltText] = React.useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInsert = () => {
    if (url) {
      onInsert(url, altText);
      setUrl("");
      setAltText("");
      onClose();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUrl(e.target?.result as string);
        setAltText(file.name.split('.')[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Insert Image">
      <div className={styles.modalBody}>
        <div
          className={styles.uploadButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={16} />
          Upload Image
        </div>
        <input
          ref={fileInputRef}
          className={styles.fileUpload}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        
        <div style={{ margin: "16px 0", textAlign: "center", color: "#6b7280" }}>
          or
        </div>

        <label className={styles.label}>Image URL</label>
        <input
          className={styles.input}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        <label className={styles.label}>Alt Text</label>
        <input
          className={styles.input}
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="Describe the image"
        />
      </div>
      <div className={styles.modalFooter}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={handleInsert}
          disabled={!url}
        >
          Insert Image
        </button>
      </div>
    </Modal>
  );
}

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (rows: number, columns: number) => void;
}

export function TableModal({ isOpen, onClose, onInsert }: TableModalProps) {
  const [rows, setRows] = React.useState("3");
  const [columns, setColumns] = React.useState("3");

  const handleInsert = () => {
    const rowCount = parseInt(rows);
    const columnCount = parseInt(columns);
    if (rowCount > 0 && columnCount > 0) {
      onInsert(rowCount, columnCount);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Insert Table">
      <div className={styles.modalBody}>
        <label className={styles.label}>Rows</label>
        <input
          className={styles.input}
          type="number"
          min="1"
          max="20"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        />
        <label className={styles.label}>Columns</label>
        <input
          className={styles.input}
          type="number"
          min="1"
          max="10"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
        />
      </div>
      <div className={styles.modalFooter}>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonPrimary}`}
          onClick={handleInsert}
        >
          Insert Table
        </button>
      </div>
    </Modal>
  );
}