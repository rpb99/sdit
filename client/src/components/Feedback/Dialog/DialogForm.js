import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "600px",
        [theme.breakpoints.down('xs')]: {
            width: "400px",
        },
        [theme.breakpoints.only('sm')]: {
            width: "500px",
        },
    },
}));



export default function FormDialog({ handleSubmit, handleClose, open, children }) {
    const classes = useStyles();
    return (
        <div className="w-full">
            <Dialog disableBackdropClick maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className="flex justify-between items-center">
                    <DialogTitle id="form-dialog-title"> <Button onClick={handleClose} color="primary">
                        <ArrowBackIcon />
                    </Button></DialogTitle>
                    <DialogTitle id="form-dialog-title" style={{ marginRight: '16px' }}>
                        <button className="text-blue-600 text-sm flex items-center" onClick={handleSubmit}>
                            <SaveIcon />
                            <div>
                                Simpan
                            </div>
                        </button>
                    </DialogTitle>
                </div>
                <DialogContent className={classes.root} dividers>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}
