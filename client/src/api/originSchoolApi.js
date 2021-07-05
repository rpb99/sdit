const apiAdapter = require('./apiAdapter')

const api = apiAdapter()

export const getOriginSchool = async (studentId) =>
    await api.get("/sekolah-asal", {
        params: {
            id_siswa: studentId
        }
    });