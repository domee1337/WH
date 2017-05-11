function findVariant(barcode)
{
  $.ajax({
        type: "GET",
        url: "/rest/items/variations",
        headers: {
    			"Authorization": "Bearer "+localStorage.getItem("accessToken")
    		},
        data: {barcode: barcode},
        success: function(data)
        {
            if(data.totalsCount == 0)
            {
              $('#output').html("<p class='find-false'>Es wurde keine Artikel gefunden.</p>");
            }
            else if(data.totalCount == 1)
            {
              //Wenn nur ein Artikel gefunden wurde
              data.entries.forEach( function(variant){
                $('#output').append("<p class='find-true'>Artikel "+variant.number+" wurde gefunden.</p>");
              });
            }
            else {
              //Artikel wurden gefunden
              data.entries.forEach( function(variant){
                $('#output').append("<p class='find-true'>Artikel "+variant.number+" wurde gefunden.</p>");
              });
            }
        },
        error: function(data)
        {
            alert(data);
        }
    });
}


function checkaccess()
{
  var access = localStorage.getItem("accessToken");
  if(access === undefined)
  {
    alert("Bitte melden Sie sich an!");
    window.location = "/plenty/ui";
  }
}

$(document).ready(function(){
  checkaccess();
});
