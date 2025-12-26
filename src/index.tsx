import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import { TapeViewer } from './TapeViewer';
import { Controls } from './Controls';
import { MachineEditor } from './MachineEditor';
import { MACHINE_EXAMPLES } from './examples';

declare const BUILD_TIMESTAMP: string;

const Main = () => {

  const state = useSelector((state: any) => state.simulation.state);
  const halted = useSelector((state: any) => state.simulation.halted);
  const exampleMachine = useSelector((state: any) => state.exampleMachine);
  const exampleMode = useSelector((state: any) => state.exampleMode);

  const accept = halted && exampleMode && MACHINE_EXAMPLES[exampleMachine].accept.includes(state);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'right', fontSize: '0.5em', color: '#444444' }}>build {BUILD_TIMESTAMP}</div>
      <div style={{ textAlign: 'center', fontSize: '2em' }}>state : q{state} {halted && <span>halted</span>} {accept && <span>accept</span>}</div>
      <TapeViewer />
      <Controls />
      { exampleMode || <MachineEditor /> }
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
