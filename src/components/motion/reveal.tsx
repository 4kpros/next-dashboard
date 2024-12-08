"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

export function MotionRevealFromBottom({
  children,
  delay = 0.15,
}: Readonly<{ children: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionRevealFromTop({
  children,
  delay = 0.15,
}: Readonly<{ children: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: -75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionRevealFromLeft({
  children,
  delay = 0.15,
}: Readonly<{ children: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: -75 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionRevealFromRight({
  children,
  delay = 0.15,
}: Readonly<{ children: React.ReactNode; delay?: number }>) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
    return () => {};
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, x: 75 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
