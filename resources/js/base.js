function findVariant(barcode)
{
  $.ajax({
        type: "GET",
        url: "warehouse/calls/findArticle",
        data: {barcode: barcode},
        success: function(data)
        {
            data = $.parseJSON(data);
            if(data.valid)
            {
              $('#output').html("");
              data.variants.forEach( function(variant){
                $('#output').append("<p class='find-true'>Artikel "+variant.number+" wurde gefunden.</p>");
              });

            }
            else {
              $('#output').html("<p class='find-false'>Es wurde keine Artikel gefunden.</p>");
            }
        },
        error: function(data)
        {
            alert("returnWarehouses ERROR"+data);
        }
    });
}
