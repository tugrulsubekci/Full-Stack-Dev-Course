$("h1").css("color","red");

$("button").click(function () {
    $("h1").css("color","blue");
})

$("input").keydown(function (e) { 
    $("h1").text($("input").val());
});