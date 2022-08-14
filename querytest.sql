SELECT 
    CONCAT(m.first_name, " ", m.last_name) AS manager_name,
    d.name AS department
FROM employee m
LEFT JOIN department d
    ON m.role_id = d.id
WHERE m.manager_id is NULL