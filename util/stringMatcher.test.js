import { describe, test, expect } from 'vitest';
import stringMatcher from './stringMatcher';

describe('String matcher', () => {
  test.each([
    [
      stringMatcher('turnips', 'flurnips'),
      { match: false, completeMatch: false, rating: 0 },
    ],
    [
      stringMatcher('walnuts', 'peanuts'),
      { match: false, completeMatch: false, rating: 0 },
    ],
    [
      stringMatcher('1234', 'abcdefgh'),
      { match: false, completeMatch: false, rating: 0 },
    ],
  ])('Correctly identifies no match', (result, expected) => {
    expect(result.match).toBe(expected.match);
    expect(result.completeMatch).toBe(expected.completeMatch);
  });

  test.each([
    [
      stringMatcher('turnipszone', 'turnips'),
      { match: true, completeMatch: false },
    ],
    [
      stringMatcher('turnips in the flurnips', 'ps in the fl'),
      { match: true, completeMatch: false },
    ],
    [stringMatcher('123456789', '456'), { match: true, completeMatch: false }],
  ])('Correctly identifies a partial match', (result, expected) => {
    expect(result.match).toBe(expected.match);
    expect(result.completeMatch).toBe(expected.completeMatch);
  });

  test.each([
    [
      stringMatcher('turnipszone', 'turnipszone'),
      { match: true, completeMatch: true },
    ],
    [
      stringMatcher('turnips in the flurnips', 'turnips in the flurnips'),
      { match: true, completeMatch: true },
    ],
    [
      stringMatcher('123456789', '123456789'),
      { match: true, completeMatch: true },
    ],
  ])('Correctly identifies a complete match', (result, expected) => {
    console.log('result: ', result);
    console.log('expected: ', expected);
    expect(result.match).toBe(expected.match);
    expect(result.completeMatch).toBe(expected.completeMatch);
  });

  test.each([
    [
      stringMatcher('turnipszone', 'turnipszone'),
      { match: true, completeMatch: true, rating: 1 },
    ],
    [
      stringMatcher('turnips in the flurnips', 'the quick brown fox'),
      { match: false, completeMatch: false, rating: 0 },
    ],
    [
      stringMatcher('123456789', '456'),
      { match: true, completeMatch: false, rating: 0.333 },
    ],
    [
      stringMatcher('12345678', '1234'),
      { match: true, completeMatch: false, rating: 0.5 },
    ],
  ])(
    'Correctly calculate rating (from 0 for no match, to 1 for a complete match)',
    (result, expected) => {
      console.log('result: ', result);
      console.log('expected: ', expected);
      expect(result.rating).toBeCloseTo(expected.rating);
    },
  );

  test.each([
    [
      stringMatcher('TURNIPSZONE', 'turnipszone'),
      { match: true, completeMatch: true, rating: 1 },
    ],
    [
      stringMatcher('wowser in the bowser', 'WoWSer in The'),
      { match: true, completeMatch: false, rating: 0.65 },
    ],
  ])('Ignore case when comparing strings', (result, expected) => {
    expect(result).toMatchObject(expected);
  });

  test.each([
    [
      [
        stringMatcher('', ''),
        { match: false, completeMatch: false, rating: 0 },
      ],
      [
        stringMatcher('', 'empty'),
        { match: false, completeMatch: false, rating: 0 },
      ],
      [
        stringMatcher('something', ''),
        { match: false, completeMatch: false, rating: 0 },
      ],
    ],
  ])(
    'Return a false match against an empty input string',
    (result, expected) => {
      expect(result).toMatchObject(expected);
    },
  );
});
