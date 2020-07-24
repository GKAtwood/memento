const bcrypt = require('bcryptjs');



module.exports= {
    create: async(req, res) => {
       
            const db = req.app.get('db');

     
            const { firstName, lastName, email, password} = req.body;

        // check if username is not already taken
            const foundUser = await db.check_user({email: email});
            if(foundUser[0]) return res.status(406).send('Try another email')

         // create password hash
            const hash = await bcrypt.hash(password, 10)



        const newUser = await db.create_user({firstName, lastName, email, password: hash});
        delete newUser[0].hash
                 // log user in by creating session
        req.session.user= {
            ...newUser[0]
        }


        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose)
        res.status(200).send(req.session.user);
        console.log('hit signup')

    },
    
    loginUser: async(req, res) => {
        
             const db = req.app.get('db');

         // get info from req.body
            const { email,  password} = req.body;

                
            const foundUser = await db.check_user({email: email});
                if(!foundUser[0]) return res.status(403).send('Email/Password incorrect')


        // compare hashes
            const verified = await bcrypt.compare(password, foundUser[0].password);
            console.log('I got here')
                if(!verified) return res.status(403).send('You shall not pass')

       
        delete foundUser[0].password;
        req.session.user= {
            ...foundUser[0]
        }

        // send session info in response so front end can decide how to use it (what to send and how to use the response depends on our app purpose).
        res.status(200).send(req.session.user);

        console.log('hit sign in')

    },

    getUsers: async (req, res) => {
        const db = req.app.get('db');
        
        const users = await db.get_users();
        
        res.status(200).send(users);
    },



                            
     

    logout: (req, res) => {
        //logout clears out the session of user data
        req.session.destroy();
        res.sendStatus(200);
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
    update:(req, res, next) => {
        const db = req.app.get('db')
        db.update_entry([req.params.eid,req.body.title,req.body.type,req.body.image,req.body.location,req.body.year])
        .then(res=> res.status(200).send())
        .catch(error=>{console.error(error);res.status(500).send(err)})
    },

    delete: (req, res, next) => {
        const db = req.app.get('db')
        console.log('entry delete eid',req.params.eid)
        db.delete_entry([req.params.eid])
        .then(res=> res.status(200).send(resp))
        .catch(error=>{console.error(error);res.status(500).send(err)})
        },
}