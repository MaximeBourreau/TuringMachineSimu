/*
Structure et fonctions permettant la simulation d'une machine de Turing
*/

export enum Direction { LEFT, RIGHT };

export interface Simulation {
  left: string[],  // stocke les symboles des cellules d'indice strictement negatif
  right: string[], // stocke les symboles des cellules d'indice positif
  pos: number,     // position de la tête de lecture/écriture
  state: number,   // état de la mdT simulée
  halted: boolean, // vrai si la mdT simulée s'est arrêtée
};

/*
Retourne le symbole se trouvant à la position i du ruban
*/
export const getSymbolAt = (simulation: Simulation, i: number) => {
  if (i >=0) {
    if (i < simulation.right.length) {
      return simulation.right[i];
    }
  } else {
    if (-i <= simulation.left.length) {
      return simulation.left[-1-i];
    }
  }
  return 'B';
};

/*
Place le symbole c à la position i du ruban
*/
const setSymbolAt = (left, right, i: number, c: string) => {
  if (i >=0) {
    if (i < right.length) {
      right[i] = c;
    } else {
      right.push(c);
    }
  } else {
    if (-i <= left.length) {
      left[-1-i];
    } else {
      left.push(c);
    }
  }
};

/*
Recherche si une transition est possible
retourne l'action à effectuer ou null en l'absence de transition
*/
const rechercheAction = (simulation, transitions) => {
  let { pos, state } = simulation;
  const c = getSymbolAt(simulation, pos);

  let transition = transitions.find(t => (t.state_pre==state && t.symbol_pre==c));
  if (transition) {
    return {
      state_after: transition.state_after,
      symbol_after: transition.symbol_after,
      move: transition.move
    };
  } else {
    return null;
  }
};

/*
Tente de faire faire une transition à la mdT simulée
Retourne :
  - un objet simulation mis à jour
  - un booléen indiquant si la mdT simulée s'est finalement arrêtée
*/
export const simulationDoStep = (simulation: Simulation, transitions): Simulation => {
  const action = rechercheAction(simulation, transitions);
  if (action) {
    /*
    effectue la transition
    */
    const { state_after, symbol_after, move } = action;
    let { left, right, pos, state } = simulation;

    setSymbolAt(left, right, pos, symbol_after);

    state = state_after;

    if (move == Direction.LEFT) {
      pos = pos-1;
    } else {
      pos = pos+1;
    }

    /*
    rechercher s'il existe une transition après cette action
    */
    const halted = rechercheAction({ left, right, pos, state, halted: false }, transitions) == null;

    return { left, right, pos, state, halted };
  }
  return { ...simulation, halted: true };
};
