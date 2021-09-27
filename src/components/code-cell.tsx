import './code-cell.css';
import React, { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundles }) => bundles[cell.id]);
  const cumulativeCode = useTypedSelector(({ cells }) => {
    const { data, order } = cells;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [];
    for (let orderedCell of orderedCells) {
      if (orderedCell.type === 'code') {
        cumulativeCode.push(orderedCell.content);
      }

      if (orderedCell.id === cell.id) {
        break;
      }
    }

    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);

  const renderPreview = () => {
    if (!bundle || bundle.loading) {
      return (
        <div className="progress-cover">
          <progress className="progress is-small is-primary" max="100">
            Loading
          </progress>
        </div>
      );
    }

    return <Preview code={bundle.code} errorMessage={bundle.err} />;
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">{renderPreview()}</div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
