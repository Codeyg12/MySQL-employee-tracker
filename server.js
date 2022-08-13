const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "mypass",
  database: "company_db",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Now connected");
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
        default:
          connection.end();
          console.log("Thanks for stopping by");
          break;
      }
    });
};

viewAllEmployees = () => {

}

addEmployee = () => {

}

viewAllRoles = () => {
    connection.query(`SELECT d.id, r.title, d.name, r.salary FROM department d JOIN role r ON d.id = r.department_id ORDER BY d.id;`, (err, res) => {
        if (err) {
            throw err
        }
        console.log('\n---------------------' + res + '\n---------------------')
        startQuestions()
    })
}

addRole = () => {

}

viewAllDepartments = () => {
    connection.query(`SELECT * FROM department ORDER BY name ASC;`, (err, res) => {
        if (err) {
            throw (err)
        }
        console.log('\n---------------------' + res + '\n---------------------')
        startQuestions()
    })
}

addDepartment = () => {

}
