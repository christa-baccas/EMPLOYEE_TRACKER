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
  return inquirer.prompt([
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
          "Exit"
        ],
      },
    ]).then((select) => {
      switch (select.options) {
        case "View All Employees":
          viewEmployees();
          break;

        case "Add an Employee":
          addNewEmployee();
          break;

        case "Update Employee Role":
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add a Role":
          addNewRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Department":
          addNewDepartment();
          break;

        default:
          return;
          break;
    };
  });
};
startupQuestions();

// //view all departments
const viewDepartments = () => {
  db.query(
    "SELECT department.id AS ID, department.name AS Department FROM department",
    function (err, results) {
      console.table(results);
      startupQuestions()
    }
  );
};

// //view all roles
const viewRoles = () => {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      console.table(results);
      startupQuestions()
    }
  );
};

// //view all employees
const viewEmployees = () => {
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,role.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, results) {
      console.table(results);
      startupQuestions()
    }
  );
};

// add department prompt
const addNewDepartment = () => {
  inquirer.prompt([
      {
        type: "type",
        message: "Enter the name of the department",
        name: "department",
      }
    ]).then((data) => {
      let addDept = [data.department];
      db.query(
        "INSERT INTO department (name) VALUES (?)",addDept,(err, result) => {
          if (err) {
            console.log(err);
          }
          console.log('Department Added!');
          startupQuestions()
        }
      );
    });
};

// add new role 
const addNewRole = () => {
  inquirer.prompt([
      {
        type: "type",
        message: "Enter title of role.",
        name: "title",
      },
      {
        type: "type",
        message: "Enter salary of role.",
        name: "salary",
      }
    ]).then((data) => {
      const addRole = [data.title, data.salary];
      db.query(`SELECT name, id FROM department`, (err, result) => {      
        const departmentTable = result.map(({ id, name }) => ({ name: name, value: id }));
    
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "Select the new role's department",
                choices: departmentTable
              }
            ]).then(data => {
              const dept = data.departmentTable;
              addRole.push(dept);
              console.log(addRole);
          //   db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, addRole, (err, result) => { 
          //     if (err) {
          //       console.log(err);
          //     }
          //     console.log('Role Added!');
          //     startupQuestions()
          // });
      });
    })
  });
}
                      
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//WHEN I choose to update an employee role prompted to select an employee to update and their new role and this information is updated in the database
