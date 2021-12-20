// Framer Motion
import { motion } from "framer-motion";

// Material UI
import Box from "@mui/material/Box";

const Toast = ({ mode, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-10%" }}
      animate={{ opacity: 1, x: "0%" }}
      exit={{ opacity: 0, x: "-10%" }}
    >
      <Box
        sx={{
          minWidth: "150px",
          borderRadius: "4px",
          padding: "8px 12px",
          textAlign: "center",
          color: `${mode}.contrastText`,
          bgcolor: `${mode}.main`,
        }}
      >
        {message}
      </Box>
    </motion.div>
  );
};
export default Toast;
