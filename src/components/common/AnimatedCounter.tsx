import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  to: number;
  prefix?: string;
  postfix?: string;
}

const AnimatedCounter = ({ to, prefix = '', postfix = '' }: Props) => {
  const count = useMotionValue(0);
  
  // This transform function now includes the toLocaleString() formatting.
  const rounded = useTransform(count, latest => {
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });

    return controls.stop;
  }, [to]); // We can safely remove `count` from the dependency array.

  return (
    <span className="font-bold text-slate-900 dark:text-white">
      {prefix}
      {/* 
        --- THIS IS THE FIX ---
        Instead of a plain <span>, we use <motion.span>.
        We pass the reactive 'rounded' motionValue directly as the child.
        Framer Motion will now handle updating the DOM efficiently.
      */}
      <motion.span>{rounded}</motion.span>
      {postfix}
    </span>
  );
};

export default AnimatedCounter;