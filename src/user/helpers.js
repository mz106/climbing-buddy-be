

const register = async (req, res, next) => {
    req.user.username
        ? 
        res.status(201).json({msg: "You have successfully registered", username: req.user.username}) 
        
        : 
        
        res.status(401).json({msg: "This user already exixts"});
};

module.exports = {
    register,
};