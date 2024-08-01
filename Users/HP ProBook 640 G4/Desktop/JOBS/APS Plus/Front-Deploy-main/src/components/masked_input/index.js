import ReactInputMask from 'react-input-mask';
import { Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InputField from '../input_field';

function getStyle(theme) {
    return {
        color: "#000",
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '24px',
        boxShadow: 'none'
    }
}

const MaskedInput = ({
    mask, select = false, fontWeight = "500", textColor = "#000",
    names, variant = "filled", placeholder, width, height, label,
    name, type, value, onChange, margin, disabled = false, backgroundColor = "#CDD3FF",
    icon = null, fontFamily = 'Mulish', fontStyle = 'normal',
    fontSize = '18px', lineHeight = '24px'
}) => {
    const theme = useTheme();
    if (!disabled) {
        return (
            <Stack
                sx={{
                    width: width, heigh: height, margin: margin,
                    backgroundColor: backgroundColor, borderRadius: "8px",
                    "& .MuiInputBase-root": {
                        color: textColor,
                        fontWeight: fontWeight,
                        font: 'Mulish'
                    }
                }}
            >
                <ReactInputMask
                    sx={{
                        width: width, heigh: height, margin: margin,
                        backgroundColor: backgroundColor, borderRadius: "8px",
                        "& .MuiInputBase-root": {
                            color: textColor,
                            fontWeight: fontWeight,
                            font: 'Mulish'
                        }
                    }}
                    mask={mask}
                    value={value}
                    onChange={onChange}
                    style={getStyle(theme)}
                >
                    {() => <TextField variant={variant}
                        sx={{
                            width: width, height: height, margin: margin,
                            backgroundColor: backgroundColor, borderRadius: "8px",
                            "& .MuiInputBase-root": {
                                fontFamily: fontFamily,
                                fontStyle: fontStyle,
                                fontWeight: fontWeight,
                                fontSize: fontSize,
                                lineHeight: lineHeight
                            },
                        }}
                        fullWidth
                        placeholder={placeholder}
                        label={label}
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        InputProps={{
                            endAdornment: icon
                        }}
                        required
                    />}
                </ReactInputMask >

            </Stack>
        )
    }
    else {
        return (
            <Stack
                sx={{
                    width: width, heigh: height, margin: margin,
                    backgroundColor: backgroundColor, borderRadius: "8px",
                    "& .MuiInputBase-root": {
                        color: textColor,
                        fontWeight: fontWeight,
                        font: 'Mulish'
                    }
                }}
            >
                <InputField
                    sx={{
                        width: width, height: height, margin: margin,
                        backgroundColor: backgroundColor, borderRadius: "8px",
                        "& .MuiInputBase-root": {
                            fontFamily: fontFamily,
                            fontStyle: fontStyle,
                            fontWeight: fontWeight,
                            fontSize: fontSize,
                            lineHeight: lineHeight
                        },
                    }}
                    fullWidth
                    placeholder={placeholder}
                    label={label}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    InputProps={{
                        endAdornment: icon
                    }}
                    required
                    disabled
                />
            </Stack>
        )
    }

}
export default MaskedInput;