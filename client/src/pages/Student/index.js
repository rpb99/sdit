import { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import { useHistory } from 'react-router-dom'
import { getAllStudents, getTotalStudents, createStudent, deleteStudent, updateStudent } from '../../api/studentsApi'
import ListStudents from './ListStudents'
import Card from '../../components/Surfaces/Card'
import FormStudent from './FormStudent'
import DialogConfirmation from '../../components/Feedback/Dialog/Confirmation'
import Snackbar from '../../components/Feedback/Snackbar'


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

const Student = () => {
  const history = useHistory()
  const classes = useStyles();

  const [openDialogDelete, setOpenDialogDelete] = useState(false)
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [form, setForm] = useState(initialFormState)

  const [isAlert, setIsAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")


  const [loading, setLoading] = useState(false);

  // List Students
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({})
  const [cursor, setCursor] = useState(initialCursor);

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
    setIsAlert(false)
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
    createStudent(form).then(({ data }) => {
      loadTotalStudents()
      loadStudents()
      setOpenDialogForm(false)
      handleClose()
      setIsAlert(true)
      setAlertMessage("Data berhasil ditambah")
    })
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
      setIsAlert(true)
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

  const handleRowClick = (studentId) => {
    history.push(`/students/${studentId}`)
  }

  return (
    <div className="flex flex-col space-y-6">
      <Card label="Jumlah Siswa" total={count} />
      <div className="flex justify-between text-white">
        <TextField
          style={{ color: 'white' }}
          id="search"
          onChange={handleSearch}
          placeholder="Cari NIS / Nama Siswa"
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
          Tambah Siswa
          </button>
      </div>
      <ListStudents
        handleClick={handleClick}
        handleClose={handleClose}
        handleDelete={handleDeleteDialog}
        handleRowClick={handleRowClick}
        students={students}
        loading={loading}
        cursor={cursor}
      />
      <FormStudent
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
      <Snackbar message={alertMessage} open={isAlert} handleClose={handleClose} />
    </div>
  )
};

export default Student;
