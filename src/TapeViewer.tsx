import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WIDTH } from './store';
import { getSymbolAt } from './simulation';

export const TapeViewer = () => {

  const dispatch = useDispatch();
  const simulation = useSelector((state: any) => state.simulation);
  const leftOffset = useSelector((state: any) => state.leftOffset);
  const leftBound = useSelector((state: any) => state.leftBound);
  const rightBound = useSelector((state: any) => state.rightBound);

  const setLeftOffset = (event) => {
    dispatch({ type: 'SET_LEFT_OFFSET', payload: parseInt(event.target.value, 10) })
  };

  let t = new Array();
  for(let i=leftOffset;i<(leftOffset+WIDTH);i++) {
    const c = getSymbolAt(simulation, i);
    const textColor = (c=='B') ? '#cccccc' : '#000000';
    const border = (i==0) ? '3px solid #5599ee' : '3px solid #cccccc';
    if (i != simulation.pos) {
      t.push(
        <div key={i} style={{ border, color: textColor, marginBottom: '1.2em' }}>{c}</div>
      );
    } else {
      t.push(
        <div key={i} style={{textAlign: 'center'}}>
          <div style={{ border: '3px solid #000000', color: textColor }}>{c}</div>
          ▲
        </div>
      );
    }
  }

  return (
    <div style={{ margin: '5px' }}>
      { /* partie visible du ruban */ }
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          columnGap: '4px',
          overflow: 'hidden',
          fontSize: '3em',
          fontFamily: 'monospace'
        }}>
          {t}
      </div>
      { /* indication de la partie visible du ruban par rapport à la partie visitée du ruban */ }
      { leftBound < rightBound-1 &&
        <div style={{ textAlign: 'center' }}>
          <input
              type='range'
              style={{ width: '40%' }}
              min={leftBound}
              max={rightBound}
              value={leftOffset}
              onChange={setLeftOffset}
          />
        </div>
      }
    </div>
   )
};
