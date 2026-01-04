/**
 * Motion tokens for animations and transitions
 * Used with framer-motion for consistent animations across the design system
 */

// Duration tokens (in seconds)
export const duration = {
  instant: 0,
  fast: 0.1,
  base: 0.2,
  slow: 0.3,
  slower: 0.5,
  slowest: 0.8,
} as const;

// Easing functions
export const easing = {
  linear: [0, 0, 1, 1] as [number, number, number, number],
  easeIn: [0.4, 0, 1, 1] as [number, number, number, number],
  easeOut: [0, 0, 0.2, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
  // Material Design easing curves
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  decelerate: [0, 0, 0.2, 1] as [number, number, number, number],
  accelerate: [0.4, 0, 1, 1] as [number, number, number, number],
  // Spring-like easing
  spring: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

// Animation presets for common use cases
export const animation = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
  },
  
  // Slide animations
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  scaleOut: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.95 },
  },
  
  // Combined animations (commonly used in modals/dialogs)
  modal: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  },
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  
  // Spring animations
  bounce: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
} as const;

// Transition presets
export const transition = {
  // Standard transitions
  default: {
    duration: duration.base,
    ease: easing.easeOut,
  },
  fast: {
    duration: duration.fast,
    ease: easing.easeOut,
  },
  slow: {
    duration: duration.slow,
    ease: easing.easeOut,
  },
  
  // Modal/Dialog transitions
  modal: {
    duration: duration.base,
    ease: easing.easeOut,
  },
  overlay: {
    duration: duration.base,
    ease: easing.easeInOut,
  },
  
  // Spring transitions
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 25,
  },
} as const;

