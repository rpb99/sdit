const apiAdapter = require('./apiAdapter')

const api = apiAdapter()

export const createStudent = async (student) =>
  await api.post("/students", student);

export const getStudent = async (studentId) =>
  await api.get(`/students/${studentId}`);

export const getAllStudents = async (namaQ, jenis_kelaminQ) =>
  await api.get(`/students?nama=${namaQ}&nis=${jenis_kelaminQ}`);

export const getTotalStudents = async () =>
  await api.get(`/students/count`);

export const deleteStudent = async (studentId) =>
  await api.delete(`/students/${studentId}`);

export const updateStudent = async (studentId, student) =>
  await api.put(`/students/${studentId}`, student);