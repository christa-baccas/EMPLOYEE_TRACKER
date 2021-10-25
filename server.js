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
        // view all employees showing employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        case "View All Employees":
          db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, function (err, results) {
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
          addNewRole();
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
   inquirer.prompt([
      {
        type: "type",
        message: "Enter the name of the department",
        name: "newDepartment",
      },
    ]).then(data => {
      let addDept = [data.newDepartment];
      console.log(addDept);
      db.query("INSERT INTO department (name) VALUES (?)", addDept, (err, result) => {        
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    });
  };



// add role prompt
const addNewRole = () => {
   inquirer.prompt([
      {
        type: "type",
        message: "Enter the title of the role",
        name: "newRoleTitle",
      },
      {
        type: "type",
        message: "Enter the salary of the role",
        name: "newRoleSalary",
      },
    ]).then((data) => {
        let addRole = [data.newRoleTitle, data.newRoleSalary]
        console.log(addRole);
        //show department table from db
        db.query("SELECT name, id FROM department", function (err, results) {
        console.table(results);

        inquirer.prompt([
          {
            type: "type",
            message: "Enter the deparment id for the role being created",
            name: "newRoleDepartment",
          }
        ]).then((data) =>{
          addRole.push(data.newRoleDepartment)
          console.log(addRole);
        })
    });
  })
}




// // add employee prompt
// const addNewEmployee = () => {
//   return inquirer
//     .prompt([
//       {
//         type: "type",
//         message: "Enter the name of the department",
//         name: "newDepartment",
//       },
//     ])
// };
      


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// I choose to add a role enter the name, salary, and department for the role and that role is added to the database

// WHEN I choose to add an employee enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// WHEN I choose to update an employee role prompted to select an employee to update and their new role and this information is updated in the database
