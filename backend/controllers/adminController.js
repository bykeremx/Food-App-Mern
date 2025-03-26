import expressAsyncHandler from "express-async-handler";

export const adminIndex = () => expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Admin Panel!',
        admin: req.user,
    });
});