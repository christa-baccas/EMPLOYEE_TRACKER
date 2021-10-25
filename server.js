const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
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
        choices: [
          "View All Employees",
          "Add an Employee",
          "Update Employee Role",
          "View All Roles",
          "Add a Role",
          "View All Departments",
          "Add Department",
        ],
      },
    ])
    .then((select) => {
      switch (select.options) {
        case "View All Employees":
          db.query("SELECT * FROM employee", function (err, results) {
            console.table(results);
          });
          break;
        case "Add an Employee":
          break;
        case "Update Employee Role":
          break;
        // view all roles view job title, role id, the department, and the salary
        case "View All Roles":
            db.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id", function (err, results) {
            console.table(results);
          });
          break;
        case "Add a Role":
          break;
        // view all departments id and names
        case "View All Departments":
            db.query("SELECT department.id AS ID, department.name AS Department FROM department", function (err, results) {
            console.table(results);
          });
          break;
        case "Add Department":
            addNewDepartment();
          break;
        default:
          break;
      }
    });
};
startupQuestions();



// add department prompt
const addNewDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
    ])
};

// add role prompt
const addNewRole = () => {
  return inquirer
    .prompt([
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
    ])
};

// add employee prompt
const addNewEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
    ])
};
// INSERT INTO department (name)
// VALUES (Finance) 
      





app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


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
