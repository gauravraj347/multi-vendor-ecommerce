const getUserProfileByJwt = async (req, res) => {
    try {
        const user = await req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(error instanceof Error ? 404 : 500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUserProfileByJwt
};