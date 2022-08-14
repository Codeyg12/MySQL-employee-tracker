INSERT INTO department (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Ash', 'Ketchum', 1, NULL),
    ('Leon', 'Kennedy', 2, NULL),
    ('Ken', 'Kaneki', 3, NULL),
    ('Saul', 'Goodman', 4, NULL),
    ('Billy', 'Smath', 2, 1),
    ('Stanley', 'Yelnats', 2, 1),
    ('Jimothy', 'Halpert', 4, 2),
    ('Steve', 'Carell', 4, 2),
    ('Jake', 'Peralta', 6, 3),
    ('J.R.R', 'Tolkien', 6, 3),
    ('Marshal', 'Erikson', 8, 4),
    ('Nick', 'Starker', 8, 4);
