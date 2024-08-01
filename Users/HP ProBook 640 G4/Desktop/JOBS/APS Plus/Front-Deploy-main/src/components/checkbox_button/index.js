import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ListItemText } from '@mui/material';

export default function CheckboxButton({ variant, borderRadius = "8px", color = "white", backgroundColor = '#003895', width = 300, label, names, onChange, selected = [] }) {

    return (
        <Box sx={{ width: width }}>
            <FormControl variant={variant} sx={{ borderRadius: borderRadius, width: "100%", backgroundColor }}>
                <InputLabel focused={false} shrink={false} sx={{ color }}>{label}</InputLabel>
                <Select onChange={onChange} sx={{ borderRadius: borderRadius, color }}
                    multiple
                    value={selected}
                    renderValue={_ => ""}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={selected.indexOf(name) !== -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
        </Box>
    );

}