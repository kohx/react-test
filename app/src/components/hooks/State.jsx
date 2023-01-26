import React, { useState } from 'react';

export default () => {
  const [punch, setPunch] = useState(0);

  // `punch + 1`の書き方（非推奨）
  const singlePunch = () => {
    setPunch(punch + 1);
  }

  // ダブルパンチができない
  const doublePunch = () => {
    singlePunch();
    singlePunch();
  };

  const [kick, setKick] = useState(0);

  // `(prev) => prev + 1`の書き方（推奨）
  const singleKick = () => {
    setKick((prev) => prev + 1)
  }

  // ダブルキックできる
  const doubleKick = () => {
    singleKick((prev) => prev + 1)
    singleKick((prev) => prev + 1)
  }

  const [guard, setGuard] = useState(0);

  return (
    <>
      <div>punch: {punch}</div>
      <button onClick={singlePunch}>singlePunch!</button>
      <button onClick={doublePunch}>doublePunch!</button>

      <div>kick: {kick}</div>
      <button onClick={singleKick}>singleKick!</button>
      <button onClick={doubleKick}>doubleKick!</button>

      <div>guard: {guard}</div>
      {/* インラインで書く */}
      <button onClick={() => setGuard((prev) => prev + 1)}>guard</button>
    </>
  )
}