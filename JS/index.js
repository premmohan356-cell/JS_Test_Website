let Regis_Btn = document.getElementById("nav_reg_btn");
let InputList = document.querySelectorAll("form input");
let Submit_Button = document.getElementById("RegisFormTag");
let Image_Input = document.getElementById("imageInp");
let CourseInput = document.getElementById("courseInp");
let MainTableBody = document.getElementById("TabelBodyTag");
let Search_Inp = document.getElementById("SearchInput");

let ImgUrl;
// Windowlogn funtion.................................
StudentData();
// DashUpdate();
// Windowlogn funtion.................................

Submit_Button.addEventListener("submit", submission);
function submission(event) {
  event.preventDefault();
  let object_input_data = {};
  InputList.forEach((n) => {
    object_input_data[n.getAttribute("id")] = n.value;
  });
  PutDataStore(object_input_data);
  // console.log(this);
  this.reset();
}
// LocalStorage Work......................................................
function PutDataStore(obj) {
  obj["imageInp"] = ImgUrl;
  obj["courseInp"] = CourseInput.value;
  obj["genderInp"] = document.querySelector("#genderInp").value;
  let object_Name = obj["emailInp"];
  let object_String_data = btoa(JSON.stringify(obj));
  localStorage.setItem(btoa(object_Name) + "_Datum", object_String_data);
  MainTableBody.innerHTML = "";
  // console.log(obj);
  StudentData();
}
// Image Work.................................
Image_Input.addEventListener("change", Imgfunct);
function Imgfunct() {
  let reader = new FileReader();
  // console.log(this);
  reader.readAsDataURL(this.files[0]);
  reader.onload = function () {
    ImgUrl = reader.result;
    let ImageArea = document.querySelector("#img-preview img");
    ImageArea.src = ImgUrl;
  };
}
// Marks Work..................................
let MarksInput = document.querySelectorAll("#MarksBox input");

MarksInput.forEach((Inputs) => {
  Inputs.addEventListener("input", function () {
    let MarksTotal = 0;
    MarksInput.forEach((n) => {
      if (!(n.value > 100) && !n.value.match(/[a-z]/)) {
        MarksTotal += Number(n.value);
      } else {
        window.alert("Please Enter Correct Mark");
        n.value = "";
      }
    });
    StyleValue(MarksTotal);
  });
});
// MarkS Board work.....................................................
function StyleValue(sum) {
  let Averagemark = (sum / 400) * 100;
  let MarkStyle = document.querySelectorAll("#MarksBoard span");
  // console.log((MarkStyle[0].innerText = sum));
  MarkStyle[0].innerText = `${sum}/400`;
  MarkStyle[1].innerText = `${Averagemark.toFixed(2)}%`;
}
// Data Back To Directory.................................................
function StudentData() {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    // console.log(key.match("_Datum"));
    if (key.match("_Datum")) {
      let Student_data_string = atob(localStorage.getItem(key));
      let Student_data_object = JSON.parse(Student_data_string);
      // console.log(Student_data_object);
      AddStudnentDir(Student_data_object);
    }
  }
  DashUpdate();
}
function AddStudnentDir(database) {
  // console.log(database);
  let totalmarks = (
    ((Number(database["comupterMarks"]) +
      Number(database["englishMarks"]) +
      Number(database["mathsMarks"]) +
      Number(database["practicalMarks"])) /
      400) *
    100
  ).toFixed(2);
  let grade;
  let color;
  if (totalmarks >= 35) {
    grade = "PASS";
    color = "success";
  } else {
    grade = "FAIL";
    color = "danger";
  }

  // MainTableBody.innerHTML = "";
  let table_row = document.createElement("TR");
  table_row.setAttribute("stdtable", JSON.stringify(database));
  let table_data1 = document.createElement("TD");
  // ..................................................
  table_data1.className = "d-flex flex-column";
  let S_Name = document.createElement("SPAN");
  S_Name.className = "fw-bold";
  S_Name.innerText = database["nameInp"];
  let S_email = document.createElement("SPAN");
  S_email.className = "sml-txt";
  S_email.innerText = database["emailInp"];
  // ..................................................

  let table_data2 = document.createElement("TD");
  table_data2.className = "pt-3 text-secondary";
  table_data2.innerText = database["mobileInp"];
  let table_data3 = document.createElement("TD");
  table_data3.className = "pt-3 text-secondary";
  table_data3.innerText = database["courseInp"].toUpperCase();
  // /////////.........................
  let table_data4 = document.createElement("TD");
  table_data4.className = "pt-3";
  let S_Marks = document.createElement("SPAN");
  S_Marks.className = `bg-${color} bg-opacity-50 fw-bold text-success-emphasis rounded-4 p-2 sml-txt`;
  S_Marks.innerText = `${grade} ${totalmarks}%`;
  // /////////////...................
  let table_data5 = document.createElement("TD");
  table_data5.className = "pt-3";
  let editButton = document.createElement("SPAN");
  editButton.className =
    "bg-warning bg-opaicty-50 p-2 rounded-5 px-4 fw-bold sml-txt text-warning-emphasis me-2";
  editButton.innerText = "Edit";
  editButton.addEventListener("click", EditData);
  let deleteButton = document.createElement("SPAN");
  deleteButton.className =
    "sml-txt bg-danger bg-opaicty-50 rounded-5 fw-bold p-2 px-4 text-danger-emphasis";
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", DeleteData);
  // Apeending Element.................................
  table_row.appendChild(table_data1);
  table_row.appendChild(table_data2);
  table_row.appendChild(table_data3);
  table_row.appendChild(table_data4);
  table_row.appendChild(table_data5);
  // /..................................................
  table_data1.appendChild(S_Name);
  table_data1.appendChild(S_email);
  table_data4.appendChild(S_Marks);
  table_data5.appendChild(editButton);
  table_data5.appendChild(deleteButton);

  MainTableBody.appendChild(table_row);
}

// Search Input WOrk.......................................................
Search_Inp.oninput = function () {
  let Stdtables = MainTableBody.getElementsByTagName("TR");
  for (indexes of Stdtables) {
    let user_data_object = JSON.parse(indexes.getAttribute("stdtable"));
    if (
      user_data_object["nameInp"].toLowerCase().match(this.value.toLowerCase())
    ) {
      indexes.style.display = "table-row";
    } else {
      indexes.style.display = "none";
    }
  }
};
// search Input  work........................................
let CourseSearch = document.getElementById("course-Inp");
CourseSearch.addEventListener("change", function () {
  let Stdtables = MainTableBody.getElementsByTagName("TR");
  for (indexes of Stdtables) {
    let user_data_object = JSON.parse(indexes.getAttribute("stdtable"));
    console.log(user_data_object["courseInp"]);
    console.log(this.value);
    if (!this.value) {
      indexes.style.display = "table-row";
    } else if (
      user_data_object["courseInp"].toLowerCase() === this.value.toLowerCase()
    ) {
      indexes.style.display = "table-row";
    } else {
      indexes.style.display = "none";
    }
  }
});

/*function SearchTemplate(vals) {
  let Stdtables = MainTableBody.getElementsByTagName("TR");
  for (indexes of Stdtables) {
    let user_data_object = JSON.parse(indexes.getAttribute("stdtable"));
    if (user_data_object[vals].toLowerCase().match(this.value.toLowerCase())) {
      indexes.style.display = "table-row";
    } else {
      indexes.style.display = "none";
    }
  }
}*/
function DashUpdate() {
  let Stdtables = MainTableBody.getElementsByTagName("TR");
  student_Num = 0;
  Passed_Num = 0;
  courses_Array = [0, 0, 0];
  let Recent_Name = "";
  for (indexes of Stdtables) {
    let user_data_object = JSON.parse(indexes.getAttribute("stdtable"));
    Recent_Name +=
      user_data_object["nameInp"] + "_" + user_data_object["courseInp"] + "_";
    student_Num++;
    let totalmarks =
      ((Number(user_data_object["comupterMarks"]) +
        Number(user_data_object["englishMarks"]) +
        Number(user_data_object["mathsMarks"]) +
        Number(user_data_object["practicalMarks"])) /
        400) *
      100;
    if (totalmarks >= 35) {
      Passed_Num++;
    }
    switch (user_data_object["courseInp"]) {
      case "awd":
        {
          courses_Array[0]++;
        }
        break;
      case "adca":
        {
          courses_Array[1]++;
        }
        break;
      case "tally":
        {
          courses_Array[2]++;
        }
        break;
        defualt: {
        }
        break;
    }
  }
  let Recent_Name_Array;
  if (Recent_Name) {
    Recent_Name_Array = Recent_Name.split("_").slice(0, 4);
  }
  Dashboardstyle(student_Num, courses_Array, Passed_Num, Recent_Name_Array);
}
function Dashboardstyle(a, b, c, d) {
  let StudentNumberShow = document.getElementById("stdnumshow");
  let StudentPassedShow = document.getElementsByClassName("stdpassshow");
  let CourseDistribution = document.getElementById("course-distri");
  let Recent_Student_Area = document.getElementById("recent-s");
  StudentNumberShow.innerText = a;
  StudentPassedShow[0].innerText = c;
  StudentPassedShow[1].innerText = c;
  // console.log(b);
  if (b[0] || b[1] || b[2]) {
    CourseDistribution.innerHTML =
      " <p class='mb-1 fw-bold'>Course Distribution</p>";
    if (b[0]) {
      let box = document.createElement("P");
      box.className = "mb-0";
      box.innerText = `Web Development:${b[0]}`;
      CourseDistribution.appendChild(box);
      // console.log("Heelo");
    }
    if (b[1]) {
      let box = document.createElement("P");
      box.className = "mb-0";
      box.innerText = `ADCA:${b[1]}`;
      CourseDistribution.appendChild(box);
    }
    if (b[2]) {
      let box = document.createElement("P");
      box.className = "mb-0";
      box.innerText = `Tally:${b[2]}`;
      CourseDistribution.appendChild(box);
    }
  }
  if (d) {
    Recent_Student_Area.innerHTML =
      "<p class='mb-1 fw-bold'>Recent Students</p>";
    let box = document.createElement("P");
    box.className = "mb-0";
    box.innerText = d[0] + "-" + d[1].toUpperCase();
    Recent_Student_Area.appendChild(box);
    // console.log(d[2]);
    if (d[2]) {
      let box = document.createElement("P");
      box.className = "mb-0";
      box.innerText = d[2] + "-" + d[3].toUpperCase();
      Recent_Student_Area.appendChild(box);
    }
  }
}
// Js Tool Work.....................................................................................
let Confirm_Button = document.getElementById("Confirm_btn");

Confirm_Button.addEventListener("click", function () {
  window.confirm("Are Your a Student");
});
let Prompt_Button = document.getElementById("Prompt_btn");
Prompt_Button.addEventListener("click", function () {
  window.prompt("What is your Name");
});
let Print_Button = document.getElementById("Print_btn");
Print_Button.addEventListener("click", function () {
  window.print();
});
// Key Down Work........................................................
document.onkeydown = function (event) {
  // console.log(event);
  let KeyNamesArea = document.getElementById("key-names");
  let KeyCodeArea = document.getElementById("key-code");
  let KeyDecodeArea = document.getElementById("key-decode");
  KeyNamesArea.innerText = event.key;
  KeyCodeArea.innerText = event.code;
  KeyDecodeArea.innerText = event.keyCode;
};
// Online Work........................................................
function CheckNets() {
  // console.log("Heelo");
  let OnlineResult = document.querySelector("#online-box");
  if (navigator.onLine) {
    OnlineResult.innerText = ".Online";
    requestAnimationFrame(CheckNets);
  } else {
    OnlineResult.innerText = ".Offline";
    requestAnimationFrame(CheckNets);
  }
}
requestAnimationFrame(CheckNets);
// Deleteing the Student Data..................................................
function DeleteData() {
  let ParentEle = this.parentElement.parentElement;
  // console.log(ParentEle);
  let Object_data = JSON.parse(ParentEle.getAttribute("stdtable"));
  let confirmation = window.confirm("Are You Sure");
  // alert(confirmation);
  // console.log(Object_data.emailInp);
  if (confirmation) {
    localStorage.removeItem(btoa(Object_data.emailInp) + "_Datum");
    ParentEle.remove();
  }
  // alert("delete");
}
function EditData() {
  let ParentEle = this.parentElement.parentElement;
  let Object_data = JSON.parse(ParentEle.getAttribute("stdtable"));
  // console.log(Object_data);
  for (let keyes in Object_data) {
    let Inputs = document.getElementById(keyes);
    if (Inputs.type === "file") {
      Inputs.files[0] = Object_data[keyes];
      console.log(Inputs.files);
    } else {
      Inputs.value = Object_data[keyes];
    }
  }
}
