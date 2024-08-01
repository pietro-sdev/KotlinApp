import React from 'react';
import SearchImage from '@mui/icons-material/Search';
import styles from './search_icon.module.css';

export default function SearchIcon() {
    return (
        <div className={styles.lupa}>
            <SearchImage/>
        </div>
    )
}