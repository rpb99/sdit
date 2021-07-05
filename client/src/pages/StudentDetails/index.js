import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Snackbar from '../../components/Feedback/Snackbar'
import Tabs from '../../components/Navigation/Tabs';

import { getOriginSchool } from '../../api/originSchoolApi'
import { getStudent, updateStudent } from '../../api/studentsApi'

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

const StudentDetails = () => {
    const history = useHistory()
    const { id } = useParams();

    const [formProfile, setFormProfile] = useState(initialFormProfileState)
    const [formSchool, setFormSchool] = useState({})

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

    const handleSubmit = (e) => {
        e.preventDefault()
        updateStudent(formProfile.id, formProfile)
            .then(({ data }) => {
                handleAlertClose()
                setAlert({ message: 'Data profile berhasil di ubah', open: true })
            })
            .catch(({ response }) => console.log(response))
    }

    const handleAlertClose = () => {
        setAlert({ message: '', open: false })
    }

    const tabs = ["Profile", "Sekolah Asal", "Orang Tua"]

    const contents = [
        <StudentProfile
            setForm={setFormProfile}
            form={formProfile}
            handleSubmit={handleSubmit}
        />,
        // <OriginSchool
        //     handleChange={handleChange}
        //     form={form}
        //     handleDateChange={handleDateChange}
        //     handleSubmit={handleSubmit}
        // />
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
