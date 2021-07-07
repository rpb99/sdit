import { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const SnackbarComponent = ({ message, open, handleClose }) => {
    const [state] = useState({
        vertical: 'bottom',
        horizontal: 'center',
    });

    const { vertical, horizontal } = state;

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={6000}
            open={open}
            onClose={handleClose}
            key={vertical + horizontal}
        >
            <Alert
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent
