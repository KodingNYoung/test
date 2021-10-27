import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },
  input: {
    border: '1px solid #707070',
    borderRadius: ' 4px',
    textAlign: 'center',
    appearance: 'textfield',
    marginRight: '1.5rem',
    padding: '1rem 0',
    width: '20%',
    maxWidth: '50px',
    borderColor: '#fff',
    outline: 'none',
    boxShadow: '0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function PinInput({ pinDigits, name, onChange }) {
  const classes = useStyles();

  const handleFocus = (e) => {
    e.target.select();

    const previousBox = e.target.previousElementSibling;
    const nextBox = e.target.nextElementSibling;

    // this is to avoid a forward box being filled first and a backward box being filled last
    if (previousBox && !previousBox.value) {
      previousBox.focus();
    } else if (nextBox && nextBox.value) {
      nextBox.focus();
    }
  };
  const handleKeyPress = (e) => {
    const element = e.target;
    if (
      e.keyCode === 8 &&
      element.previousElementSibling &&
      element.value === ''
    ) {
      e.preventDefault();
      element.previousElementSibling.focus();
    }
  };
  return (
    <form noValidate autoComplete='off' className={classes.root}>
      {pinDigits.map((digit, index) => {
        return (
          <input
            className={classes.input}
            key={index}
            type='text'
            name={name}
            value={digit}
            onChange={(e) => onChange(e, index)}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
            autoFocus={index === 0 ? true : false}
            maxLength='1'
            placeholder='*'
            required
          />
        );
      })}
    </form>
  );
}

export default PinInput;
