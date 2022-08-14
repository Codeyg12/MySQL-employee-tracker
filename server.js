const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "mypass",
  database: "company_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Now connected as ${connection.threadId}`);
  startQuestions();
});

startQuestions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "starterQ",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "View All Managers",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      switch (response.starterQ) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
          case "View All Managers":
            viewAllManagers()
            break;
          //New functions here
        default:
          connection.end();
          console.log("Thanks for stopping by");
          break;
      }
    });
};

viewAllEmployees = () => {
  connection.query(
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee e LEFT JOIN employee m ON m.id = e.manager_id JOIN role r ON e.role_id = r.id JOIN department d on d.id = r.department_id ORDER BY e.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(
        "\n------------------------------------------------------------------------------------", res, "\n------------------------------------------------------------------------------------"
      );
      startQuestions();
    }
  );
};

addEmployee = () => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
  });
  let roles = res.map((role) => ({ name: role.title, value: role.id }));
  connection.query(`SELECT * FROM employee;`, (err, res) => {
    if (err) throw err;
  });
  let employees = res.map((employee) => ({
    name: employee.first_name + " " + employee.last_name,
    value: employee.id,
  }));
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?",
    },
    {
      name: "employeeNewRole",
      type: "list",
      message: "What is the employee's role",
      choices: roles,
    },
    {
      name: "employeeNewManager",
      type: "list",
      message: "Who is the employee's manager?",
      choices: employees,
    },
  ]);
};

viewAllRoles = () => {
  connection.query(
    `SELECT d.id, r.title, d.name, r.salary FROM department d JOIN role r ON d.id = r.department_id ORDER BY d.id;`,
    (err, res) => {
      if (err) throw err;
      console.table(
        "\n------------------------------------------", res, "\n------------------------------------------"
      );
      startQuestions();
    }
  );
};

addRole = () => {
  connection.query(`SELECT * FROM department;`, (err, res) => {
    if (err) throw err;
  });
  let departments = res.map((dept) => ({ name: dept.name, value: dept.id }));
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What new role would you like to add?",
      },
      {
        name: "newSalary",
        type: "number",
        message: "What is the salary of the new role?",
      },
      {
        name: "newRoleDept",
        type: "list",
        message: "Which department does the new role belong to?",
        choices: departments,
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO role SET ?`,
        {
          title: response.newRole,
          salary: response.newSalary,
          department_id: response.newRoleDept,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`\n ${response.newRole} added to role table!`);
          startQuestions();
        }
      );
    });
};

viewAllDepartments = () => {
  connection.query(
    `SELECT * FROM department ORDER BY name ASC;`,
    (err, res) => {
      if (err) throw err;
      console.table(
        "\n---------------------", res, "\n---------------------"
      );
      startQuestions();
    }
  );
};

addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      connection.query(
        `INSERT INTO department SET ?`,
        {
          name: response.newDepartment,
        },
        (err, res) => {
          if (err) throw err;
          console.log(
            `\n ${response.newDepartment} added to department table!`
          );
          startQuestions();
        }
      );
    });
};

viewAllManagers = () => {
  connection.query(`SELECT CONCAT(m.first_name, " ", m.last_name) AS manager_name, d.name AS department FROM employee m LEFT JOIN department d ON m.role_id = d.id WHERE m.manager_id is NULL`,
  (err, res) => {
    if (err) throw err
    console.table(
      "\n------------------------------------------", res, "\n------------------------------------------"
    );
    startQuestions();
  })
}
// How does async await work