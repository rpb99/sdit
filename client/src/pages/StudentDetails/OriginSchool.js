import { useState } from 'react'
import {
    makeStyles
} from '@material-ui/core'

import TextField from '../../components/Form/TextField'
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








const OriginSchool = ({ errors, setErrors, form, setForm, newState, handleSubmit }) => {

    const classes = useStyles();



    let cloneForm = [...form];
    let cloneErrors = [...errors];

    const handleChange = (e, idx) => {
        let { name, value } = e.target

        cloneForm[idx][name] = value;
        setForm(cloneForm)

        if (!value) {
            let arrErrors = {}
            arrErrors['name'] = name
            arrErrors['id'] = idx + 1
            setErrors([...errors, arrErrors])
        } else {
            cloneErrors = errors.filter(error => error['name'] !== name || error['id'] !== idx + 1)
            setErrors(cloneErrors)
        }
    }

    const handleAddForm = () => {
        setForm(prevState => [...prevState, { ...newState }])
    }

    const handleDeleteForm = (idx) => {
        cloneErrors = errors.filter(error => error['id'] !== idx + 1)
        setErrors(cloneErrors)

        cloneForm.splice(idx, 1)
        setForm(cloneForm)
    }


    return (
        <>
            {JSON.stringify(errors)}
            <div className="flex justify-end mb-6">
                <button className=" px-6 py-1 rounded bg-black bg-opacity-40 hover:bg-opacity-60 transition duration-400 text-white" onClick={handleAddForm}>Tambah Data</button>
            </div>
            {form.length ? form.map((item, idx) =>
                <div className="rounded mb-6 bg-black bg-opacity-20 py-6 px-4" key={idx}>
                    <div className="flex justify-end" >
                        <button className="bg-red-700 bg-opacity-20 text-red-400 px-3 py-1 rounded text-xs hover:bg-opacity-30 transition duration-300" onClick={() => handleDeleteForm(idx)}>Hapus</button>
                    </div>
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="nama"
                        label="Nama Sekolah"
                        errors={errors}
                        textFieldIndex={idx}
                        value={item.nama}

                    />
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="surat_pindah"
                        label="Surat Pindah"
                        value={item.surat_pindah}
                        errors={errors}
                        textFieldIndex={idx}

                    />
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="tingkat"
                        label="Tingkat"
                        value={item.tingkat}
                        errors={errors}
                        textFieldIndex={idx}

                    />
                </div>
            ) : <div className="mt-6 text-center text-gray-400">Tidak Ada Data</div>}

            <button onClick={handleSubmit}>Simpan</button>
        </>

    )
}

export default OriginSchool
