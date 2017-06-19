import {timeToString} from './ClockDigits';

test('Takes 1000 and returns into 00:01', () => {
  expect(timeToString(1000)).toBe("00:01");
})

test('Takes 1500000 and returns 25:00', () =>{
  expect(timeToString(1500000)).toBe("25:00");
})

test('Takes 1128000 and returns 18:48', () =>{
  expect(timeToString(1128000)).toBe("18:48");
})
