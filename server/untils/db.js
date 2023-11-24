import mysql from "mysql";

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "employees",
});

db.connect((err) => {
   if (err) {
      console.log("connect err " + err);
   } else {
      console.log("connected!");
   }
});

export default db;
