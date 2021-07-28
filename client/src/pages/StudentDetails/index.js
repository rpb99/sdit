import { useState, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Snackbar from '../../components/Feedback/Snackbar'
import Tabs from '../../components/Navigation/Tabs';

import { getOriginSchool } from '../../api/originSchoolApi'
import { getStudent } from '../../api/studentsApi'

import StudentProfile from './StudentProfile';
import OriginSchool from './OriginSchool';

const initialFormProfileState = {
    nis: "",
    nama: "",
    tempat_lahir: "",
    tgl_lahir: new Date(),
    jenis_kelamin: "",
    telepon: "",
    alamat: "",
    foto: ""
}

const initSchoolState = {
    nama: "",
    surat_pindah: "",
    alamat: "",
    tgl_masuk: new Date(),
    tgl_keluar: new Date(),
    tingkat: "",
    survei: "",
}



const StudentDetails = () => {

    const history = useHistory()
    const studentId = useParams().id;

    const [formProfile, setFormProfile] = useState(initialFormProfileState)
    const [formSchool, setFormSchool] = useState([initSchoolState])
    const [errors, setErrors] = useState([])
    const loadOriginSchool = useCallback((id) => getOriginSchool(studentId).then(({ data }) => setFormSchool(data.data)), [studentId])
    const loadStudent = useCallback((id) =>
        getStudent(studentId)
            .then(({ data }) => {
                setFormProfile(data.data)
            })
            .catch(({ response }) => {
                response.status === 404 && history.push('/not-found')
            }), [history, studentId])

    const [alert, setAlert] = useState({
        open: false,
        message: ""
    })

    useEffect(() => {
        loadOriginSchool()
        loadStudent()
    }, [loadOriginSchool, loadStudent])

    const handleAlertClose = () => {
        setAlert({ message: '', open: false })
    }

    const tabs = ["Profile", "Sekolah Asal", "Orang Tua"]


    const contents = [
        <StudentProfile
            setForm={setFormProfile}
            form={formProfile}
            setAlert={setAlert}
            handleAlertClose={handleAlertClose}
        />,
        <OriginSchool
            // handleChange={handleChange}
            form={formSchool}
            setForm={setFormSchool}
            newState={initSchoolState}
            errors={errors}
            setErrors={setErrors}
            loadOriginSchool={loadOriginSchool}
            setAlert={setAlert}
            handleAlertClose={handleAlertClose}
        />
    ]

    return (
        <div>
            <div className="flex flex-col space-y-3 my-3">
                <div className="w-44">
                    <img src={process.env.REACT_APP_FILE_URL + formProfile.foto} alt="foto-siswa" />
                </div>
                <div>
                    <div className="text-gray-300 text-lg">{formProfile.nama}</div>
                    <div className="text-gray-400 text-xs">{formProfile.nis}</div>
                </div>
            </div>
            <Tabs
                tabs={tabs}
                contents={contents} />

            <Snackbar message={alert.message} open={alert.open} handleClose={handleAlertClose} />
        </div>
    )
}

export default StudentDetails


  // Extract form
//   Object.values((formSchool)).map((item, extractId) => {
//     // Get field empty value
//     fieldRequired.map(nameRequired => {
//         Object.entries(item).map((value, idx) => {

//             if (nameRequired == value[0] && !value[1] || value[1] === null) {
//                 hasEmptyValue.push({ 'id': extractId + 1, 'name': value[0] })
//             }
//         }
//         )
//     })
// })
