USE employees_db;

-- department --
INSERT INTO department(name)
VALUES  ("Finance"),
        ("Human Resources"),
        ("IT"),
        ("Sales"),
        ("Marketing"),
        ("Operations"),
        ("Development");
SELECT * FROM employees_db.department;

-- roles --
INSERT INTO role(title,salary,department_id)
VALUES  ("Marketing Manager", 100.00, 5), --
        ("Marketing Assistant", 80.00, 5), --
		("Senior Software Developer", 100.000, 7), --
		("QA Engineer", 100.000, 7), --
		("Sales Representative", 70.000, 4), --
		("Customer Service Representative", 55.000, 4),--
		("Sales Manager", 95.000, 4),--
		("IT Manager", 80.000, 3), --
		("IT Representative", 65.000, 3), --
		("Director of Operations", 190.000, 6),
		("HR Manager", 95.000, 2),
		("Payroll Clerk", 95.000, 1);
SELECT * FROM employees_db.role;

-- employees --
INSERT INTO employee(first_name, last_name, role_id)
VALUES  ("Christa", "Baccas", 7), -- software developer
        ("Tom", "Cruz", 7), -- QA engineer
        ("Tim", "Farley", 4), -- sales rep
        ("Lilly", "Ye", 4), -- sales manager (oversee sales reps)
        ("Doug", "Kanter", 6), -- DOO (oversee cs reps)
        ("Alex", "Kenzi", 4), -- cs rep
        ("Jaclyn", "Allen", 2), -- hr manager (oversee payroll)
        ("Nikita", "Campos", 1), -- payroll clerk 
        ("Joseph", "Bryan", 5), -- marketing manager
        ("Frank", "Dee", 5), -- marketing asst.
        ("Mike", "Thomas", 3), -- IT manager
        ("Jasmine", "Henry", 3); -- IT rep
SELECT * FROM employees_db.employee;

-- Marketing manager oversees marketing agents
UPDATE employee
SET manager_id = 1
WHERE role_id = 2;
SELECT * FROM employees_db.employee;

-- developement
UPDATE employee
SET manager_id = 4
WHERE role_id = 3;
SELECT * FROM employees_db.employee;

-- sales
UPDATE employee
SET manager_id = 7
WHERE role_id = 5;
SELECT * FROM employees_db.employee;

-- DOO
UPDATE employee
SET manager_id = 5
WHERE role_id = 6;
SELECT * FROM employees_db.employee;
-- IT
UPDATE employee
SET manager_id = 8
WHERE role_id = 9;
SELECT * FROM employees_db.employee;

-- hr 
UPDATE employee
SET manager_id = 11
WHERE role_id = 12;
SELECT * FROM employees_db.employee;
