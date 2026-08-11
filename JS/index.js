let Regis_Btn = document.getElementById("nav_reg_btn");
let InputList = document.querySelectorAll("form input");
let Submit_Button = document.getElementById("RegisFormTag");
let Image_Input = document.getElementById("imageInp");
let CourseInput = document.getElementById("courseInp");
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
  let MainTableBody = document.getElementById("TabelBodyTag");
  let table_row = document.createElement("TR");
  let table_data1 = document.createElement("TD");
  // ..................................................
  table_data1.className = "d-flex flex-column";
  let S_Name = document.createElement("SPAN");
  S_Name.innerText = database["nameInp"];
  let S_email = document.createElement("SPAN");
  S_email.className = "sml-txt";
  S_email.innerText = database["emailInp"];
  // ..................................................

  let table_data2 = document.createElement("TD");
  table_data2.className = "pt-3";
  table_data2.innerText = database["mobileInp"];
  let table_data3 = document.createElement("TD");
  table_data2.className = "pt-3";
  table_data2.innerText = database["courseInp"];
}
