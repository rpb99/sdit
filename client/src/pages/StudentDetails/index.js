import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Snackbar from '../../components/Feedback/Snackbar'
import Tabs from '../../components/Navigation/Tabs';

import { getOriginSchool, createOriginSchool } from '../../api/originSchoolApi'
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
    tgl_masuk: "",
    tgl_keluar: "",
    tingkat: "",
    survei: "",
}



const StudentDetails = () => {

    const history = useHistory()
    const { id } = useParams();

    const [formProfile, setFormProfile] = useState(initialFormProfileState)
    const [formSchool, setFormSchool] = useState([initSchoolState])
    const [errors, setErrors] = useState([])


    const [alert, setAlert] = useState({
        open: false,
        message: ""
    })

    useEffect(() => {
        loadOriginSchool()
        loadStudent()
    }, [])

    const loadOriginSchool = () => getOriginSchool(id).then(({ data }) => setFormSchool(data.data))

    const loadStudent = () =>
        getStudent(id)
            .then(({ data }) => {
                setFormProfile(data.data)
            })
            .catch(({ response }) => {
                response.status === 404 && history.push('/not-found')
            })

    const handleSubmitSchool = () => {
        // createOriginSchool
        let hasEmptyValue = []
        let fieldRequired = ['tingkat', 's']

        // Extract form
        fieldRequired.map(nameRequired => {
            Object.values((formSchool)).map((item, extractId) => {
                // Get field empty value
                Object.entries(item).map((value, idx) => {
                    if (nameRequired == value[0] && !value[1] ||
                        nameRequired == value[0] && value[1] === null) {
                        hasEmptyValue.push({ 'id': extractId + 1, 'name': value[0] })
                    }
                }
                )
            })
        })

        setErrors(hasEmptyValue)

    }



    const handleAlertClose = () => {
        setAlert({ message: '', open: false })
    }

    const tabs = ["Profile", "Sekolah Asal", "Orang Tua"]

    const contents = [
        <StudentProfile
            setAlert={setAlert}
            setForm={setFormProfile}
            form={formProfile}
            handleAlertClose={handleAlertClose}
        />,
        <OriginSchool
            // handleChange={handleChange}
            form={formSchool}
            setForm={setFormSchool}
            newState={initSchoolState}
            handleSubmit={handleSubmitSchool}
            errors={errors}
            setErrors={setErrors}
        />
    ]

    return (
        <div>
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
