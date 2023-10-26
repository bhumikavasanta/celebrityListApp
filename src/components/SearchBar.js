import React from 'react';
import './Styles.css';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar(props) {

    const { searchTerm, handleInputChange } = props;

    return (
        <div>
            <TextField
                //   label="Search"
                style={{ width: '-webkit-fill-available' }}
                variant="outlined"
                placeholder="Search User"
                value={searchTerm}
                onChange={handleInputChange}
                // className="search-bar"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            </div>
    )
}

export default SearchBar