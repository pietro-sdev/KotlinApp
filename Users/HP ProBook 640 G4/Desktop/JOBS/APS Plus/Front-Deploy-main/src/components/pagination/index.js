import React from 'react';
import { Pagination } from '@mui/material';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Stack } from '@mui/material';
import StyledButton from '../button';

export default function StyledPagination({ page = 1, setPage, numberOfPages = 10, endIcon, href, borderRadius, startIcon, color = '#FFF',
    backgroundColor = '#003895', variant, width, height, text, margin = null, onClick }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#003895',
                contrastText: '#EEE'
            },
            secondary: {
                main: '#EECA53'
            },
            action: {
                active: '#EECA53',
                hover: '#EECA53',
                selected: '#EECA53',
                disabled: '#EECA53',
                disabledBackground: '#EECA53'

            }

        },
        typography: {
            fontFamily: [
                'Mulish'
            ],
            fontSize: 14,
            color: '#003895'
        },

        components: {
            MuiPaginationItem: {
                styleOverrides: {
                    // defaul
                    root: {
                        borderRadius: '8px',
                        width: '90%',
                        height: '34px',
                        margin: '5px 5px',
                        padding: '10px',
                        color: '#FFF',
                        backgroundColor: '#003895',
                        '&:hover': {
                            color: '#FFF',
                            backgroundColor: '#003895',
                        },
                    },
                    page: {
                        borderRadius: '50px',
                        width: '40px',
                        height: '34px',
                        margin: '5px 5px',
                        color: '#003895',
                        backgroundColor: '#EECA53',
                        '&:hover': {
                            color: '#FFF',
                            backgroundColor: '#00389590',
                        },

                        // remove background color of "..." button
                    },
                    ellipsis: {
                        backgroundColor: 'transparent',
                        color: '#003895',
                        margin: '0px 0px',
                        '&:hover': {
                            color: '#333',
                            backgroundColor: 'transparent',
                        },
                    },

                },
            },
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={2}>
                <Pagination
                    onChange={(e, p) => {
                        setPage(p)
                        window.scroll(0, 0)
                    }}
                    count={numberOfPages}
                    size='large'
                    color='primary'
                />
            </Stack>
        </ThemeProvider>
    )
}
