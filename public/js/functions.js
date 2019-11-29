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
                rows.forEach(function(row, i){
                    if (i%4==0)
                    {
                        $("#favorites").append("<br>"); //adding a break for every 4 images
                    }
                    $("#favorites").append("<img class='image' src='"+row.imageURL+"' width=150 height=150'><img class='favoritePageIcon' src='img/favorite_on.png' width=20 height=20>");
                    //added the heart icon dynamically with the page population
                    
                });//for each
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
    
    //dynamic event listener for favorite icon, does not allow to re-favorite an image
    $(document).on("click", ".favoritePageIcon", function(){
        //alert("this worked!");
        //alert($(this).prev().attr("src"));
        
        var imageURL = $(this).prev().attr("src");
        if($(this).attr("src", "img/favorite_on.png"))
        {
            $(this).attr("src", "img/favorite.png");
            updateFavorite("delete", imageURL); //deletes record from DB
        }
    });
    
});

