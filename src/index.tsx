import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { TapeViewer } from './TapeViewer';
import { Controls } from './Controls';
import { MACHINE_EXAMPLES } from './examples';

declare const BUILD_TIMESTAMP: string;

const Main = () => {

  const state = useSelector((state: any) => state.simulation.state);
  const halted = useSelector((state: any) => state.simulation.halted);
  const machine = useSelector((state: any) => state.machine);

  const accept = halted && MACHINE_EXAMPLES[machine].accept.includes(state);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'right', fontSize: '0.5em', color: '#444444' }}>build {BUILD_TIMESTAMP}</div>
      <div style={{ textAlign: 'center', fontSize: '2em' }}>state : q{state} {halted && <span>halted</span>} {accept && <span>accept</span>}</div>
      <TapeViewer />
      <Controls />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
