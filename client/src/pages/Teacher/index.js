import { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { getAllStudents, getTotalStudents, createStudent, deleteStudent, updateStudent } from '../../api/studentsApi'
import ListTeachers from './ListTeachers'
import Card from '../../components/Surfaces/Card'
import FormTeacher from './FormTeacher'
import DialogConfirmation from '../../components/Feedback/Dialog/Confirmation'

const useStyles = makeStyles((theme) => ({
    search: {
        color: "white",
        borderColor: 'white'
    },
}));

const initialFormState = {
    nis: "",
    nama: "",
    tempat_lahir: "",
    tgl_lahir: new Date(),
    jenis_kelamin: "",
    telepon: "",
    alamat: "",
    foto: ""
}

const initialCursor = {
    mouseX: null,
    mouseY: null,
};

const Teacher = () => {
    const classes = useStyles();

    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [openDialogForm, setOpenDialogForm] = useState(false);
    const [form, setForm] = useState(initialFormState)
    const [alertMessage, setAlertMessage] = useState("")


    const [loading, setLoading] = useState(false);

    // List Students
    const [students, setStudents] = useState([]);
    const [studentData, setStudentData] = useState({})
    const [cursor, setCursor] = useState(initialCursor);
    const [alertUI, setAlertUI] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });

    useEffect(() => {
        setLoading(true);
        loadStudents();
        loadTotalStudents();
    }, [])

    const loadStudents = () => getAllStudents("", "").then(({ data }) => {
        if (data.success) {
            setStudents(data.data)
            setLoading(false)
        }
    })

    const handleClick = (event, student) => {
        event.preventDefault();
        setStudentData(student)
        setCursor({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setCursor(initialCursor);
        setAlertUI({ ...alertUI, open: false })
    };

    const handleDeleteDialog = () => {
        setOpenDialogDelete(true)
        handleClose()
    }

    // Form Student
    const hasStudentData = Object.keys(studentData).length;

    const handleClickDialogFormOpen = () => {
        setForm(studentData)
        handleClose()
        setOpenDialogForm(true);
    };

    const handleCloseDialogForm = () => {
        setStudentData({})
        setOpenDialogForm(false);
    };

    const handleChange = ({ target }) => {
        const { name, value } = target
        setForm({ ...form, [name]: value })
    }

    const handleDateChange = (date) => {
        setForm({ ...form, tgl_lahir: date });
    };

    const handleSubmit = () => {
        if (!hasStudentData) {
            return createStudent(form).then(({ data }) => {
                if (data.success) {
                    loadTotalStudents()
                    loadStudents()
                    setOpenDialogForm(false)
                    handleClose()
                    setAlertUI({ ...alertUI, open: true })
                }
            })
        } else {
            return updateStudent(studentData.id, form).then(({ data }) => {
                if (data.success) {
                    loadStudents()
                    setOpenDialogForm(false)
                    handleClose()
                    setAlertUI({ ...alertUI, open: true })
                    setAlertMessage(`Siswa dengan nama ${studentData.nama} berhasil diubah`)
                }
            })
        }
    }

    // Count
    const [count, setCount] = useState(0)
    const loadTotalStudents = () => getTotalStudents().then(({ data }) => {
        if (data.success) {
            setCount(data.data)
            setLoading(false)
        }
    })

    // Delete Student
    const handleDelete = () => deleteStudent(studentData.id).then(({ data }) => {
        if (data.success) {
            loadStudents()
            loadTotalStudents()
            setOpenDialogDelete(false)
            handleClose()
            setAlertUI({ ...alertUI, open: true })
            setAlertMessage(`Siswa dengan nama ${studentData.nama} berhasil dihapus`)
        }
    })

    const handleSearch = (e) => getAllStudents(e.target.value, e.target.value).then(({ data }) => {
        if (data.success) {
            setStudents(data.data)
        }
    })

    const handleCloseDialogDelete = () => {
        handleClose();
        setOpenDialogDelete(false)
    }

    return (
        <div className="w-full mt-24 px-6 flex flex-col space-y-6">
            <Card label="Jumlah Guru" total={count} />
            <div className="flex justify-between text-white">
                <TextField
                    style={{ color: 'white' }}
                    id="search"
                    onChange={handleSearch}
                    placeholder="Cari NIDN / Nama Guru"
                    InputProps={{
                        className: classes.search,
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <button
                    className="bg-black rounded-md bg-opacity-40 hover:bg-opacity-60 transition duration-400 py-2 px-12 text-sm"
                    onClick={handleClickDialogFormOpen}>
                    Tambah Guru
          </button>
            </div>
            <ListTeachers
                handleClick={handleClick}
                handleClose={handleClose}
                handleDelete={handleDeleteDialog}
                handleClickOpen={handleClickDialogFormOpen}
                students={students}
                loading={loading}
                cursor={cursor}
                alertUI={alertUI}
                alertMessage={alertMessage}
            />
            <FormTeacher
                handleDateChange={handleDateChange}
                handleChange={handleChange}
                handleClose={handleCloseDialogForm}
                handleClickOpen={handleClickDialogFormOpen}
                handleSubmit={handleSubmit}
                open={openDialogForm}
                form={form}
                hasStudentData={hasStudentData}
            />
            <DialogConfirmation open={openDialogDelete} name={studentData.nama} handleDelete={handleDelete} handleClose={handleCloseDialogDelete} />
        </div>
    )
};

export default Teacher;
