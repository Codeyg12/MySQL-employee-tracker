SELECT 
    e.first_name,
    e.last_name,
    d.name AS department
FROM employee e
LEFT JOIN department d
    ON e.role_id = d.id
WHERE department is Sales
