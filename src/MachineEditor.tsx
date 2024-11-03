import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const MachineEditor = () => {

  const dispatch = useDispatch();
  const errMsg = useSelector((state: any) => state.errMsg);
  const machine = useSelector((state: any) => state.machine);
  const machineSrc = useSelector((state: any) => state.machineSrc);

  const setMachineSrc = (event) => {
    dispatch({ type: 'SET_MACHINE_SRC', payload: event.target.value });
  };

  let msg = errMsg ?
    errMsg :
    (machine.length>0) &&
      `This Turing machine defines ${machine.length} transition(s)`;

  return (
    <div style={{ display: 'flex', margin: '1em 0' }}>
      <textarea
          style={{ flex: '50%', height: '20em', margin: '0 1em' }}
          value={machineSrc}
          onChange={setMachineSrc}
      />
      <div style={{ flex: '50%', margin: '0 1em' }}>
        { msg &&
          <div style={{ margin: '0 0 1em 0', fontStyle: 'italic' }}>{msg}</div>
        }
        <div style={{ border: '1px solid #ccc', fontSize: '85%' }}>
          <ul>
            <li>A transition must be defined on a single line as follows :<br/>&lt;state&nbsp;before&gt; &lt;symbol&nbsp;before&gt; &lt;state&nbsp;after&gt; &lt;symbol&nbsp;after&gt; &lt;movement&nbsp;(L&nbsp;or&nbsp;R)&gt;</li>
            <li>It is possible to write comments after a ; character</li>
            <li>For instance :<br/><i>0&nbsp;B&nbsp;1&nbsp;c&nbsp;L ; replace Blank by a symbol c, move to the left</i></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
