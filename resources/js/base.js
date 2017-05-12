var variationId;

function findVariant(barcode)
{
  $('#load').show();
  $.ajax({
        type: "GET",
        url: "/rest/items/variations",
        headers: {
    			"Authorization": "Bearer "+localStorage.getItem("accessToken")
    		},
        data: {barcode: barcode},
        success: function(data)
        {
            variationId = 0;
            var items = 0;
            var used;
            $('#output').html("");
            if(data.totalsCount == 0)
            {
              $('#output').html("<p class='find-false'>Es wurde keine Artikel gefunden.</p>");
            }
            else
            {
              //Wenn nur ein Artikel gefunden wurde
              data.entries.forEach( function(variant){
                items++;
                used = variant.id;
                $('#output').append("<div class='find-true'><p>Artikel <span id='variant_"+variant.id+"' class='number'>"+variant.number+
                "</span> wurde gefunden. </p><input type='button' variant='"+variant.id+"' class='use_variant btn' value='Ok'></div>");
              });

              if(items == 1)
              {
                variationId = used;
                $('.use_variant').remove();
              }
            }
            $('#load').hide();
        },
        error: function(data)
        {
            console.log(data);
            $('#load').hide();
        }
    });
}


function checkaccess()
{
  //LOGIN SELBER ERMÖGLICHEN UND DIE ROUTE /rest/authorized_user BEKOMMEN
  var access = localStorage.getItem("accessToken");
  if(access === null)
  {
    alert("Bitte melden Sie sich an!");
    window.location = "/plenty/ui";
  }
}

$(document).ready(function(){
  checkaccess();

  $('.use_variant').click( function(){
    alert("Hallo");
  });
});
