import './styles.css';
import React, { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
import { useActions } from '../../hooks/use-actions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        editorWrapperRef.current &&
        event.target &&
        editorWrapperRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditingMode(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editingMode) {
    return (
      <div className="text-editor" ref={editorWrapperRef}>
        <MDEditor
          value={cell.content}
          onChange={(v) => {
            updateCell(cell.id, v || '');
          }}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditingMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
