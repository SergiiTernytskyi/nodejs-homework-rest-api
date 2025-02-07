const { Unauthorized } = require("http-errors");
const { tokenCreate } = require("../../helpers");

const {
    users: { getUserByEmail, updateUsersToken },
} = require("../../service");

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user || !user.validPassword(password)) {
        throw new Unauthorized("Email or password is wrong");
    }

    if (!user.verify) {
        throw new Unauthorized("Email is not confirmed");
    }

    const token = tokenCreate(user);

    await updateUsersToken(user._id, token);

    res.status(200).json({
        status: 200,
        message: "success",
        data: {
            user: {
                email,
                subscription: user.subscription,
                token,
            },
        },
    });
};

module.exports = login;
