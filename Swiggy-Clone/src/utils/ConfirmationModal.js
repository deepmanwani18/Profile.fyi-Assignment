import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modalBoxStyle } from "./constant";
const ConfirmationModal = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="bg-skin rounded-lg absolute top-[50%] left-[50%] shadow-lg"
        sx={modalBoxStyle}
      >
        <h1 className=" text-orange font-bold">{title}</h1>
        <h2>{message}</h2>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="  px-4 py-2 rounded-lg text-orange bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="  px-4 py-2 rounded-lg text-white bg-orange"
          >
            Yes
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
