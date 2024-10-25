"use client";

import { motion } from "framer-motion";

const duration = 0.4

function MotionPageTransitionFromBottom({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: duration,
        delay: 0,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function MotionPageTransitionFromTop({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: duration,
        delay: 0,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function MotionPageTransitionFromLeft({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{
        ease: "easeInOut",
        duration: duration,
        delay: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

export {
  MotionPageTransitionFromBottom,
  MotionPageTransitionFromTop,
  MotionPageTransitionFromLeft,
};
