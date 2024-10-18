import { createStore } from 'redux';
import { MACHINE_EXAMPLES } from './examples';
import { simulationDoStep } from './simulation';

/* Largeur de la partie visible du ruban */
export const WIDTH = 60;

/* seuil de déclenchement du recadrage */
const REFOCUS_THRESHOLD = 7;

/* délai entre chaque transition lors de l'exécution à vitesse maximale */
const TICK_DELAY = 150;

/*
état initial du store (ne pas confondre le state au sens de redux et le state de la mdT simulée)
*/

const initialState = {
  simulation: {
    left: [],
    right: [],
    pos: 0,
    state: 0,
    halted: false,
  },
  leftOffset: (-WIDTH/2),
  leftBound: (-WIDTH/2-WIDTH/4),
  rightBound: (-WIDTH/4),
  running: false,
  speed: 1,
  tickCount: 0,
  initialContent: '',
  machine: 0,
};

const doStep = (state, shouldRun) => {

  const { transitions } = MACHINE_EXAMPLES[state.machine];
  const simulation = simulationDoStep(state.simulation, transitions);

  /*
  eventuel recadrage de la vue sur le ruban
  */
  let { leftOffset } = state;
  if (simulation.pos > leftOffset + WIDTH/2 + REFOCUS_THRESHOLD || simulation.pos < leftOffset + WIDTH/2 - REFOCUS_THRESHOLD) {
    leftOffset = simulation.pos - WIDTH/2;
  }

  /*
  calcul des bornes de la partie visitée du ruban
  */
  let leftBound = Math.min(state.leftBound, leftOffset);
  let rightBound = Math.max(state.rightBound, leftOffset);

  return { ...state, tickCount: 0, simulation, running: shouldRun && !simulation.halted, leftOffset, leftBound, rightBound };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MACHINE':
        return { ...state, machine: action.payload };
      case 'SET_INITIAL_CONTENT':
        return { ...state, initialContent: action.payload };
      case 'INIT':
        return {
          ...state,
          simulation: { left:[], right: Array.from(state.initialContent), pos:0, state: 0, halted: false },
          leftOffset: (-WIDTH/2),
          leftBound: (-WIDTH/2-WIDTH/4),
          rightBound: (state.initialContent.length-WIDTH/4)
        };
      case 'SET_LEFT_OFFSET':
        return { ...state, leftOffset: action.payload };
      case 'STEP':
        return doStep(state, false);
      case 'START':
        return doStep(state, true);
      case 'STOP':
        return { ...state, running: false };
      case 'SET_SPEED':
        return { ...state, speed: action.payload };
      case 'TICK':
        if (state.running) {
          const c = state.tickCount + 1;
          if (c > Math.pow(state.speed, 2)) {
            return doStep(state, true);
          } else {
            return { ...state, tickCount: c };
          }
        } else {
          return state;
        }
      default:
        return state;
    }
}

export const store = createStore(reducer);

setInterval(() => {
  store.dispatch({ type: 'TICK' });
}, TICK_DELAY);
