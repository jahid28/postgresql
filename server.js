const express = require("express");
const app = express();
const { client } = require("./pg.js");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
// app.set("views", tempelatePath)


app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/signup", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isthere = await client.query(
      `select count(*) from users where email='${email}'`
    );

    if (parseInt(isthere.rows[0].count) > 0) {
      res.send("Email already registered")
    } else {
      const query = `
      insert into users(name,email,password) values($1,$2,$3)`;
      const values = [name, email, password];
      await client.query(query, values);
      res.render("home",{name});
    }
  } catch (err) {
    res.send(err)
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isthere = await client.query(
      `select count(*) from users where email='${email}'`
    );
    
    if (parseInt(isthere.rows[0].count) == 0) {
      res.send('Email not registered');
    }
    else{
      const passFromTable = await client.query(
        `select * from users where email='${email}'`
      );

      if(passFromTable.rows[0].password==password){
        res.render("home",{name:passFromTable.rows[0].name})
        // res.json({ message: 'correct' ,name:passFromTable.rows[0].name});

      }
      else{
        res.send('Incorrect password');

      }
  

    }
  } catch (err) {
    res.send(err);
  }
});


app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});
