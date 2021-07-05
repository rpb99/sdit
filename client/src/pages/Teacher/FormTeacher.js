import { TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DialogForm from '../../components/Feedback/Dialog/DialogForm'


const FormTeacher = ({ handleSubmit, handleDateChange, handleClose, handleChange, form, open, hasStudentData }) => {
    return (
        <div>
            <DialogForm handleSubmit={handleSubmit} handleClose={handleClose} open={open}>
                <form className="w-full">
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nis"
                        name="nis"
                        label="NIS"
                        fullWidth
                        value={form.nis}
                        onChange={handleChange}
                        disabled={hasStudentData}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nama"
                        name="nama"
                        label="Nama"
                        fullWidth
                        value={form.nama}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tempat_lahir"
                        name="tempat_lahir"
                        label="Tempat Lahir"
                        fullWidth
                        value={form.tempat_lahir}
                        onChange={handleChange}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="tgl_lahir"
                            name="tgl_lahir"
                            label="Tanggal Lahir"
                            format="DD MMMM yyyy"
                            value={form.tgl_lahir}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'tanggal lahir',
                            }}
                            fullWidth
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl fullWidth>
                        <InputLabel id="jenis_kelamin_label">Jenis Kelamin</InputLabel>
                        <Select
                            labelId="jenis_kelamin_label"
                            id="jenis_kelamin"
                            name="jenis_kelamin"
                            label="Tanggal Lahir"
                            value={form.jenis_kelamin}
                            onChange={handleChange}

                        >
                            <MenuItem value="L">Laki-laki</MenuItem>
                            <MenuItem value="P">Perempuan</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="telepon"
                        name="telepon"
                        label="Telepon"
                        fullWidth
                        value={form.telepon}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="alamat"
                        name="alamat"
                        label="Alamat"
                        fullWidth
                        value={form.alamat}
                        onChange={handleChange}
                    />
                </form>
            </DialogForm>
        </div>
    )
}

export default FormTeacher
