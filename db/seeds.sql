USE employees_db;

-- department --
INSERT INTO department(name)
VALUES  ("Human Resources"), -- 1
        ("IT"), -- 2
        ("Sales"), -- 3
        ("Marketing"), -- 4 
        ("Operations"), -- 5 
        ("Development"); -- 6
SELECT * FROM employees_db.department;

-- roles --
INSERT INTO role(title,salary,department_id)
VALUES  ("Marketing Manager", 100000, 4), 
        ("Marketing Assistant", 80000, 4), 
		("Senior Software Developer", 100000, 6), 
		("QA Engineer", 100000, 6), 
		("Sales Representative", 70000, 3),
		("Sales Manager", 95000, 3),
		("IT Manager", 80000, 2),
		("IT Representative", 65000, 2), 
		("Director of Operations", 150000, 5),
		("HR Manager", 95000, 1),
		("Payroll Clerk", 85000, 1);
SELECT * FROM employees_db.role;

-- employees --
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("Christa", "Baccas", 3, NULL), -- software developer
        ("Tom", "Cruz", 4, 1), -- QA engineer
        ("Tim", "Farley", 6, Null), -- sales manager (oversee sales reps)
        ("Lilly", "Ye", 5, 3), -- sales rep
        ("Doug", "Kanter", 9, Null), -- DOO
        ("Jaclyn", "Allen", 10, Null), -- hr manager (oversee payroll)
        ("Nikita", "Campos", 11, 6), -- payroll clerk 
        ("Joseph", "Bryan", 1, Null), -- marketing manager
        ("Frank", "Dee", 2, 8), -- marketing asst.
        ("Mike", "Thomas", 7, Null), -- IT manager
        ("Jasmine", "Henry", 8, 10); -- IT rep
SELECT * FROM employees_db.employee;
