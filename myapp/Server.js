const express = require('express')
const fileUpload = require('express-fileupload')
const http = require('http')
const cors = require('cors')
const bodyParser = require('body-parser')
var mysql = require('mysql')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var nodemailer = require("nodemailer");
const app = express()
app.use(cors())
const hostname = 'localhost'
const port = 3001

const accessTokenSecret = 'youraccesstokensecret';

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pk',


})
connection.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});



app.use(bodyParser.urlencoded({ extended: false }))

app.use(fileUpload());

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port:  993,
  auth: {
      user: 'vivek.tacatlanta@gmail.com',
      pass: 'Test123$%^'
  },
  tls: {rejectUnauthorized: false},
  debug:true
});


// parse application/json
app.use(bodyParser.json())

app.post('/res', function (req, res) {
  /* const firstname = req.body.firstname
  const lastname = req.body.lastname
  const phone = req.body.phone
  const email = req.body.email
  const password = req.body.password */

const data={
		firstname : req.body.firstname,
		lastname : req.body.lastname,
		phone : req.body.phone,
    to : req.body.email,
    password : req.body.password
	}

  const mailOptions  = {
    from: 'vivek.tacatlanta@gmail.com',
    to: req.body.email,
    text: JSON.stringify(data),
    subject: 'hello',
  }
  console.log("hello mail",mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
  res.end("error");
 }else{
        console.log("Message sent: " + response);

        connection.query("INSERT INTO users (firstname,lastname,phone,email,password) VALUES (?,?,?,?,?)", [data], (error, results) => {
          if (error) {
            res.json({
              status: false,
              message: 'there are some error with query',
              error: error
            })
          } else {
            res.json({
              status: true,
              data: results,
              message: 'Succesfully send'
            })
          }
        })
     }

    })
  })
 /*  console.log(firstname)
  console.log(lastname)
  console.log(email)
  console.log(password) */
 /*########################################Forget Password##################################################### */
 app.post('/Forget', function (req, res) {
 const email =req.body.email
  token = jwt.sign({ email }, 'secret key')

  const mailOptions  = {
    from: 'vivek.tacatlanta@gmail.com',
    to: req.body.email,
    subject: 'Reset Password',
    html:'<h4><b>Reset Password</b></h4>' +
    '<p>To reset your password, complete this form:</p>' +
    '<a href=' + 'http://localhost:3000/' + 'newpassword/' + token + '">'  + 'reset/' + token + '</a>' +
    '<br><br>' +
    '<p>--Team</p>'
  }
  console.log("hello mail",mailOptions);

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
  res.end("error");
 }else{
        console.log("Message sent: " + response);
        return res.json({success: true, message: 'Check your mail to reset your password.'})
     /*    connection.query("INSERT INTO users (firstname,lastname,phone,email,password) VALUES (?,?,?,?,?)", [data], (error, results) => {
          if (error) {
            res.json({
              status: false,
              message: 'there are some error with query',
              error: error
            })
          } else {
            res.json({
              status: true,
              data: results,
              message: 'Succesfully send'
            })
          }
        }) */
     }

    })
  })
  /*########################################### New Password ################################################ */
 
/* app.post('/newpassword', function (req, res) {
  const password = req.body.password
  const token = req.body.token
  connection.query("select * from where email=? ", [password], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'user registered sucessfully'
      })
    }
  })
})
 */
 /*########################################Login User##################################################### */
app.post('/login', function (req, res) {
  console.log(res.body)
  const email = req.body.email;
  const password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ? AND password= ?;', [email, password], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      if (results.length > 0) {
        res.json({
          status: true,
          message: 'user Login sucessfully',
          data: results,

        })
      }
      else {
        res.json({
          status: false,
          message: "Email and password does not match",
          error: error,
          data: results,

        });

      }
    }/* else{
     /*  if(results.length >0){
          if(password==results[0].password){
              res.json({
                  status:true,
                  data:results,
                  message:'successfully authenticated'
              })
          }else{
              res.json({
                status:false,
                error:error,
                data:results,
                message:"Email and password does not match"
               });
          }
       
      }
      else{
        res.json({
            status:false,    
          message:"Email does not exits"
        });
      }
    } */
  });
})


app.post('/apicall', function (req, res) {
  const ServiceName = req.body.ServiceName
  const Price = req.body.Price
  const Discounts = req.body.Discounts
  const TotalAmount = req.body.TotalAmount

  console.log(ServiceName)
  console.log(Price)
  console.log(Discounts)
  console.log(TotalAmount)

  connection.query("INSERT INTO Amount (servicename,price,discounts,totalamount) VALUES (?,?,?,?)", [ServiceName, Price, Discounts, TotalAmount], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'user registered sucessfully'
      })
    }
  })
})


app.post('/monthly', function (req, res) {
  const ServiceName = req.body.ServiceName
  const Price = req.body.Price
  const Discounts = req.body.Discounts
  const TotalAmount = req.body.TotalAmount
  const startdate = req.body.Startdate
  const enddate = req.body.Enddate
  const userid = req.body.userid

  console.log(ServiceName)
  console.log(Price)
  console.log(Discounts)
  console.log(TotalAmount)

  connection.query("INSERT INTO monthly (servicename,price,discounts,totalamount,startdate,enddate, userid) VALUES (?,?,?,?,?,?, ?)", [ServiceName, Price, Discounts, TotalAmount, startdate, enddate, userid], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'user registered sucessfully'
      })
    }
  })
})


app.post('/yearly', function (req, res) {
  const ServiceName = req.body.ServiceName
  const Price = req.body.Price
  const Discounts = req.body.Discounts
  const TotalAmount = req.body.TotalAmount
  const userid = req.body.userid
  const startdate = req.body.Startdate
  const enddate = req.body.Enddate

  console.log(ServiceName)
  console.log(Price)
  console.log(Discounts)
  console.log(TotalAmount)

  connection.query("INSERT INTO yearly (servicename,price,discounts,totalamount,userid,startdate,enddate) VALUES (?,?,?,?,?,?,?)", [ServiceName, Price, Discounts, TotalAmount, userid, startdate, enddate], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'user registered sucessfully'
      })
    }
  })

})

app.get('/amount', (request, response) => {


  connection.query('SELECT * FROM amount ;', (error, result) => {
    if (error) throw error;

    response.json({
      status: true,
      data: result,
      message: 'user get free user'
    })
  });
});

app.get('/month/:localid', (request, response) => {
    /* localid= localStorage.getItem('id') */
   /* console.log(localid) */
  const id = request.params.localid

  connection.query('SELECT * FROM monthly where userid=? ;', [id], (error, result) => {
    if (error) throw error;

    response.json({
      status: true,
      data: result,
      message: 'user get months user'
    })
  });
});

app.get('/year/:localid', (request, response) => {
  const id = request.params.localid
  connection.query('SELECT * FROM yearly where userid=? ;', [id], (error, result) => {
    if (error) throw error;

    response.json({
      status: true,
      data: result,
      message: 'user get Year user'
    })
  });
});





app.post('/budget', function (req, res) {
  const project = req.body.project
  const message = req.body.message
  const budget = req.body.budget
  const deadline = req.body.deadline
  const uploadfile = req.body.file


  console.log(project)
  console.log(message)
  console.log(deadline)
  console.log(budget)
  

  connection.query("INSERT INTO budget (project,message,budget,deadline,uploadfile) VALUES (?,?,?,?,?)", [project, message, budget, deadline, uploadfile], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })




})


/* app.post('/sing', function(req, res)  {
  const fullname=req.body.fullname
  const email=req.body.email
  const phone=req.body.phone
  const message=req.body.message
  const range=req.body.range
  const from=req.body.from
  const to=req.body.to
  const file=req.body.file
 
 
 
  console.log(req.body)
 
 
 
  connection.query("INSERT INTO table3 (fullname,email,phone,message,rang,froms,tos,files) VALUES (?,?,?,?,?,?,?,?)",[fullname,email,phone,message,range,from,to,file],(err,result) =>{
   console.log(err);
 })
 
 
 }) */

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Result: " + result);
//   });
// });
/*######################################## Vandor admin ##########################################*/
/*######################################## Vandor admin ##########################################*/
/*######################################## Vandor admin ##########################################*//*######################################## Vandor admin ##########################################*/

/*###########################################Registration######################################## */
app.post('/register', function (req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, 8)
  let hashedConfirmpass = bcrypt.hashSync(req.body.confirmpassword, 8)
  console.log(hashedPassword)


  const vandor = req.body.name
  const email = req.body.email
  const contact = req.body.phone
  const dob = req.body.dob
  const gender = req.body.gender
  const security = req.body.securityQuestions
  const password = hashedPassword
  const confirmpass = hashedConfirmpass


  connection.query("INSERT INTO vandorlogin (Vandor,email,contact,dob,gender,security,password,confirmpass) VALUES (?,?,?,?,?,?,?,?)", [vandor, email, contact, dob, gender, security, password, confirmpass], (error, results) => {
    token = jwt.sign({ email }, 'secret key')
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        token: token,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })

  /*  function (err, user) {
     if (err) return res.status(500).send("There was a problem registering the user.")
     // create a token
     var token = jwt.sign({ id: user._id }, config.secret, {
       expiresIn: 86400 // expires in 24 hours
     });
     res.status(200).send({ auth: true, token: token });
   }); */
});

/*########################################### login ######################################## */
app.post('/vandorlog', function (req, res) {

  const email = req.body.email
  const password =req.body.password
  connection.query('SELECT * FROM vandorlogin WHERE email = ? ;', [email], function (error, results, fields) {
    token = jwt.sign({ email }, 'secret key')
  
    bcrypt.compare(password, results[0].password)
      .then((bool) => {
        if (bool == false) {
          res.json({
            status: false,
            message: 'password does not match',
            error: error
          })
        } else {
          res.json({
            status: true,
            token: token,
            message: 'user Login sucessfully',
            data: results,

  
          })
        }

      })
    /* if (error) {
     
    } else {
      if (results.length > 0) {
        
      }
      else {
        res.json({
          status: false,
          message: "password does not match",
          error: error,
          data: results,
        });
      }
    } */
  });
})
/*#######################################Get Project Name######################################### */
app.get('/bud', (request, response) => {
  
  connection.query('SELECT id,project FROM budget ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'user get free user'
    })
  }
  });
});

/*########################################UserAssign############################################## */


app.post('/userassign', function (req, res) {
  const project = req.body.project
  const name = req.body.name
  const single = req.body.checked
  const team = req.body.teamchecked
  const vandoruser=req.body.vandoruser



  console.log(project)
  console.log(name)
  console.log(single)
  console.log(team)
  console.log(vandoruser)
  

  connection.query("INSERT INTO userassign (project_name,user_name,single,team,vandoruser) VALUES (?,?,?,?,?)", [project, name, single, team,vandoruser], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
})
/*########################################## Request ############################################# */
app.post('/request', function (req, res) {
  const questions = req.body.questions
  const about = req.body.about
  const problems = req.body.problems
  const uploadfile = req.body.uploadfile

  console.log(questions)
  console.log(about)
  console.log(problems)
  console.log(uploadfile)
  
  connection.query("INSERT INTO request (questions,about,problems,uploadfile) VALUES (?,?,?,?)", [questions, about, problems, uploadfile], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
})

/*########################################upload file############################################# */
app.post('/workupload', function (req, res) {
  const ProjectName = req.body.ProjectName
  const ProjectDescription = req.body.ProjectDescription
  const uploadfile = req.body.uploadfile
  

  console.log(ProjectName)
  console.log(ProjectDescription)
 
  console.log(uploadfile)
  
  connection.query("INSERT INTO workupload (ProjectName,ProjectDescription,uploadfile) VALUES (?,?,?)", [ProjectName, ProjectDescription,uploadfile], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
})
/*########################################Daily Report############################################ */
app.post('/daily', function (req, res) {
  const project = req.body.project
  const team = req.body.team
  const fileupload = req.body.fileupload
  const timing = req.body.timing
  const timingwork = req.body.timingwork
  const daywork = req.body.daywork
  const hourwork = req.body.hourwork
  

  
  
  connection.query("INSERT INTO daily (project,team,fileupload,timing,timingwork,daywork,hourwork) VALUES (?,?,?,?,?,?,?)", [project, team,fileupload,timing,timingwork,daywork,hourwork], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
})


/*####################################cOMPLAIN BOX################################################ */
app.post('/Complain', function (req, res) {
  const project = req.body.project
  const description = req.body.description
  console.log(project)
  console.log(description)
  connection.query("INSERT INTO complain (project,description) VALUES (?,?)", [project,description], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
})

/*##########################################SOP################################################### */
 app.post('/SOP', function (req, res) {
  const project = req.body.projectname
  const description = req.body.description
  const field = req.body.field


  connection.query("INSERT INTO sop (project,description,field) VALUES (?,?,?)", [project,description,field], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
}) 
/*######################################## Hourly ################################################ */
app.post('/payhour', function (req, res) {
  const project = req.body.project
  const team = req.body.team
  const timingwork = req.body.timingwork
  const hourwork = req.body.hourwork


  connection.query("INSERT INTO payhour (project,team,timingwork,hourwork) VALUES (?,?,?,?)", [project,team,timingwork,hourwork], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
}) 
/*######################################## cash ################################################ */
app.post('/paycash', function (req, res) {
  const project = req.body.project
  const team = req.body.team
  const hourwork = req.body.hourwork
  const timingwork = req.body.timingwork
  


  connection.query("INSERT INTO paycash (project,team,hourwork,timingwork) VALUES (?,?,?,?)", [project,team,hourwork,timingwork], (error, results) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Your Query are Submited'
      })
    }
  })
}) 

/*#####################################Get Project details######################################## */
app.get('/projectdetail', (request, response) => {
  connection.query('SELECT project,message,budget,deadline FROM budget ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'user get free user'
    })
  }
  });
});
/*####################################Get Project details######################################## */
app.get('/vandorreq', (request, response) => {
  connection.query('SELECT id,project,description,field FROM sop  ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'user get free user'
    })
  }
  });
});

/*########################################Main Login############################################## */
app.post('/mainlogin', function (req, res) {
  console.log(res.body)
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  connection.query('SELECT * FROM mainlogin WHERE email = ? AND password= ?;', [email, password], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      if (results.length > 0) {
        res.json({
          status: true,
          message: 'user Login sucessfully',
          data: results,

        })
      }
      else {
        res.json({
          status: false,
          message: "Email and password does not match",
          error: error,
          data: results,

        });

      }
    }
  });
})

/*###################################### GetUseradmin ############################################ */

app.get('/getuser', (request, response) => {
  connection.query('SELECT id ,firstname,lastname,phone,email FROM users  ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get User Details'
    })
  }
  });
});

/*#####################################getvandoradmin############################################# */

app.get('/getvandor', (request, response) => {
  connection.query('SELECT id,Vandor,email,contact,dob FROM vandorlogin  ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*###################################Edit Usert Data############################################# */

app.put('/edituser/:id', (req, res) => {
  const userid = req.params.id
  const firstname=req.body.firstname
  const lastname=req.body.lastname
  const phone=req.body.phone
  const email=req.body.email
  const id=userid
  console.log(firstname)
  console.log(lastname)
  console.log(phone)
  console.log(email)
  connection.query('update users SET firstname=?, lastname=?, phone=?, email=? where id =?;',[firstname,lastname,phone,email,id],(error, result) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    res.json({
      status: true,
      data: result,
      message: 'User Have Updated'
    })
  }
  });
});




/*###################################### GetUserDelete ########################################### */

app.delete('/getuserdelet/:id', (req, response) => {
 const  userid=req.params.id
 const id =userid
  connection.query('DELETE FROM  users where id=?  ;',[id],(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'User Have been Deleted'
    })
  }
  });
});

/*###################################Edit vandor Data############################################# */

app.put('/editvandor/:id', (req, res) => {
  const userid = req.params.id
  const Vandor=req.body.Vandor
  const email=req.body.email
  const contact=req.body.contact
  const dob=req.body.dob
  const id=userid
  console.log(Vandor)
  console.log(email)
  console.log(contact)
  console.log(dob)
  connection.query('update vandorlogin SET Vandor=?, email=?, contact=?, dob=? where id =?;',[Vandor,email,contact,dob,id],(error, result) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    res.json({
      status: true,
      data: result,
      message: 'User Have Updated'
    })
  }
  });
});

/*###################################Delete vandor Data############################################# */
app.delete('/getvandordelet/:id', (req, response) => {
  const  userid=req.params.id
  const id =userid
   connection.query('DELETE FROM  vandorlogin where id=?  ;',[id],(error, result) => {
     if (error) {
       response.json({
         status: false,
         message: 'there are some error with query',
         error: error
       })
     }else{
     response.json({
       status: true,
       data: result,
       message: 'User Have been Deleted'
     })
   }
   });
 });

 /*###################################getSerivesservicesadmin##################################### */

app.get('/getFreeservices', (request, response) => {
  connection.query('SELECT id,servicename,price,totalamount FROM amount ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

 /*###################################getMonthlyservicesadmin##################################### */

app.get('/getmonthlyservices', (request, response) => {
  connection.query('SELECT id,servicename,price,totalamount FROM monthly ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*###################################getyearlyservicesadmin##################################### */

app.get('/getyearlyservices', (request, response) => {
  connection.query('SELECT id,servicename,price,totalamount,userid,startdate,enddate FROM yearly ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*###################################gethouradmin##################################### */

app.get('/gethourAdmin', (request, response) => {
  connection.query('SELECT id,project,team,hourwork FROM payhour ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});


/*###################################getcashadmin##################################### */

app.get('/getcashAdmin', (request, response) => {
  connection.query('SELECT id,project,team,hourwork FROM paycash ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*###################################Edit  Data############################################# */

app.put('/edithour/:id', (req, res) => {
  const userid = req.params.id
  const hourwork=req.body.hourwork
  const id=userid
 
  connection.query('update payhour SET hourwork=? where id =?;',[hourwork,id],(error, result) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    res.json({
      status: true,
      data: result,
      message: 'User Have Updated'
    })
  }
  });
});

/*###################################Edit  Data############################################# */

app.put('/editcash/:id', (req, res) => {
  const userid = req.params.id
  const hourwork=req.body.hourwork
  const id=userid
 
  connection.query('update paycash SET hourwork=? where id =?;',[hourwork,id],(error, result) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    res.json({
      status: true,
      data: result,
      message: 'User Have Updated'
    })
  }
  });
});


/*################################### Edit Modify ############################################# */

app.put('/editwork/:id', (req, res) => {
  const userid = req.params.id
  const description=req.body.description
  const field=req.body.field
  const id=userid
 
  connection.query('update sop SET description=?,field=? where id =?;',[description,field,id],(error, result) => {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    res.json({
      status: true,
      data: result,
      message: 'User Have Updated'
    })
  }
  });
});

/*################################### Get Vandor details ######################################## */

app.get('/vandoruser/:localid', (request, response) => {
 /*  localid= localStorage.getItem('vandoruserid')
 console.log(localid) */
const id = request.params.localid

connection.query('SELECT * FROM userassign where vandoruser=? ;', [id], (error, result) => {
  if (error) throw error;

  response.json({
    status: true,
    data: result,
    message: 'user get Vandor User user'
  })
});
});

/*################################### Approve Data ######################################## */
app.post('/reqment', (req, res) => {  
  const userid = req.body.userid;
  const project = req.body.project;
  const description = req.body.description;
  const field = req.body.field;
  const approve = req.body.approve;
  console.log(userid)
  console.log(project)
  console.log(description)
  console.log(field)
  console.log(approve)
  connection.query("INSERT INTO requirement (project,description,field,approve,userid) VALUES (?,?,?,?,?)",[project, description,field,approve,userid], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'user registered sucessfully'
      })
    }
  })
})

/*################################### getApprove ##################################### */

app.get('/Approveproject', (request, response) => {
  connection.query('SELECT * FROM requirement ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*#################################### work upload ############################################## */
app.get('/upwork', (request, response) => {
  connection.query('SELECT * FROM workupload ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*#################################### Complain upload ########################################## */
app.get('/complain', (request, response) => {
  connection.query('SELECT * FROM complain ;',(error, result) => {
    if (error) {
      response.json({
        status: false,
        message: 'there are some error with query',
        error: error
      })
    }else{
    response.json({
      status: true,
      data: result,
      message: 'get Vandor Details'
    })
  }
  });
});

/*################################################Reset password ################################################# */
/* app.patch('/reset', function (req, res) {

  const email = req.body.email
  const password =req.body.password
  connection.query('UPDATE * FROM users WHERE email = ? password ;', [email,p], function (error, results, fields) {
    token = jwt.sign({ email }, 'secret key')
  

      .then(() => {
        if(error) {
          res.json({
            status: false,
            message: 'password does not match',
            error: error
          })
        } else {
          res.json({
            status: true,
            token: token,
            message: 'Reset password',
            data: results,

  
          })
        }

      })
   
  });
})
 */



 app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = connection;