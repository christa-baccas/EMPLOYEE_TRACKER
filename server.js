const inquirer = require("inquirer");
const mysql = require("mysql2");

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
   inquirer.prompt([
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
          updateEmployee();
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

        case "Exit":
          return process.exit()
          break;

        default :
          break;
    };
  });
};
startupQuestions();

//view all departments
const viewDepartments = () => {
  db.query(
    "SELECT department.id AS ID, department.name AS Department FROM department",
    function (err, results) {
      console.table(results);
      startupQuestions()
    }
  );
};

//view all roles
const viewRoles = () => {
  db.query("SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id",
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
      // searches the db for a list of deparments the role can be assigned too
      db.query(`SELECT name, id FROM department`, (err, result) => {      
        const departmentTable = result.map(({ id, name }) => ({ name: name, value: id }));
    
        inquirer.prompt([
              {
                type: 'list',
                name: 'deptartment',
                message: "Select the new role's department",
                choices: departmentTable
              }
            ]).then(data => {
              const department = data.deptartment;
              addRole.push(department);
              // console.log(addRole);
              db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, addRole, (err, result) => { 
                if (err) {
                  console.log(err);
                }
                console.log('Role Added!');
                startupQuestions()
            });
      });
    })
  });
}



// add new employee
const addNewEmployee = () => {
  inquirer.prompt([
      {
        type: "type",
        message: "Enter first name of the employee.",
        name: "first",
      },
      {
        type: "type",
        message: "Enter last name of the employee",
        name: "last",
      }
    ]).then((data) => {
      const addEmployee = [data.first, data.last];
      db.query(`SELECT title, id FROM role`, (err, result) => {      
        const roleTable = result.map(({ id, title }) => ({ name:title, value:id }));
        // console.log(roleTable);
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "Select the new employee's role.",
                choices: roleTable
              }
            ]).then(data => {
              addEmployee.push(data.role);
              db.query('SELECT * FROM employee', (err, result) => {
                const managers = result.map(({ id, first_name, last_name }) => ({name:first_name + " " + last_name, value:id }));
                // console.log(managers)
                inquirer.prompt([
                  {
                    type: 'list',
                    name: 'manager',
                    message: "Select the new employee's manager.",
                    choices: managers
                  }
                ]).then((data) =>{
                  addEmployee.push(data.manager);
                  // console.log(addEmployee);
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, addEmployee, (err, result) => { 
                      if (err) {
                        console.log(err);
                      }
                      console.log('Employee Added!');
                      startupQuestions()
                });
              })
            })
        });
      })
    });
  }

  
// update an employee role prompted to select an employee to update and their new role and this information is updated in the database
// update employee info
const updateEmployee = () => {
  db.query('SELECT * FROM employee', (err, result) => {
    const employee = result.map(({ id, first_name, last_name }) => ({name:first_name + " " + last_name, value:id }));
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: "Select the employee you'd like to update.",
        choices: employee
      }
    ]).then((data) => {
      const updateRole = [data.employee];
      db.query(`SELECT title, id FROM role`, (err, result) => {      
        const roleTable = result.map(({ id, title }) => ({ name:title, value:id }));
        // console.log(roleTable);
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "Select the new employee's role.",
                choices: roleTable
              }
            ]).then((data) =>{
              updateRole.unshift(data.role);
              // console.log(updateRole);

                db.query(`UPDATE employee SET role_id = ? WHERE id = ? `, updateRole, (err, result) => { 
                  if (err) {
                    console.log(err);
                  }
                  console.log('Employee Updated!');
                  startupQuestions()
            });
          })
      });
    }); 
  });
};

