const bcrypt = require('bcryptjs');


module.exports= {
    createUser: async(req, res) => {
        const {firstName, lastName, city, country, email, password, pic} = req.body,
        db = req.app.get('db')

        const foundUser = await db.check_user({email});
        if(foundUser[0]){
            return res.status(400).send('Email already in use')
        }
        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);

        // have to wrap the "await", or else the parser will think you want to await
        // element [0] of db.users.register_user({...})
        const newUser = (await db.create_user({firstName, lastName, city, country, password: hash, pic}))[0];
        req.session.user = newUser;
        res.status(200).send(newUser);
    },
    loginUser: async(req, res) => {
        //What does this function need to run properly?
        const {email, password} = req.body,
            db = req.app.get('db');

        //Checks if user is already in the database, based on email
        const foundUser = await db.users.check_user({email});
        if(!foundUser[0]){
            return res.status(400).send('Email not found');
        }

        //Compare the passwords to make they match
        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        //Set user on session
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },

    createPost: (req, res) => {
        const {
            title = "untitled", 
            type = "",
            image,
            journal = "", 
            location ="",
            year = "" 
             } = req.body;

        const db = req.app.get('db');
        const eid = req.session.user.id;
        
        // massive's built-in insert method will return the post with its ID
        db.create_entry({
            title,
            type,
            image,
            journal,
            location,
            year,
            eid
        }).then(newEntry => res.status(200).send(newEntry))
            .catch(err => {
                res.sendStatus(500)
                console.error(err.message);
        });
    },
}