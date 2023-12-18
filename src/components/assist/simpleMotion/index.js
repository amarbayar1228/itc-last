import { motion, useCycle } from "framer-motion";
const SimpleMotion = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
export default SimpleMotion;
