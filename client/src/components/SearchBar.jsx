import React, { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        setIsOpen(true);

        if (newQuery.trim() !== '') {
            try {
                const response = await axios.get(`http://localhost:8000/api/search?q=${encodeURIComponent(newQuery)}`);
                setResults(Array.isArray(response.data) ? response.data : []);
                console.log("results" , response.data)
                response.data.map((result) => (console.log(result._id)))
            } catch (error) {
                console.error('Error searching users:', error);
                setResults([]);
            }
        } else {
            setResults([]);
        }
    };

    const handleResultClick = (id) => {
        setQuery(''); // Clear the input field
        setResults([]); // Clear the results
        setIsOpen(false); // Close the dropdown
        navigate(`/profile/${id}`); // Navigate to the selected user's profile
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%' , margin: '0 auto', display:'flex' ,justifyContent:'space-around' }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={query}
                    onChange={handleSearchChange}
                />
            </Search>
            {isOpen && results.length > 0 && (
                <Paper
                    ref={dropdownRef}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        top: '100%',
                        left: 0,
                        zIndex: 10,
                        maxHeight: '300px', // Set a fixed max height
                        overflowY: 'auto', // Add scroll if content exceeds max height
                    }}
                >
                    {results.map((result) => (
                        <MenuItem
                            key={result._id}
                            onClick={() => handleResultClick(result._id)}
                        >
                            {result.firstName} {result.lastName}
                        </MenuItem>
                    ))}
                </Paper>
            )}
        </Box>
    );
};

export default SearchBar;
