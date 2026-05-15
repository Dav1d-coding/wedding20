"use client";

import { motion, type MotionProps, useInView } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
} & MotionProps;

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

