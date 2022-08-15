SELECT 
    e.first_name,
    e.last_name,
    r.title,
    d.name AS department
FROM role r
JOIN employee e
    ON e.role_id = r.id
JOIN department d
    ON d.id = r.department_id
WHERE d.id = 'Sales'
