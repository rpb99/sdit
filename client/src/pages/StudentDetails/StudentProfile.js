import { useState } from 'react'
import {
    TextField,
    MenuItem,
    makeStyles
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { updateStudent } from '../../api/studentsApi'

const useStyles = makeStyles((theme) => ({
    input: {
        color: "rgba(255,255,255,.8)",
    },
    label: {
        color: "rgba(255,255,255,.5)",
    },
}));


const StudentProfile = ({ setAlert, setForm, form, handleAlertClose }) => {
    const classes = useStyles();
    const [errors, setErrors] = useState({})
    const [uploadProgress, setUploadProgress] = useState(0)

    const config = {
        onUploadProgress: progressEvent => setUploadProgress(Math.round(progressEvent.loaded / progressEvent.total * 100) + "%")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const hasErrors = Object.keys(errors).length
        if (hasErrors) {
            return;
        } else {
            console.log('hitted')
        }


        const obj = Object.entries(form)

        let formData = new FormData();

        formData.append('image', form.image)

        obj.map((item) => formData.set(item[0], item[1]))

        updateStudent(form.id, formData, config)
            .then((res) => {
                console.log(uploadProgress)
                handleAlertClose()
                setAlert({ message: 'Data profile berhasil di ubah', open: true })
            })
            .catch(({ response }) => console.log(response))
    }


    const handleChange = ({ target }) => {
        const { name, value } = target

        if (!value) {
            setErrors({ ...errors, [name]: true })
        } else {
            delete errors[name]
        }

        setForm({
            ...form,
            [name]: value
        })
    }

    const handleDateChange = (date) => {
        if (!date) {
            setErrors({ ...errors, tgl_lahir: true })
        } else {
            delete errors[tgl_lahir]
        }

        setForm({
            ...form,
            tgl_lahir: date
        });
    };

    const handleChangeFile = ({ target }) => {
        setForm({ ...form, image: target.files[0] })
    }

    const [nis, nama, tempatLahir, tgl_lahir, jenis_kelamin, telepon, alamat] = [
        {
            variant: "outlined",
            color: "secondary",
            autoFocus: true,
            margin: "dense",
            id: "nis", name: "nis",
            label: "NIS",
            fullWidth: true,
            required: true,
            value: form.nis,
            InputLabelProps: { className: classes.label },
            InputProps: { className: classes.input },
            onChange: handleChange,
            disabled: true,
        },
        {
            id: "nama",
            name: "nama",
            label: "Nama",
            value: form.nama,
            error: errors.nama,
            helperText: errors.nama && 'Nama tidak boleh kosong',
            margin: "dense",
            variant: "outlined",
            required: true,
            fullWidth: true,
            autoFocus: true,
            InputLabelProps: { className: classes.label },
            InputProps: { className: classes.input },
            onChange: handleChange
        },
        {
            id: "tempat_lahir",
            name: "tempat_lahir",
            label: "Tempat Lahir",
            value: form.tempat_lahir,
            error: !form.tempat_lahir,
            helperText: !form.tempat_lahir && 'Tempat Lahir tidak boleh kosong',
            margin: "dense",
            variant: "outlined",
            required: true,
            fullWidth: true,
            InputLabelProps: { className: classes.label },
            InputProps: { className: classes.input },
            onChange: handleChange
        },
        {
            id: "tgl_lahir",
            name: "tgl_lahir",
            label: "Tanggal Lahir",
            value: form.tgl_lahir,
            error: !form.tgl_lahir,
            helperText: !form.tgl_lahir && 'Tanggal Lahir tidak boleh kosong',
            margin: "dense",
            inputVariant: "outlined",
            required: true,
            fullWidth: true,
            disableFuture: true,
            format: "DD MMMM yyyy",
            KeyboardButtonProps: { 'aria-label': 'tanggal lahir' },
            InputProps: { className: classes.input },
            InputLabelProps: { className: classes.label },
            onChange: handleDateChange
        },
        {
            id: "select-jk",
            name: "jenis_kelamin",
            label: "Jenis Kelamin",
            value: form.jenis_kelamin,
            error: !form.jenis_kelamin,
            helperText: !form.jenis_kelamin && 'Jenis Kelamin tidak boleh kosong',
            margin: "dense",
            variant: "outlined",
            select: true,
            required: true,
            onChange: handleChange,
            InputProps: { className: classes.input },
            InputLabelProps: { className: classes.label }
        },
        {
            id: "telepon",
            name: "telepon",
            label: "Telepon",
            value: form.telepon,
            error: !form.telepon,
            helperText: !form.telepon && 'Telepon tidak boleh kosong',
            margin: "dense",
            variant: "outlined",
            required: true,
            fullWidth: true,
            autoFocus: true,
            InputLabelProps: { className: classes.label },
            InputProps: { className: classes.input },
            onChange: handleChange
        },
        {
            id: "alamat",
            name: "alamat",
            label: "Alamat",
            value: form.alamat,
            error: !form.alamat,
            helperText: !form.alamat && 'Alamat tidak boleh kosong',
            margin: "dense",
            variant: "outlined",
            required: true,
            fullWidth: true,
            autoFocus: true,
            InputLabelProps: { className: classes.label },
            InputProps: { className: classes.input },
            onChange: handleChange
        },

    ]

    return (
        <form onSubmit={handleSubmit} className="w-full text-white flex flex-col space-y-6">
            {/* <TextField {...nis} /> */}
            <TextField {...nama} />
            <TextField {...tempatLahir} />
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker {...tgl_lahir} />
            </MuiPickersUtilsProvider>
            <TextField    {...jenis_kelamin}>
                <MenuItem value="L">Laki-laki</MenuItem>
                <MenuItem value="P">Perempuan</MenuItem>
            </TextField>
            <TextField {...telepon} />
            <TextField {...alamat} />
            <input type="file" name="image" onChange={handleChangeFile} />
            <button className="flex space-x-1 items-center text-white text-sm ">
                <SaveIcon />
                <div>
                    Simpan
                </div>
            </button>
        </form>
    )
}

export default StudentProfile
