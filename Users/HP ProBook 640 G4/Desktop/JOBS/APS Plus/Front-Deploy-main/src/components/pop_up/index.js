import {
  Stack,
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import StyledButton from "../button";
import { Height } from "@mui/icons-material";

const PopUp = ({
  name,
  description,
  action,
  onClick,
  backgroundColor = "#003895",
  handleClose,
  open,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography
            sx={{ fontFamily: "Mulish", fontWeight: 800, fontSize: 24 }}
          >
            {name}
          </Typography>

          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography
            sx={{ fontFamily: "Mulish", fontWeight: 400, fontSize: 18 }}
          >
            {description}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack
  
          justifyContent="space-between"
          alignItems={"center"}
        >

          <StyledButton
            onClick={onClick}
            backgroundColor={backgroundColor}
            variant={"contained"}
            text={`Sim, quero ${action}`}
          ></StyledButton>
          <Typography
            sx={{ fontFamily: "Mulish", fontWeight: 400, fontSize: 18 }}
          >
            <Link
              underline="hover"
              sx={{ color: "black", fontWeight: 400, cursor: "pointer" }}
              onClick={handleClose}
            >
              Não
            </Link>
          </Typography>

        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
