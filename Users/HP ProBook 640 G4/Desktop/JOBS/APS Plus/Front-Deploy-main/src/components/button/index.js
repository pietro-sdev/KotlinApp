import React from "react";
import styles from "./styledButton.module.css";
import { Button } from "@mui/material";

export default function StyledButton({
  endIcon,
  href,
  borderRadius,
  startIcon,
  color = "#FFF",
  backgroundColor = "#003895",
  variant,
  width,
  height,
  text,
  fontSize,
  fontWeigth,
  margin = null,
  onClick,
}) {
  return (
    <Button
      href={href}
      endIcon={endIcon}
      startIcon={startIcon}
      variant={variant}
      onClick={onClick}
      sx={{
        borderRadius: borderRadius,
        textTransform: "none",
        color: color,
        fontFamily: "Mulish",
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        margin: margin,
        fontSize: fontSize,
        fontWeight: fontWeigth,
      }}
    >
      <p>{text}</p>
    </Button>
  );
}
