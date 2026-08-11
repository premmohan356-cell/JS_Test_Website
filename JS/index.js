let Regis_Btn = document.getElementById("nav_reg_btn");
let InputList = document.querySelectorAll("form input");
let Submit_Button = document.getElementById("RegisFormTag");
let Image_Input = document.getElementById("imageInp");
let CourseInput = document.getElementById("courseInp");
let MainTableBody = document.getElementById("TabelBodyTag");

let ImgUrl;
// Windowlogn funtion.................................
StudentData();
// Windowlogn funtion.................................

Submit_Button.addEventListener("submit", submission);
function submission(event) {
  event.preventDefault();
  let object_input_data = {};
  InputList.forEach((n) => {
    object_input_data[n.getAttribute("id")] = n.value;
  });
  PutDataStore(object_input_data);
}
// LocalStorage Work......................................................
function PutDataStore(obj) {
  obj["imageInp"] = ImgUrl;
  obj["courseInp"] = CourseInput.value;
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
      console.log(Student_data_object);
      AddStudnentDir(Student_data_object);
    }
  }
}
function AddStudnentDir(database) {
  let totalmarks =
    ((Number(database["comupterMarks"]) +
      Number(database["englishMarks"]) +
      Number(database["mathsMarks"]) +
      Number(database["practicalMarks"])) /
      400) *
    100;
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
  let deleteButton = document.createElement("SPAN");
  deleteButton.className =
    "sml-txt bg-danger bg-opaicty-50 rounded-5 fw-bold p-2 px-4 text-danger-emphasis";
  deleteButton.innerText = "Delete";
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
