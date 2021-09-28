import React from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { searchStyles } from '../../styles';

const useStyles = searchStyles;

const Search = (props) => {
  const classes = useStyles();
  const { handleChange } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          name='search'
          onChange={handleChange}
          classes={{ root: classes.filledInput, input: classes.input }}
          disableUnderline
          placeholder='Search'
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        ></FilledInput>
      </FormControl>
    </form>
  );
};

export default Search;
