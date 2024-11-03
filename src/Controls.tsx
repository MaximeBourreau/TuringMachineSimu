import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MACHINE_EXAMPLES } from './examples';

export const Controls = () => {

  const dispatch = useDispatch();
  const exampleMode = useSelector((state: any) => state.exampleMode);
  const exampleMachine = useSelector((state: any) => state.exampleMachine);
  const running = useSelector((state: any) => state.running);
  const speed = useSelector((state: any) => state.speed);
  const initialContent = useSelector((state: any) => state.initialContent);

  const setExampleMode = (event) => {
    dispatch({ type: 'SET_EXAMPLE_MODE', payload: event.target.checked });
  };
  const setExampleMachine = (event) => {
    dispatch({ type: 'SET_EXAMPLE_MACHINE', payload: parseInt(event.target.value, 10) });
  };
  const setInitialContent = (event) => {
    dispatch({ type: 'SET_INITIAL_CONTENT', payload: event.target.value });
  };
  const setSpeed = (event) => {
    dispatch({ type: 'SET_SPEED', payload: parseInt(event.target.value,10) });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block', margin: '0 1em' }}>
        <label>
          <input
              type='checkbox'
               checked={exampleMode}
              onChange={setExampleMode}
          />
            { exampleMode ? 'use example : ' : 'use example' }
        </label>
        <>
          { exampleMode && MACHINE_EXAMPLES.map ((item, i) =>
            <label key={i}>
              <input
                  type='radio'
                  disabled={running}
                  value={i}
                  checked={exampleMachine==i}
                  onChange={setExampleMachine}
              />
                {item.name}
            </label>
          )}
        </>
      </div>
      <div style={{ display: 'inline-block', margin: '0 1em' }}>
        <input type='text' value={initialContent} onChange={setInitialContent}/>
        <button disabled={running} onClick={() => dispatch({ type: 'INIT' })}>INIT</button>
      </div>
      <div style={{ display: 'inline-block', margin: '0 1em' }}>
        <button disabled={running} onClick={() => dispatch({ type: 'STEP' })}>STEP</button>
      </div>
      <div style={{ display: 'inline-block', margin: '0 1em' }}>
        <button disabled={running} onClick={() => dispatch({ type: 'START' })}>START</button>
        <button disabled={!running} onClick={() => dispatch({ type: 'STOP' })}>STOP</button>
      </div>
      <div style={{ display: 'inline-block', margin: '0 1em' }}>
        <label>
          speed{' '}
          <select value={speed} onChange={setSpeed}>
            <option value='5'>slow</option>
            <option value='2'>medium</option>
            <option value='0'>fast</option>
          </select>
        </label>
      </div>
    </div>
  );
};
