import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { TapeViewer } from './TapeViewer';
import { MACHINE_EXAMPLES } from './examples';

declare const BUILD_TIMESTAMP: string;

const Main = () => {

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.simulation.state);
  const halted = useSelector((state: any) => state.simulation.halted);
  const running = useSelector((state: any) => state.running);
  const speed = useSelector((state: any) => state.speed);
  const initialContent = useSelector((state: any) => state.initialContent);
  const machine = useSelector((state: any) => state.machine);

  const setMachine = (event) => {
    dispatch({ type: 'SET_MACHINE', payload: parseInt(event.target.value, 10) });
  };
  const setInitialContent = (event) => {
    dispatch({ type: 'SET_INITIAL_CONTENT', payload: event.target.value });
  };
  const setSpeed = (event) => {
    dispatch({ type: 'SET_SPEED', payload: parseInt(event.target.value,10) });
  };

  const accept = halted && MACHINE_EXAMPLES[machine].accept.includes(state);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'right', fontSize: '0.5em', color: '#444444' }}>build {BUILD_TIMESTAMP}</div>
      <div style={{ textAlign: 'center', fontSize: '2em' }}>state : q{state} {halted && <span>halted</span>} {accept && <span>accept</span>}</div>
      <TapeViewer />
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', margin: '0 1em' }}>
          { MACHINE_EXAMPLES.map ((item, i) =>
            <label key={i}>
              <input
                type='radio'
                disabled={running}
                value={i}
                checked={machine==i}
                onChange={setMachine}
              />
              {item.name}
            </label>
          )}
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
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
