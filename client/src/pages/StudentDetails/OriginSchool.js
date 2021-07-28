import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createOriginSchool, updateOriginSchool, deleteOriginSchool } from '../../api/originSchoolApi'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '../../components/Form/TextField'
import DateTimePicker from '../../components/Form/DateTimePicker'

const OriginSchool = ({ errors, setErrors, form, setForm, newState, loadOriginSchool, setAlert, handleAlertClose }) => {
    const studentId = useParams().id

    const [schoolIds, setSchoolIds] = useState([])

    let cloneForm = [...form];
    let cloneErrors = [...errors];


    const handleSubmit = () => {
        let fieldRequired = ['surat_pindah', 'tingkat', 'nama']
        let hasEmptyValue = []

        // Extract form
        fieldRequired.map(nameRequired =>
            Object.values((form)).map((item, extractId) =>
                // Get field empty value
                Object.entries(item).forEach((value) => {
                    if (nameRequired === value[0] && !value[1]) {
                        hasEmptyValue.push({ 'id': extractId + 1, 'name': value[0] })
                    }
                }
                )
            )
        )

        setErrors(hasEmptyValue)

        if (hasEmptyValue.length) return;

        if (schoolIds.length) {
            schoolIds.map(schoolId => {
                return deleteOriginSchool(schoolId).then(() => {
                    setSchoolIds([])
                    loadOriginSchool()
                    handleAlertClose()
                    setAlert({ message: 'Data Sekolah Asal berhasil di simpan', open: true })
                })
            })
        }

        cloneForm.map(item => {
            if (item.id) {
                return updateOriginSchool(item.id, item)
                    .then(() => {
                        loadOriginSchool()
                        handleAlertClose()
                        setAlert({ message: 'Data Sekolah Asal berhasil di simpan', open: true })
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            } else {
                return createOriginSchool(studentId, item)
                    .then(() => {
                        loadOriginSchool()
                        handleAlertClose()
                        setAlert({ message: 'Data Sekolah Asal berhasil di simpan', open: true })
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            }
        })

    }

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

    const handleDeleteForm = (schoolId, idx) => {
        cloneErrors = errors.filter(error => error['id'] !== idx + 1)
        setErrors(cloneErrors)

        cloneForm.splice(idx, 1)
        setForm(cloneForm)
        // store school ids to variable
        if (schoolId) {
            setSchoolIds((prevState) => ([...prevState, schoolId]))
        }
    }

    const handleResetForm = () => {
        setSchoolIds([])
        loadOriginSchool()
    }



    return (
        <>
            <div className="flex justify-end space-x-4 mb-6">
                <button className=" px-6 py-1 rounded bg-black bg-opacity-20 hover:bg-opacity-40 transition duration-400 text-gray-400 hover:text-gray-200" onClick={handleResetForm}>Reset</button>
                <button className=" px-6 py-1 rounded bg-black bg-opacity-40 hover:bg-opacity-60 transition duration-400 text-white" onClick={handleAddForm}>Tambah Data</button>
            </div>
            {form.length ? form.map((item, idx) =>
                <div className="rounded mb-6 bg-black bg-opacity-20 py-6 px-4" key={idx}>
                    <div className="flex justify-end" >
                        <button className="bg-red-700 bg-opacity-20 text-red-400 px-3 py-1 rounded text-xs hover:bg-opacity-30 transition duration-300" onClick={() => handleDeleteForm(item.id, idx)}>Hapus</button>
                    </div>
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="nama"
                        label="Nama Sekolah"
                        required
                        errors={errors}
                        textFieldIndex={idx}
                        value={item.nama}

                    />
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="surat_pindah"
                        label="Surat Pindah"
                        required
                        value={item.surat_pindah}
                        errors={errors}
                        textFieldIndex={idx}
                    />
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="alamat"
                        label="Alamat"
                        value={item.alamat}
                        errors={errors}
                        textFieldIndex={idx}
                    />
                    <TextField
                        onChange={(e) => handleChange(e, idx)}
                        name="tingkat"
                        label="Tingkat"
                        required
                        value={item.tingkat}
                        errors={errors}
                        textFieldIndex={idx}
                    />
                    <DateTimePicker
                        onChange={(date) => {
                            cloneForm[idx]['tgl_masuk'] = date;
                            setForm(cloneForm)
                        }}
                        name="tgl_masuk"
                        label="Tanggal Masuk Sekolah"
                        value={item.tgl_masuk}
                        errors={errors}
                        textFieldIndex={idx}
                    />
                    <DateTimePicker
                        onChange={(date) => {
                            cloneForm[idx]['tgl_keluar'] = date;
                            setForm(cloneForm)
                        }}
                        name="tgl_keluar"
                        label="Tanggal Keluar Sekolah"
                        value={item.tgl_keluar}
                        errors={errors}
                        textFieldIndex={idx}
                    />
                </div>
            ) : <div className="mt-6 text-center text-gray-400">Tidak Ada Data</div>}
            <div className="flex justify-end">
                <button className="flex items-center space-x-1 px-6 py-1 rounded bg-black bg-opacity-40 hover:bg-opacity-60 transition duration-400 text-white" onClick={handleSubmit}><SaveIcon /><span>Simpan</span></button>
            </div>
        </>

    )
}

export default OriginSchool
