import React, { useState } from 'react';
import styles from '../TextEditor.module.css';

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}

export function ToolbarButton({ onClick, isActive = false, children, title }: ToolbarButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses = [
    styles.toolbarButton,
    isActive ? styles.toolbarButtonActive : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      title={title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered && !isActive ? '#e9ecef' : undefined,
      }}
    >
      {children}
    </button>
  );
}