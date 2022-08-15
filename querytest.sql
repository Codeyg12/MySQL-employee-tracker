SELECT 
    SUM(r.salary) as total_salary,
    d.name as department
FROM role r
JOIN employee e
    ON e.role_id = r.id
JOIN department d
    ON d.id = r.department_id
WHERE d.id = 4
