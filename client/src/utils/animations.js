export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren, delayChildren } }
});

export const wordVariants = {
  enter: { y: '100%', opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }
};
