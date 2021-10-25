const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(`Connected to the database.`)
);

// prompt for startup - questions
const startupQuestions = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "Please select the following",
        name: "options",
        choices: ["View All Employees", "Add an Employee", "Update Employee Role", "View All Roles", "Add a Role", "View All Departments", "Add Department"]
     },
    ]).then((select) => {
      switch (select.options) {
        case "View All Employees":
          db.query('SELECT * FROM employee', function (err, results) {
            // console.log(results);
            console.table(results);
          });
          // console.log("View Employees");
          break;
        case "Add an Employee":
          console.log("Add an Employee");
          break;
        case "Update Employee Role":
          console.log("Update Employee Role");
          break;
        case "View All Roles":
          db.query('SELECT * FROM role', function (err, results) {
            // console.log(results);
            console.table(results);
          });
          console.log("View All Roles");
          break;
        case "Add a Role":
          console.log("Add a Role");
          break;
        case "View All Departments":
          console.log("View all departments");
          break;
        case "Add Department":
          console.log("Add Department");
          break;
        default:
          break;
      }
    });
};
startupQuestions();

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WHEN I choose to view all departments I'm presented with a formatted table showing department names and department ids

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 