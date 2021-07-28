import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles, Icon } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    input: {
        color: "rgba(255,255,255,.8)",
    },
    label: {
        color: "rgba(255,255,255,.5)",
    },
}));


const DateTimePicker = ({ name, label, textFieldIndex, required, errors, ...props }) => {
    const classes = useStyles();


    const id = textFieldIndex + 1
    const attr = {
        id: name,
        name: name,
        label: label,
        margin: "dense",
        inputVariant: "outlined",
        required,
        fullWidth: true,
        format: "DD MMMM yyyy",
        // KeyboardButtonProps: { 'aria-label': 'tanggal lahir' },
        InputProps: { className: classes.input },
        InputLabelProps: { className: classes.label },
    }

    let hasError = errors.find(item => item.name === name && item.id === id)

    return (
        <MuiPickersUtilsProvider utils={MomentUtils} >
            <KeyboardDatePicker
                {...props}
                {...attr}
                keyboardIcon={<Icon style={{ color: '#fff' }}>event</Icon>}
                error={hasError === undefined ? false : true}
                helperText={hasError === undefined ? "" : `${label} tidak boleh kosong`} />
        </MuiPickersUtilsProvider>
    )
}

export default DateTimePicker
