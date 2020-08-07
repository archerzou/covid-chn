import React, { useEffect, useState } from 'react';
import './TextUnderMouse.css';

const TextUnderMouse = ({ text }) => {
  const [mouseX, setMouseX] = useState(null);
  const [mouseY, setMouseY] = useState(null);
  useEffect(() => {
    const onMouseUpdate = (e) => {
      setMouseX(e.pageX + 15);
      setMouseY(e.pageY - 40);
    };

    document.addEventListener('mousemove', onMouseUpdate);

    return () => {
      document.removeEventListener('mousemove', onMouseUpdate);
    };
  }, []);

  return (
    <div className='text-under-mouse' style={{ top: mouseY, left: mouseX }}>
      {text}
    </div>
  );
};

export default TextUnderMouse;
