const { Student } = require('../../models')

module.exports = async (req, res) => {
    const { count } = await Student.findAndCountAll()
    return res.json({ success: true, data: count })
}