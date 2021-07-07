const apiAdapter = require('./apiAdapter')

const api = apiAdapter()

export const createStudent = async (student) =>
  await api.post("/students", student);

export const getStudent = async (studentId) =>
  await api.get(`/students/${studentId}`);

export const getAllStudents = async (studentName, studentNumber) =>
  await api.get("/students", {
    params: {
      nama: studentName,
      nis: studentNumber
    }
  });

export const getTotalStudents = async () =>
  await api.get(`/students/count`);

export const deleteStudent = async (studentId) =>
  await api.delete(`/students/${studentId}`);

export const updateStudent = async (studentId, student, config) =>
  await api.put(`/students/${studentId}`, student, config)