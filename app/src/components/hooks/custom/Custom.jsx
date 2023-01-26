import React from 'react'
import useCustom from './useCustom';

export default () => {
  const windowSize = useCustom();

  console.log(windowSize);
  

  return (
    <>
      <p>フラウザのコンテンツ領域の幅: {windowSize.width}px</p>
      <p>フラウザのコンテンツ領域の高さ: {windowSize.height}px</p>
    </>
  );
}