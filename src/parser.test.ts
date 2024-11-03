import { parse } from './parser';
import { Direction } from './simulation';

test('parse one transition', () => {
  const src = '35 a 14 b R';
  const transitions = parse(src);
  expect(transitions.length).toBe(1);
  expect(transitions[0]).toStrictEqual({
    state_pre: 35,
    symbol_pre: 'a',
    state_after: 14,
    symbol_after: 'b',
    move: Direction.RIGHT
  });
});

test('parse one transition with comment', () => {
  const src = '0 B 20 e L;comment';
  const transitions = parse(src);
  expect(transitions.length).toBe(1);
  expect(transitions[0]).toStrictEqual({
    state_pre: 0,
    symbol_pre: 'B',
    state_after: 20,
    symbol_after: 'e',
    move: Direction.LEFT
  });
});

test('parse one transition with comment and many spaces', () => {
  const src = '   02  x  031    Y    R    ;comment';
  const transitions = parse(src);
  expect(transitions.length).toBe(1);
  expect(transitions[0]).toStrictEqual({
    state_pre: 2,
    symbol_pre: 'x',
    state_after: 31,
    symbol_after: 'Y',
    move: Direction.RIGHT
  });
});

test('parse two transitions', () => {
  const src = ' ;an intro comment \n1  B  012 Z R   ; comment\n\n 028  f  5 B L   ; another comment';
  const transitions = parse(src);
  expect(transitions.length).toBe(2);
  expect(transitions[0].state_after).toBe(12);
  expect(transitions[0].symbol_after).toBe('Z');
  expect(transitions[1].state_pre).toBe(28);
  expect(transitions[1].symbol_after).toBe('B');
  expect(transitions[1].move).toBe(Direction.LEFT);
});
