import React, { useRef, useEffect } from 'react';
import gsap, { TimelineLite, Power2 } from 'gsap';
import './styles.scss';

export default function App() {
  const timeline = new TimelineLite();
  const cards = Array(10).fill('something');
  const cardRef = useRef({ heading1: [], heading2: [] });
  const tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
  useEffect(() => {
    // timeline.staggerFrom(
    //   cardRef.current.heading1,
    //   0.3,
    //   { y: -10, opacity: 0, ease: Power2.easeInOut },
    //   0.3,
    // );
    //   .staggerFrom(
    //     cardRef.current.heading2,
    //     0.3,
    //     { y: -10, opacity: 0, ease: Power2.easeInOut },
    //     0.3,
    //   );
    gsap.from(cardRef.current.heading1, {
      y: -10,
      opacity: 0,
      ease: Power2.easeInOut,
      stagger: 0.3,
    });
    // tl.from(cardRef.current.heading1, 0.3, { y: -10, opacity: 0, ease: Power2.easeInOut }, 0.3);
  }, []);
  return (
    <div className='flex'>
      <div className='container'>
        <div className='heading'>heading 1</div>
        <div className='content'>
          {cards.map((card, index) => {
            return (
              <div
                className='card'
                key={'heading1' + index}
                ref={(el) => {
                  cardRef.current.heading1[index] = el;
                }}
              >
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
