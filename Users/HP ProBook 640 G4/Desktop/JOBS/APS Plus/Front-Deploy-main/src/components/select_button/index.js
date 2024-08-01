import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { padding } from '@mui/system';

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

export default function SelectButton({ value, variant, borderRadius, color = "#000", backgroundColor = '#CDD3FF', width = "100%", height = "60px", margin, label, names, onChange }) {

    const theme = useTheme();
    return (
        <Box
            sx={{
                width: width, margin: margin, height: height,
                fontWeight: "500", font: 'Mulish'
            }}
        >
            <FormControl
                variant={variant}
                margin="1px"
                sx={{
                    width: "100%", height: "100%",
                    backgroundColor: '#CDD3FF',
                    borderRadius: "8px"
                }}>
                <InputLabel sx={{
                    color: color, ml: 1, fontWeight: "500", font: 'Mulish'
                }}>{label}</InputLabel>
                <Select
                    variant='standard'
                    onChange={onChange}
                    sx={{
                        borderRadius: borderRadius, color, height: "100%", ml: 1
                    }}
                    value={value}
                    style={getStyle(theme)}
                >

                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyle(theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    );
}