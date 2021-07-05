import { Menu, MenuItem } from '@material-ui/core';

import { dateFormat } from '../../utils/date'


const ListStudents = ({ handleClick, handleRowClick, handleClose, students, loading, cursor, handleDelete }) => {
    return (
        <>
            {loading ? "Loading..." :
                <div className="w-full md:w-full bg-black bg-opacity-10">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>

                                <tr>
                                    <th className="py-6 px-6 font-medium tracking-wider text-white text-left whitespace-nowrap">NIS</th>
                                    <th className="py-6 px-6 font-medium tracking-wider text-white text-left whitespace-nowrap">Nama</th>
                                    <th className="py-6 px-6 font-medium tracking-wider text-white text-left whitespace-nowrap">Tanggal Lahir</th>
                                    <th className="py-6 px-6 font-medium tracking-wider text-white text-left whitespace-nowrap">Tempat Lahir</th>
                                    <th className="py-6 px-6 font-medium tracking-wider text-white text-left whitespace-nowrap">Jenis Kelamin</th>
                                </tr>
                            </thead>
                            <tbody >
                                {!!students.length && students.map((student, idx) => (
                                    <tr className="w-full cursor-pointer bg-black bg-opacity-10 hover:bg-opacity-30 transition duration-400" key={idx}
                                        onClick={() => handleRowClick(student.id)}
                                        onContextMenu={(e) => {
                                            handleClick(e, student);
                                        }} >
                                        <td className="px-6 py-4 text-white whitespace-nowrap">{student.nis}</td>
                                        <td className="px-6 py-4 text-white whitespace-nowrap">{student.nama}</td>
                                        <td className="px-6 py-4 text-white whitespace-nowrap">{dateFormat(student.tgl_lahir)}</td>
                                        <td className="px-6 py-4 text-white whitespace-nowrap">{student.tempat_lahir}</td>
                                        <td className="px-6 py-4 text-white whitespace-nowrap">{student.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!students.length &&
                            <div className="text-center py-6 text-gray-400">Tidak Ada Data Siswa.</div>
                        }
                        <Menu
                            keepMounted
                            open={cursor.mouseY !== null}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={
                                cursor.mouseY !== null && cursor.mouseX !== null
                                    ? { top: cursor.mouseY, left: cursor.mouseX }
                                    : undefined
                            }
                        >
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </div>
                </div>
            }


        </>
    )
}

export default ListStudents
