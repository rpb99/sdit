const apiAdapter = require('./apiAdapter')

const api = apiAdapter()

export const getOriginSchool = async (studentId) =>
    await api.get("/sekolah-asal", {
        params: {
            id_siswa: studentId
        }
    });

export const createOriginSchool = async (school) =>
    await api.get("/sekolah-asal", school);

export const updateOriginSchool = async (schoolId, school) =>
    await api.put(`/sekolah-asal/${schoolId}`, school)

