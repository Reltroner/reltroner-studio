export const MOTION_EASE = [0.22, 1, 0.36, 1];

export const MOTION_TIMINGS = {
  fast: 0.18,
  base: 0.32,
  slow: 0.56,
  float: 5.2,
};

export const VIEWPORT_REVEAL = {
  once: true,
  amount: 0.2,
};

function buildTransition(duration, delay = 0) {
  return {
    duration,
    delay,
    ease: MOTION_EASE,
  };
}

export const PAGE_FADE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 18,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: MOTION_TIMINGS.base,
      ease: MOTION_EASE,
    },
  },
};

export const REDUCED_PAGE_FADE_VARIANTS = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: MOTION_TIMINGS.fast,
      ease: MOTION_EASE,
    },
  },
};

export function getFadeRevealVariants({ distance = 20, delay = 0, reduced = false } = {}) {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: buildTransition(MOTION_TIMINGS.fast, delay),
      },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: distance,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: buildTransition(MOTION_TIMINGS.base, delay),
    },
  };
}

export const STAGGER_REVEAL_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
      ease: MOTION_EASE,
    },
  },
};

export const STAGGER_REVEAL_ITEM = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: buildTransition(MOTION_TIMINGS.base),
  },
};

export function getHoverDepthMotion(reduced = false) {
  if (reduced) {
    return {};
  }

  return {
    whileHover: {
      y: -6,
      scale: 1.01,
      transition: buildTransition(MOTION_TIMINGS.fast),
    },
    whileTap: {
      scale: 0.995,
      transition: buildTransition(0.12),
    },
  };
}

export function getAmbientFloatAnimation(reduced = false) {
  if (reduced) {
    return {};
  }

  return {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: MOTION_TIMINGS.float,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
}

export function getSoftParallaxRange(distance = 24) {
  return {
    input: [0, 1],
    output: [-distance, distance],
  };
}