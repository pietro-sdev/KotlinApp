import { TextField } from "@mui/material";
import "./input_field.module.css";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { Stack } from "@mui/material";
function getStyle(theme) {
  return {
    color: "#000",
    fontFamily: "Mulish",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "24px",
    boxShadow: "none",
  };
}

const InputField = ({
  select = false,
  names,
  variant = "filled",
  textColor = "#000",
  placeholder,
  width,
  height,
  label,
  name,
  type,
  value,
  onChange,
  margin,
  disabled = false,
  backgroundColor = "#CDD3FF",
  icon = null,
  required = true,
  fontFamily = "Mulish",
  fontStyle = "normal",
  fontWeight = "500",
  fontSize = "18px",
  lineHeight = "24px",
  multiline = false,
  rows = 4
}) => {
  const theme = useTheme();
  if (select && required) {
    if (multiline)
      return (
        <TextField
          variant={variant}
          fullWidth
          disabled={disabled}
          sx={{
            width: width,
            height: height,
            margin: margin,
            backgroundColor: backgroundColor,
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              color: textColor,
              fontFamily: fontFamily,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
              fontSize: fontSize,
              lineHeight: lineHeight,
            },
          }}
          label={label}
          placeholder={placeholder}
          type={type}
          name={name}
          InputProps={{
            endAdornment: icon,
          }}
          required
          select
          SelectProps={{
            multiple: true,
            value: value,
            onChange: onChange,
            renderValue: (selected) => (
              <Stack direction={"row"} spacing={1}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            ),
          }}
        >
          {names.map((name) =>
            !!name ? (
              <MenuItem key={name} value={name} style={getStyle(theme)}>
                {name}
              </MenuItem>
            ) : null
          )}
        </TextField>
      );
    else
      return (
        <TextField
          variant={variant}
          fullWidth
          disabled={disabled}
          sx={{
            width: width,
            height: height,
            margin: margin,
            backgroundColor: backgroundColor,
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              color: textColor,
              fontFamily: fontFamily,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
              fontSize: fontSize,
              lineHeight: lineHeight,
            },
          }}
          label={label}
          placeholder={placeholder}
          type={type}
          name={name}
          InputProps={{
            endAdornment: icon,
          }}
          required
          select
          value={value}
          onChange={onChange}
        >
          {names.map((name) =>
            !!name ? (
              <MenuItem key={name} value={name} style={getStyle(theme)}>
                {name}
              </MenuItem>
            ) : null
          )}
        </TextField>
      );
  } else if (select && !required) {
    if (multiline)
      return (
        <TextField
          variant={variant}
          fullWidth
          disabled={disabled}
          sx={{
            width: width,
            height: height,
            margin: margin,
            backgroundColor: backgroundColor,
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              color: textColor,
              fontFamily: fontFamily,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
              fontSize: fontSize,
              lineHeight: lineHeight,
            },
          }}
          label={label}
          placeholder={placeholder}
          type={type}
          name={name}
          InputProps={{
            endAdornment: icon,
          }}
          select
          SelectProps={{
            multiple: true,
            value: value,
            onChange: onChange,
            renderValue: (selected) => (
              <Stack direction={"row"} spacing={1}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Stack>
            ),
          }}
        >
          {names.map((name) =>
            !!name ? (
              <MenuItem key={name} value={name} style={getStyle(theme)}>
                {name}
              </MenuItem>
            ) : null
          )}
        </TextField>
      );
    else
      return (
        <TextField
          variant={variant}
          fullWidth
          disabled={disabled}
          sx={{
            width: width,
            height: height,
            margin: margin,
            backgroundColor: backgroundColor,
            borderRadius: "8px",
            "& .MuiInputBase-root": {
              color: textColor,
              fontFamily: fontFamily,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
              fontSize: fontSize,
              lineHeight: lineHeight,
            },
          }}
          label={label}
          placeholder={placeholder}
          type={type}
          name={name}
          InputProps={{
            endAdornment: icon,
          }}
          select
          value={value}
          onChange={onChange}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      );
  } else if (!select && required) {
    return (
      <TextField
        variant={variant}
        fullWidth
        disabled={disabled}
        multiline={multiline}
        rows={!!multiline ? rows : 1}
        sx={{
          width: width,
          height: height,
          margin: margin,
          backgroundColor: backgroundColor,
          borderRadius: "8px",
          "& .MuiInputBase-root": {
            color: textColor,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            fontWeight: fontWeight,
            fontSize: fontSize,
            lineHeight: lineHeight,
          },
        }}
        label={label}
        placeholder={placeholder}
        type={type}
        name={name}
        InputProps={{
          endAdornment: icon,
        }}
        required
        value={value}
        onChange={onChange}
      />
    );
  } else {
    return (
      <TextField
        variant={variant}
        fullWidth
        disabled={disabled}
        sx={{
          width: width,
          height: height,
          margin: margin,
          backgroundColor: backgroundColor,
          borderRadius: "8px",
          "& .MuiInputBase-root": {
            color: textColor,
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            fontWeight: fontWeight,
            fontSize: fontSize,
            lineHeight: lineHeight,
          },
        }}
        placeholder={placeholder}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        InputProps={{
          endAdornment: icon,
        }}
      />
    );
  }
};

export default InputField;
