$(document).ready(function () {
  $("#regis_btn").click(function () {
    Regis_Btn.click();
  });
  $("#RegisFormTag").on("reset", RestState);
  $("#RegisFormTag").on("submit", RestState);
  function RestState() {
    $("#MarksBoard").html(
      '  <p class="sml-txt text-black mb-1">Total/Percentage</p><span class="fs-2 fw-bold mb-0 pb-0" >0/400</span><br /><span class="fs-2 fw-bold" >0.0%</span>',
    );
    $("#img-preview img").attr("src", "");
    $(Submit_Button).removeAttr("Editing");
  }
});
