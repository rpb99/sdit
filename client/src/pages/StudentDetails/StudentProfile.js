import React from 'react'
import {
    TextField,
    NativeSelect,
    InputLabel,
    MenuItem,
    FormControl,
    makeStyles
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const useStyles = makeStyles((theme) => ({
    input: {
        color: "rgba(255,255,255,.8)",
    },
    label: {
        color: "rgba(255,255,255,.5)",
    },
}));

const StudentProfile = ({ handleSubmit, setForm, form }) => {

    const classes = useStyles();

    const handleChange = ({ target }) => {
        const { name, value } = target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleDateChange = (date) => {
        setForm({
            ...form,
            tgl_lahir: date
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full text-white flex flex-col space-y-6">
            <TextField variant="outlined" color="secondary" autoFocus margin="dense" id="nis" name="nis" label="NIS" fullWidth
                value={
                    form.nis
                }
                onChange={handleChange}
                disabled
            />
            <TextField variant="outlined" color="secondary" autoFocus margin="dense" id="nama" name="nama" label="Nama" fullWidth
                value={
                    form.nama
                }
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
                onChange={handleChange} />
            <TextField
                variant="outlined"
                autoFocus margin="dense"
                id="tempat_lahir" name="tempat_lahir"
                label="Tempat Lahir"
                fullWidth
                value={form.tempat_lahir}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
                onChange={handleChange} />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker disableFuture inputVariant="outlined" margin="normal" id="tgl_lahir" name="tgl_lahir" label="Tanggal Lahir" format="DD MMMM yyyy"
                    value={
                        form.tgl_lahir
                    }
                    onChange={handleDateChange}
                    KeyboardButtonProps={
                        { 'aria-label': 'tanggal lahir' }
                    }
                    InputProps={{
                        className: classes.input
                    }}
                    InputLabelProps={{
                        className: classes.label
                    }}
                    fullWidth />
            </MuiPickersUtilsProvider>
            <TextField
                variant="outlined"
                id="select-jk"
                label="Jenis Kelamin"
                value={form.jenis_kelamin}
                select onChange={handleChange}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
            >
                <MenuItem value="L">Laki-laki</MenuItem>
                <MenuItem value="P">Perempuan</MenuItem>
            </TextField>
            <TextField variant="outlined" autoFocus margin="dense" id="telepon" name="telepon" label="Telepon" fullWidth
                value={
                    form.telepon
                }
                onChange={handleChange}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
            />
            <TextField variant="outlined" autoFocus margin="dense" id="alamat" name="alamat" label="Alamat" fullWidth
                value={
                    form.alamat
                }
                onChange={handleChange}
                InputProps={{
                    className: classes.input
                }}
                InputLabelProps={{
                    className: classes.label
                }}
            />
            <button className="text-blue-600 text-sm flex items-center">
                <SaveIcon />
                <div>
                    Simpan
</div>
            </button>
        </form>
    )
}

export default StudentProfile
