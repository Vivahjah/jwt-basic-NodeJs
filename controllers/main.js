const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError("Please provide email and password", 400);
    }
    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(201).json({ msg: "user created", token });
};

const dashboard = async(req, res) => {

    console.log(req.user)

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Welcome ${req.user.username}`,
        secret: `Your secret code is ${luckyNumber}`,
    });
};

module.exports = { login, dashboard };