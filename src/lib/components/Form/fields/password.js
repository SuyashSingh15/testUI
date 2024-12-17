import React from 'react';
import { useState } from 'react';
import StringField from './string';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Field = ({ otherProps, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };
      
    otherProps = {
        type: showPassword ? "text" : 'password',
        InputProps: {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={handlePasswordToggle} edge="end" sx={{ color: 'primary.periwinkle' }}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
            disableUnderline: true
        },
        ...otherProps
    }
    return <StringField otherProps={otherProps} {...props} />
}

export default Field;