import gsap from 'gsap';

// STAGGER THE LINKS TO APPEAR
export const staggerText = (node1) => {
  gsap.from([node1], {
    transformOrigin: 'right top',
    duration: 0.8,
    y: 100,
    delay: 0.1,
    ease: 'power3.inOut',
    scale: 0.8,
    stagger: {
      amount: 0.3,
    },
  });
};

// Hover on the link
export const handleHover = (e) => {
  gsap.to(e.target, {
    duration: 0.3,
    y: 10,
    skewX: 10,
    ease: 'power1.inOut',
    color: '#B9C6FF',
  });
};

// Hover off the link
export const handleHoverExit = (e) => {
  gsap.to(e.target, {
    duration: 0.3,
    y: -3,
    skewX: 0,
    ease: 'power1.inOut',
    color: '#000',
  });
};
