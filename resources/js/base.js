function returnWarehouses()
{
  $.ajax({
        type: "GET",
        url: "/calls/warehouses",
        success: function(data)
        {
            var data = jQuery.parseJSON( data );
            $.each(data, function(){
              $('#wh').append(
                '<p>'+this.name1+'</p>'
              );
            });
        },
        error: function(data)
        {
            alert("returnWarehouses ERROR");
        }
    });
}
