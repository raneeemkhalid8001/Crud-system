"use strict";

var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var age = document.getElementById('age');
var department = document.getElementById('department');
var salary = document.getElementById('salary');
var btnClick = document.getElementById('click');
var tbody = document.getElementById('tbody');
var deleteAllBtn = document.getElementById('delAllBtn');
var clear = document.getElementById('clear');
var alertName = document.getElementById('alertName');
var alertDepartment = document.getElementById('alertDepartment');
var alertAge = document.getElementById('alertAge');
var inputs = document.getElementsByClassName('inputs');
var searchText = document.getElementById('search');
var thisIndex = 0;

if (localStorage.getItem("employeeList") == null) {
  var employees = [];
} else {
  var employees = JSON.parse(localStorage.getItem("employeeList"));
  displayEmployee();
}

btnClick.onclick = function () {
  if (btnClick.innerHTML == "Add employee") addEmployee();else {
    updateEmployee(thisIndex);
  }
  displayEmployee();
  clearForm();
};

function addEmployee() {
  var employee = {
    name: firstName.value,
    lastName: lastName.value,
    age: age.value,
    department: department.value,
    salary: salary.value
  };
  employees.push(employee);
  localStorage.setItem("employeeList", JSON.stringify(employees));
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Your employee has been added',
    showConfirmButton: false,
    timer: 1500
  });

  if (btnClick.innerHTML == "Add employee") {
    firstName.classList.add('is-invalid');
    firstName.classList.remove('is-valid');
    age.classList.add('is-invalid');
    age.classList.remove('is-valid');
    department.classList.add('is-invalid');
    department.classList.remove('is-valid');
    btnClick.disabled = "true";
  }
}

function displayEmployee() {
  var result = "";

  for (var i = 0; i < employees.length; i++) {
    result += "<tr>\n        <td>".concat(i, "</td>\n        <td>").concat(employees[i].name, "</td>\n        <td>").concat(employees[i].age, "</td>\n        <td>").concat(employees[i].department, "</td>\n        <td>").concat(employees[i].salary, "</td>\n        <td><button class=\"btn btnIcon\" onclick=\"getEmployee(").concat(i, ")\"><i class=\"fa-solid fa-pen-to-square\"></i></button><button class=\"btn btnIcon trash\" onclick=\"deleteEmployee(").concat(i, ")\"><i class=\"fa-solid fa-trash\"></i></button></td>\n        </tr>"); //    result+="<tr><td>"+i+"</td><td>"+employees[i].name+"</td><td>"+employees[i].age+"</td><td>"+employees[i].department+"</td><td>"+employees[i].salary+"</td><td></td</tr>";
  }

  tbody.innerHTML = result;
}

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteEmployee(index) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(function (result) {
    if (result.isConfirmed) {
      employees.splice(index, 1);
      localStorage.setItem("employeeList", JSON.stringify(employees));
      displayEmployee();
      Swal.fire('Deleted!', 'employee has been deleted.', 'success');
    }
  });
}

deleteAllBtn.onclick = function () {
  if (localStorage.getItem("employeeList") == null || tbody.innerHTML == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    });
  } else {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function (result) {
      if (result.isConfirmed) {
        localStorage.removeItem("employeeList");
        employees = [];
        tbody.innerHTML = "";
        Swal.fire('Deleted!', 'All employees has been deleted.', 'success');
      }
    });
  }
};

clear.onclick = function () {
  clearForm();
};

function search(searchTest) {
  var result = "";

  for (var i = 0; i < employees.length; i++) {
    if (employees[i].name.toLowerCase().includes(searchTest.toLowerCase())) result += "<tr>\n        <td>".concat(i, "</td>\n        <td>").concat(employees[i].name, "</td>\n        <td>").concat(employees[i].age, "</td>\n        <td>").concat(employees[i].department, "</td>\n        <td>").concat(employees[i].salary, "</td>\n        <td><button class=\"btn btnIcon\" ><i class=\"fa-solid fa-pen-to-square\"></i></button><button class=\"btn btnIcon trash\" onclick=\"deleteEmployee(").concat(i, ")\"><i class=\"fa-solid fa-trash\"></i></button></td>\n        </tr>");
  }

  tbody.innerHTML = result;
}

function getEmployee(index) {
  firstName.classList.add('is-valid');
  firstName.classList.remove('is-invalid');
  age.classList.add('is-valid');
  age.classList.remove('is-invalid');
  department.classList.add('is-valid');
  department.classList.remove('is-invalid');
  var employee = employees[index];
  firstName.value = employee.name;
  lastName.value = employee.lastName;
  age.value = employee.age;
  department.value = employee.department;
  salary.value = employee.salary;
  btnClick.innerHTML = "update employee";
  thisIndex = index;
}

function updateEmployee(index) {
  if (age.value != "" && department.value != "" && firstName.value != "") {
    btnClick.removeAttribute("disabled");
    var employee = {
      name: firstName.value,
      lastName: lastName.value,
      age: age.value,
      department: department.value,
      salary: salary.value
    };
    employees[index] = employee;
    localStorage.setItem("employeeList", JSON.stringify(employees));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'employee has been updated',
      showConfirmButton: false,
      timer: 1500
    });
    btnClick.innerHTML = "Add employee";
    firstName.classList.add('is-invalid');
    firstName.classList.remove('is-valid');
    age.classList.add('is-invalid');
    age.classList.remove('is-valid');
    department.classList.add('is-invalid');
    department.classList.remove('is-valid');
    btnClick.disabled = "true";
  } else {
    btnClick.disabled = "true";
  }
}

firstName.onkeyup = function () {
  var namePattern = /^[A-Z][a-z]{2,8}$/;

  if (namePattern.test(firstName.value)) {
    if (age.value != "" && department.value != "") {
      btnClick.removeAttribute("disabled");
    } else {
      btnClick.disabled = "true";
    }

    firstName.classList.add('is-valid');
    firstName.classList.remove('is-invalid');
    alertName.classList.add('d-none');
  } else {
    btnClick.disabled = "true";
    firstName.classList.add('is-invalid');
    firstName.classList.remove('is-valid');
    alertName.classList.remove('d-none');
  }
};

age.onkeyup = function () {
  var agePattern = /^[2-8][0-9]{1}$/;

  if (agePattern.test(age.value)) {
    if (firstName.value != "" && department.value != "") {
      btnClick.removeAttribute("disabled");
    } else {
      btnClick.disabled = "true";
    }

    age.classList.add('is-valid');
    age.classList.remove('is-invalid');
    alertAge.classList.add('d-none');
  } else {
    btnClick.disabled = "true";
    age.classList.add('is-invalid');
    age.classList.remove('is-valid');
    alertAge.classList.remove('d-none');
  }
};

department.onkeyup = function () {
  var departmentPattern = /^[A-Z][a-z]{2,8}$/;

  if (departmentPattern.test(department.value)) {
    if (age.value != "" && firstName.value != "") {
      btnClick.removeAttribute("disabled");
    } else {
      btnClick.disabled = "true";
    }

    department.classList.add('is-valid');
    department.classList.remove('is-invalid');
    alertDepartment.classList.add('d-none');
  } else {
    btnClick.disabled = "true";
    department.classList.add('is-invalid');
    department.classList.remove('is-valid');
    alertDepartment.classList.remove('d-none');
  }
};
//# sourceMappingURL=main.dev.js.map
