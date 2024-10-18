/* Définitions de différentes machines de Turing en exemple */

import * as React from 'react';
import { Direction } from './simulation';

/*
MdT reconnaissant le langage a k fois b k fois
*/
const MACHINE1 = [
  { state_pre: 0, symbol_pre: 'a', state_after: 1, symbol_after: 'X', move: Direction.RIGHT },
  { state_pre: 0, symbol_pre: 'Y', state_after: 3, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'a', state_after: 1, symbol_after: 'a', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'Y', state_after: 1, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'b', state_after: 2, symbol_after: 'Y', move: Direction.LEFT },
  { state_pre: 2, symbol_pre: 'a', state_after: 2, symbol_after: 'a', move: Direction.LEFT },
  { state_pre: 2, symbol_pre: 'Y', state_after: 2, symbol_after: 'Y', move: Direction.LEFT },
  { state_pre: 2, symbol_pre: 'X', state_after: 0, symbol_after: 'X', move: Direction.RIGHT },
  { state_pre: 3, symbol_pre: 'Y', state_after: 3, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 3, symbol_pre: 'B', state_after: 4, symbol_after: 'B', move: Direction.RIGHT }
];

/*
MdT reconnaissant le langage a k fois b k fois c k fois
*/
const MACHINE2 = [
  { state_pre: 0, symbol_pre: 'a', state_after: 1, symbol_after: 'X', move: Direction.RIGHT },
  { state_pre: 0, symbol_pre: 'Y', state_after: 4, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'a', state_after: 1, symbol_after: 'a', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'Y', state_after: 1, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'b', state_after: 2, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 2, symbol_pre: 'b', state_after: 2, symbol_after: 'b', move: Direction.RIGHT },
  { state_pre: 2, symbol_pre: 'Z', state_after: 2, symbol_after: 'Z', move: Direction.RIGHT },
  { state_pre: 2, symbol_pre: 'c', state_after: 3, symbol_after: 'Z', move: Direction.LEFT },
  { state_pre: 3, symbol_pre: 'Z', state_after: 3, symbol_after: 'Z', move: Direction.LEFT },
  { state_pre: 3, symbol_pre: 'b', state_after: 3, symbol_after: 'b', move: Direction.LEFT },
  { state_pre: 3, symbol_pre: 'Y', state_after: 3, symbol_after: 'Y', move: Direction.LEFT },
  { state_pre: 3, symbol_pre: 'a', state_after: 3, symbol_after: 'a', move: Direction.LEFT },
  { state_pre: 3, symbol_pre: 'X', state_after: 0, symbol_after: 'X', move: Direction.RIGHT },
  { state_pre: 4, symbol_pre: 'Y', state_after: 4, symbol_after: 'Y', move: Direction.RIGHT },
  { state_pre: 4, symbol_pre: 'Z', state_after: 4, symbol_after: 'Z', move: Direction.RIGHT },
  { state_pre: 4, symbol_pre: 'B', state_after: 5, symbol_after: 'B', move: Direction.RIGHT }
];

/*
MdT Remplissant le ruban alternativement vers la gauche et la droite, indéfiniment,
permet de vérifier le bon fonctionnement du cadrage
*/
const MACHINE3 = [
  { state_pre: 0, symbol_pre: 'B', state_after: 1, symbol_after: 'a', move: Direction.RIGHT },
  { state_pre: 1, symbol_pre: 'B', state_after: 2, symbol_after: 'a', move: Direction.LEFT },
  { state_pre: 1, symbol_pre: 'a', state_after: 1, symbol_after: 'a', move: Direction.RIGHT },
  { state_pre: 2, symbol_pre: 'a', state_after: 2, symbol_after: 'a', move: Direction.LEFT },
  { state_pre: 2, symbol_pre: 'B', state_after: 1, symbol_after: 'a', move: Direction.RIGHT }
];

export const MACHINE_EXAMPLES = [
  { name: <>a<sup>n</sup>b<sup>n</sup></>,              accept: [4], transitions: MACHINE1 },
  { name: <>a<sup>n</sup>b<sup>n</sup>c<sup>n</sup></>, accept: [5], transitions: MACHINE2 },
  { name: <>fill tape</>,                               accept: [],  transitions: MACHINE3 }
];
