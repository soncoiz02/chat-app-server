import jwtDecode from "jwt-decode";

const verifyExpiredToken = (token) => {
    const expToken = jwtDecode(token).exp
    const expDate = new Date(expToken * 1000)
    const currentDate = new Date()
    return currentDate.getTime() > expDate.getTime()
}

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        if (verifyExpiredToken(bearerToken)) {
            return res.status(403).json({
                message: 'Token expired',
            });
        }
        req.token = bearerToken;
        next();
    } else {
        res.status(403).json({
            message: 'Unauthorization',
        });
    }
};
