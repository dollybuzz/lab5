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
    
    $(".keywordLink").on("click", function(){
        
        //alert($(this).text().trim());
        
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: { 
                "keyword": $(this).text().trim()
            },
            success: function(rows, status) {
                
                $("#favorites").html("");
                rows.forEach(function(row){
                    $("#favorites").append("<img class='image' src='"+row.imageURL+"' width=200 height=200'><br>");
                })
            }
        });//ajax
        
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