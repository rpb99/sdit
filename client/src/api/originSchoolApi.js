const apiAdapter = require('./apiAdapter')

const api = apiAdapter()

export const getOriginSchool = async (studentId) =>
    await api.get(`/sekolah-asal/${studentId}`);

export const createOriginSchool = async (studentId, school) =>
    await api.post("/sekolah-asal", school, {
        params: {
            id_siswa: studentId
        }
    });

export const updateOriginSchool = async (schoolId, school) =>
    await api.put(`/sekolah-asal/${schoolId}`, school)

export const deleteOriginSchool = async (schoolId) =>
    await api.delete(`/sekolah-asal/${schoolId}`)

