import {
    TextField,
    makeStyles
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    input: {
        color: "rgba(255,255,255,.8)",
    },
    label: {
        color: "rgba(255,255,255,.5)",
    },
}));


const Index = ({ name, label, textFieldIndex, required, errors, ...props }) => {
    const classes = useStyles();

    const id = textFieldIndex + 1

    const attr = {
        id: name,
        name: name,
        label: label,
        margin: "dense",
        variant: "outlined",
        required,
        fullWidth: true,
        InputLabelProps: { className: classes.label },
        InputProps: { className: classes.input },
    }


    let hasError = errors.find(item => item.name === name && item.id === id)

    return (
        <TextField
            {...props}
            {...attr}
            error={hasError === undefined ? false : true}
            helperText={hasError === undefined ? "" : `${label} tidak boleh kosong`}
        />
    )
}

export default Index
