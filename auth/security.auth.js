const jwt = require('jsonwebtoken');


authenticationToken = ({id}) => {
    const token = jwt.sign(id, "werewalskdjfa;ldjrwoaiejjhrnvlaew;jro");
    console.log(id)
    return token;
}


authorizationToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    if (cookie) {
        const token = cookie.split('=')[1];
        const id = jwt.verify(token, "werewalskdjfa;ldjrwoaiejjhrnvlaew;jro")
        
        console.log(id)
        req.user_id = id;
        next()
    }else{

        res.send('You are not logged in yet.')
    }
}


module.exports = {
    authorizationToken,
    authenticationToken
}