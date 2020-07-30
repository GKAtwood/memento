const bcrypt = require('bcryptjs');
require('dotenv').config();



module.exports= {
    create: async(req, res) => {
       
            const db = req.app.get('db');

     
            const { firstName, lastName, email, password} = req.body;

      
            const foundUser = await db.check_user({email: email});
            if(foundUser[0]) return res.status(406).send('Try another email')

          const hash = await bcrypt.hash(password, 10)



        const newUser = await db.create_user({firstName, lastName, email, password: hash});
        delete newUser[0].hash
              
        req.session.user= {
            ...newUser[0]
        }
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
                            
     
    logout: (req, res, next) => {
        if (req.session.user)
        {
            console.log('before destroying', req.session)
            req.session.destroy();
            console.log('after destroying', req.session)
            res.status(200).send()  
        }     
    },

    createEntry:(req, res,next) => {
        console.log('req.body', req.body)
        const db = req.app.get('db')
        
        db.create_entry({type:req.body.type, title:req.body.title, image:req.body.image, journal:req.body.journal, location:req.body.location, year:req.body.year, uid:req.body.uid})
        .then(entry=> {
            console.log("got to this point")
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

    

        editUser: (req, res, next) => {
            const db = req.app.get('db')
           
            console.log(req.body)
             bcrypt.hash(req.body.password, 10).then(password => {
                db.edit_user({uid: req.params.uid, firstName: req.body.firstName,lastName: req.body.lastName, email:req.body.email, password: password})
                .then(user=> {
                    console.log('got here!')
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
