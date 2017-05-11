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
              $.each( data.variants, function(variant){
                $('#output').append("<p>Artikel "+variant.number+" wurde gefunden.</p>");
              });
              
            }
            else {
              $('#output').html("<p>Es wurde keine Artikel gefunden.</p>");
            }
        },
        error: function(data)
        {
            alert("returnWarehouses ERROR"+data);
        }
    });
}
