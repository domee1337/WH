function returnWarehouses()
{
  $.ajax({
        type: "GET",
        url: "calls/warehouses",
        success: function(data)
        {
            $.each(data, function(){
              $('#wh').append(
                '<input type="checkbox" class="warehousecheckbox" whid="'+this.id+'" ><p>'+this.name+'</p>'
              );
            });
        },
        error: function(data)
        {
            alert("returnWarehouses ERROR");
        }
    });
}
