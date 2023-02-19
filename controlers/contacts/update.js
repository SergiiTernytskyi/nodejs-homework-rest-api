const createError = require("http-errors");

const { updateContactById } = require("../../service");

const update = async (req, res) => {
    const { contactId } = req.params;

    const result = await updateContactById(contactId, req.body);

    if (!result) {
        throw createError(404, "Not found");
    }

    res.status(200).json({
        message: "contact updated",
        data: { contact: result },
    });
};

module.exports = update;
