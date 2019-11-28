$(document).ready(function () {
    
    $(".favoriteIcon").on("click", function(){
        //alert("it works!");
        
        //alert($(this).prev().attr("src"));
        
        var imageURL = $(this).prev().attr("src");
        
        if($(this).attr("src") == "img/favorite.png") {
            $(this).attr("src", "img/favorite_on.png");
            updateFavorite("add", imageURL); //inserts a new record to DB
        } else {
            $(this).attr("src", "img/favorite.png");
            updateFavorite("delete", imageURL); //deletes record from DB
        }
    });
    
    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {"imageURL": imageURL, 
                    "keyword": $("#keywordID").val(), //from results.ejs
                    "action": action
            }
        });//ajax
    }
});