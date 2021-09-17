import './text-editor.css';
import React, { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC = () => {
  const [editingMode, setEditingMode] = useState(false);
  const editorWrapperRef = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState('# Header');

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
          value={value}
          onChange={(v) => {
            setValue(v || '');
          }}
        />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditingMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
