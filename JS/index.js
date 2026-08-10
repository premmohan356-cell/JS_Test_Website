let Regis_Btn = document.getElementById("nav_reg_btn");
let InputList = document.querySelectorAll("form input");
let Submit_Button = document.getElementById("RegisFormTag");
Submit_Button.addEventListener("submit", submission);
function submission(event) {
  InputList.forEach((n) => {
    let object_input_data = {};
    object_input_data[n.getAttribute("id")] = n.value;
  });
  console.log(object_input_data);
  event.preventDefault();
}
