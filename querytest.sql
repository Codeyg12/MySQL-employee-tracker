SELECT 
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) manager
FROM employee e
JOIN employee m ON m.id = e.manager_id
JOIN role r on e.role_id = r.id
JOIN department d on d.id = r.department_id
ORDER BY e.id


-- also not showing 'null' managers 