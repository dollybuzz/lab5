$(document).ready(function () {
    
    $(".favoriteIcon").on("click", function(){
        //alert("it works!");
        alert($(this).prev().attr("src"));
        if($(this).attr("src") == "img/favorite.png") {
            $(this).attr("src", "img/favorite_on.png");
        } else {
            $(this).attr("src", "img/favorite.png");
        }
    });
});