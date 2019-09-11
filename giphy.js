

$(document).ready(function() {
    //do on page load
    populateButtons(sweets, 'sweetButton', '#sweetButtons');
});

var sweets = ["tiramisu", "chocolatecake", "applepie", "baklava", "cheesecake", "cupcake", "donuts", "icecream", "macaroon", "gelato", "pudding", "brownies", "carrot cake", "cookies", "gingerbread", "cannoli", "flan", "lemon tarts", "pavlova", "trifle"];

//function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

$(document).on('click', '.sweetButton', function(){
    $('#sweets').empty();
    $('.sweetButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var sweetDiv = $('<div class="sweet-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var sweetImage = $('<img>');
             sweetImage.attr('src', still);
             sweetImage.attr('data-still', still);
             sweetImage.attr('data-animate', animated);
             sweetImage.attr('data-state', 'still')
             sweetImage.addClass('sweetImage');

             sweetDiv.append(p)
             sweetDiv.append(sweetImage)

             $('#sweets').append(sweetDiv);
         }
        
    }); 
});

$(document).on('click', '.sweetImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSweet').on('click', function(){
    var newSweet = $('input').eq(0).val();

    if (newSweet.length > 2){
        sweets.push(newSweet);
    }

    populateButtons(sweets, 'sweetButton', '#sweetButtons');


    return false;

   
});
