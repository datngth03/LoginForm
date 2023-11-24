import express from "express";
// rest of your code...

import cors from "cors";
import router from "./Routes/adminRoute.js";
import { EmployeeRouter } from "./Routes/employeeRoute.js";

const app = express();
const port = 3000;

app.use(
   cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
   })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.use("/auth", router);
app.use("/employee", EmployeeRouter);

const verifyUser = (req, res, next) => {
   const token = req.cookies.token;
   if (token) {
      Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
         if (err) return res.json({ Status: false, Error: "Wrong Token" });
         req.id = decoded.id;
         req.role = decoded.role;
         next();
      });
   } else {
      return res.json({ Status: false, Error: "Not autheticated" });
   }
};
app.get("/verify", verifyUser, (req, res) => {
   return res.json({ Status: true, role: req.role, id: req.id });
});

app.listen(port, () => {
   console.log(`Example app listening on port http://localhost:${port}`);
});
