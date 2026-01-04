/**
 * Motion utilities for framer-motion
 * Provides helper functions and hooks for animations
 */

import { type Variants, type Transition } from 'framer-motion';
import { animation, transition, duration, easing } from '../tokens/motion';

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get transition with reduced motion support
 */
export const getTransition = (
  customTransition?: Transition,
  fallbackDuration: number = duration.fast
): Transition => {
  if (prefersReducedMotion()) {
    return {
      duration: fallbackDuration,
      ease: easing.linear,
    };
  }
  return customTransition || transition.default;
};

/**
 * Get animation variants with reduced motion support
 */
export const getVariants = (
  customVariants?: Variants,
  fallbackVariants?: Variants
): Variants => {
  if (prefersReducedMotion()) {
    return (
      fallbackVariants || {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    );
  }
  return customVariants || animation.fadeIn;
};

/**
 * Common animation variants
 */
export const variants = {
  fade: animation.fadeIn,
  slideUp: animation.slideUp,
  slideDown: animation.slideDown,
  slideLeft: animation.slideLeft,
  slideRight: animation.slideRight,
  scale: animation.scaleIn,
  modal: animation.modal,
  overlay: animation.overlay,
} as const;

/**
 * Common transitions
 */
export const transitions = {
  default: transition.default,
  fast: transition.fast,
  slow: transition.slow,
  modal: transition.modal,
  overlay: transition.overlay,
  spring: transition.spring,
  springGentle: transition.springGentle,
} as const;

