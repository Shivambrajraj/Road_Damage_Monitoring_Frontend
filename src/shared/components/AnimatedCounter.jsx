// frontend/src/shared/components/AnimatedCounter.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

/**
 * Counts up to `value` when it scrolls into view. Falls back to rendering the
 * raw value directly if it isn't numeric (e.g. "100%", "Stable").
 */
const AnimatedCounter = ({ value, duration = 1.1, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState('0');

  const numericMatch = typeof value === 'string' ? value.match(/^(-?\d+(?:\.\d+)?)(.*)$/) : null;
  const numeric = typeof value === 'number' ? value : numericMatch ? parseFloat(numericMatch[1]) : null;
  const suffix = typeof value === 'string' && numericMatch ? numericMatch[2] : '';

  useEffect(() => {
    if (!isInView || numeric === null) {
      if (numeric === null) setDisplay(value);
      return;
    }
    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const rounded = Number.isInteger(numeric) ? Math.round(v) : v.toFixed(1);
        setDisplay(`${rounded}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [isInView, numeric, suffix, duration, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

export default AnimatedCounter;
