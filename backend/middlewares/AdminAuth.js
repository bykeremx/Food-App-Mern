const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // Admin erişimine izin ver
    } else {
        return res.status(403).json({ message: "Yalnızca yöneticiler erişebilir" });
    }
};

export default adminAuth;
