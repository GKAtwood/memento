const bcrypt = require('bcryptjs');
const saltRounds=12;
const axios = require('axios');
require('dotenv').config();



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

    getUser: async (req, res) => {
        const user = await req.app.get('db').get_user([req.session.user]);
        return res.status(200).send(user);
      },

     


    sessionCheck: (req, res, next) => {
        req.session.user ? res.status(200).send(req.session.user) : res.status(500).send()
    },
                            
     

    logout: (req, res) => {
        //logout clears out the session of user data
        req.session.destroy();
        res.sendStatus(200);
    },

    createEntry:(req, res,next) => {
        console.log('req.body', req.body)
        const db = req.app.get('db')
        db.create_entry([req.body.title, req.body.type,req.body.image,req.body.journal, req.body.location,req.body.year,req.body.uid]).then(entry=> {
            res.status(200).send(entry)
            console.log('entry', entry)
        }).catch(error=>{console.error(error);res.status(500).send(error)})
        },
    update:(req, res, next) => {
        const db = req.app.get('db')
        db.update_entry([req.params.eid,req.body.title,req.body.type,req.body.image,req.body.location,req.body.year])
        .then(res=> res.status(200).send())
        .catch(error=>{console.error(error);res.status(500).send(err)})
    },

    getAll:(req, res, next) => {
        console.log('getAll uid',req.query.uid)
        const db = req.app.get('db') 
        db.get_entries([req.query.uid]).then(entry=> res.status(200).send(entry)).catch(error=>{console.error(error);res.status(500).send(err)})
        },

    delete: (req, res, next) => {
        const db = req.app.get('db')
        console.log('entry delete eid',req.params.eid)
        db.delete_entry([req.params.eid])
        .then(res=> res.status(200).send(resp))
        .catch(error=>{console.error(error);res.status(500).send(err)})
        },

        latlong: (req, res, next) => {
            console.log('google latlong', req.body.latitude,req.body.longitude)
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.REACT_APP_GOOGLE_KEY}&latlng=${req.body.latitude},${req.body.longitude}&language=en`).then(resp=>{
                var x = resp.data.results.find(elem=>elem.address_components)
                console.log('resp.data.results ', x)
                res.status(200).send(x)
            }).catch(err=>{
                console.log('google error', err);res.status(500).send(err)
            })
        },

        editUser: (req, res, next) => {
            const db = req.app.get('db')
            console.log(req.body)
             bcrypt.hash(req.body.password, 10).then(password => {
                db.edit_user([req.params.id,req.body.firstName,req.body.lastName,req.body.email,password])
                .then(user=> {
                    console.log(password)
                    req.session.user={
                        uid: user[0].uid,
                        firstName: user[0].firstName, 
                        lastName: user[0].lastName, 
                        email: user[0].email, 
                        password: user[0].password
                        
                    }
                    console.log('req.session', req.session.user)
                    res.status(200).json({user: req.session.user});             
                }).catch(err=>{console.error(err);res.status(500).send(err)})
            })
        },

   
        
}
