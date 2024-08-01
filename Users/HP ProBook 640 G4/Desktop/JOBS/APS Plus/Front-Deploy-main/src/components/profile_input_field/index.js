import { TextField } from "@mui/material"
import styles from "./profile_input_field.module.css"
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

function getStyle(theme) {
    return {
        color: "#000",
        fontFamily: "Mulish",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "18px",
        lineHeight: "24px",
        boxShadow: "none",
        padding: "0.1rem"
    };
}

const ProfileInputField = ({
    label, name, value, onChange, names, select = false, disabled = false
}) => {
    const theme = useTheme();
    if (select) {
        return (
            <TextField
                disabled={disabled}
                className={styles.textField}
                inputProps={{
                    style: {
                        padding: "0.7rem 0.2rem",
                    }
                }}
                InputLabelProps={{ shrink: true }}
                sx={{
                    "& .MuiInputBase-root": {
                        color: "black",
                        fontFamily: "Mulish",
                        fontWeight: 400,
                        fontSize: "0.8rem",
                        lineHeight: "0.4rem",
                        padding: 0
                    },
                    "& label": {
                        left: "-5%",
                        top: "-60%",
                        fontSize: "1rem",
                        fontWeight: "700",
                        fontFamily: "Mulish",
                    },
                    "& .MuiSelect-select": {
                        display: "flex",
                        padding: "0.7rem 0.2rem",
                        alignItems: "center"
                    }
                }}
                variant='filled'
                label={label}
                name={name}
                onChange={onChange}
                value={value}
                select
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
    }
    else {
        return (
            <TextField
                disabled={disabled}
                className={styles.textField}
                inputProps={{
                    style: {
                        padding: "0.7rem 0.2rem",
                    }
                }}
                InputLabelProps={{ shrink: true }}
                sx={{
                    "& .MuiInputBase-root": {
                        color: "black",
                        fontFamily: "Mulish",
                        fontWeight: 400,
                        fontSize: "0.8rem",
                        lineHeight: "0.4rem",
                    },
                    "& label": {
                        left: "-5%",
                        top: "-60%",
                        fontSize: "1rem",
                        fontWeight: "700",
                        fontFamily: "Mulish",
                    }
                }}
                variant='filled'
                label={label}
                name={name}
                onChange={onChange}
                value={value}
            />
        )
    }
}

export default ProfileInputField;