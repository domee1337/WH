function findVariant(barcode)
{
  $.ajax({
        type: "GET",
        url: "calls/findVariant",
        data: {barcode: barcode},
        success: function(data)
        {
            if(data.valid)
            {
              $('#output').html("<p>Artikel "+data.number+" wurde gefunden.</p>");
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
