import { Direction, Transition } from './simulation';

const isLetter = (x: string) => /[a-zA-Z]/.test(x);
const isDigit = (x: string) => /[0-9]/.test(x);

/*
Parse the whole transitions set
*/
export const parse = (src: string): Transition[] => {
  const t = src.split(/\r|\n/);
  let transitions = [];

  t.forEach((line, line_index) => {
    const transition = parse_line(line, line_index);
    if (transition) {
      transitions.push(transition);
    }
  });
  return transitions;

};

/*
Parse one line which may contains a transition or not
*/
export const parse_line = (line: string, line_index: number): Transition | null => {

  let i=0;                  // current index in the line
  let state=0;              // current state of the FSM
  let c: string;            // current char (';' at the end of the line)
  let s: string;            // storage of previous char (for state_pre and state_after values)

  /* storage of recognized value */
  let state_pre: number;
  let symbol_pre: string;
  let state_after: number;
  let symbol_after: string;
  let move: Direction;

  do {
    c = (i<line.length) ? line[i] : ';';

    if (state==0) {
      // before 'state_pre'
      if (c==' ' || c==';') {
        // pass
      } else if (isDigit(c)) {
        state=1;
        s=c;
      } else {
        throw new Error(`(Error 1) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a digit)`);
      }
    } else if (state==1) {
      // reading 'state_pre'
      if (isDigit(c)) {
        s=s+c;
      } else if (c==' ' || c==';') {
        state_pre=parseInt(s, 10);
        s='';
        state=2;
      } else {
        throw new Error(`(Error 2) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a digit or a space)`);
      }
    } else if (state==2) {
      // before 'symbol_pre'
      if (c==' ' || c==';') {
        // pass
      } else if (isLetter(c)) {
        symbol_pre=c;
        state=3;
      } else {
        throw new Error(`(Error 3) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a letter)`);
      }
    } else if (state==3) {
      // before a least a space before 'state_after'
      if (c==' ' || c==';') {
        state=4;
      } else {
        throw new Error(`(Error 4) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a space)`);
      }
    } else if (state==4) {
      // before 'state_after'
      if (c==' ' || c==';') {
        // pass
      } else if (isDigit(c)) {
        s=c;
        state=5;
      } else {
        throw new Error(`(Error 5) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a digit)`);
      }
    } else if (state==5) {
      // reading 'state_after'
      if (isDigit(c)) {
        s=s+c;
      } else if (c==' ' || c==';') {
        state_after=parseInt(s, 10);
        s='';
        state=6;
      } else {
        throw new Error(`(Error 6) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a digit or a space)`);
      }
    } else if (state==6) {
      // before 'symbol_after'
      if (c==' ' || c==';') {
        // pass
      } else if (isLetter(c)) {
        symbol_after=c;
        state=7;
      } else {
        throw new Error(`(Error 7) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a letter)`);
      }
    } else if (state==7) {
      // before at least a space before move
      if (c==' ' || c==';') {
        state=8;
      } else {
        throw new Error(`(Error 8) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be a space)`);
      }
    } else if (state==8) {
      // reading 'move'
      if (c==' ' || c==';') {
        // pass
      } else if (c=='L') {
        move=Direction.LEFT;
        state=9;
      } else if (c=='R') {
        move=Direction.RIGHT;
        state=9;
      } else {
        throw new Error(`(Error 9) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be 'L' or 'R')`);
      }
    } else if (state==9) {
      // before EOL or comment
      if (c==' ') {
        // pass
      } else if (c==';') {
        state=10;
      } else {
        throw new Error(`(Error 10) Line ${line_index+1}, Col. ${i+1} : unexpected char (must be ';' for comment or end of line)`);
      }
    }
    i++;
  } while (c!=';');

  if (state==0) {
    return null;
  } else if (state==10) {
    return { state_pre, symbol_pre, state_after, symbol_after, move };
  } else {
    throw new Error(`Line ${line_index+1} is incomplete.`);
  }
}
