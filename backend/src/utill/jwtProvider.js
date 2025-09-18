const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

class JwtProvider {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }

    createJwt(payload) {
        return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
    }

    getEmailFromJwt(token) {
        try {
            const decodedToken = jwt.verify(token, this.secretKey);
            return decodedToken.email;
        } catch (err) {
            throw new Error("Invalid token");
        }
    }

    verifyJwt(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (err) {
            throw new Error("Invalid token");
        }
    }
}

module.exports = new JwtProvider(secretKey);
