import ReactDOM from "react-dom";

// Components
import Toast from "./Toast";

// Hooks
import useToastPortal from "../../hooks/useToastPortal";
import useToastAutoClose from "../../hooks/useToastAutoClose";

// Redux
import { connect } from "react-redux";
import { removeNotification } from "../../redux/notificationSlices/notificationSlice";

// Framer Motion
import { AnimatePresence } from "framer-motion";

// Material UI
import { Box } from "@mui/material";

const ToastPortal = ({ toasts, removeToast }) => {
  const { loaded, portalId } = useToastPortal();

  useToastAutoClose({
    toasts,
    removeToast,
  });

  return loaded ? (
    ReactDOM.createPortal(
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <AnimatePresence exitBeforeEnter>
          {toasts.map((t) => (
            <Toast key={t.id} mode={t.mode} message={t.message} />
          ))}
        </AnimatePresence>
      </Box>,

      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => {
  return {
    toasts: state.notificationReducer.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeToast: (data) => dispatch(removeNotification(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastPortal);
