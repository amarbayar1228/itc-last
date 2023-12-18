import { useAnimation, useInView, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { NextPage } from "next";

const Reveal = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <div className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={"visible"}
        transition={{ duration: 0.3, delay: 0 }}
      >
        {props.children}
      </motion.div>
    </div>
  );
};

export default Reveal;
