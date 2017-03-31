function returnWarehouses()
{
  $.ajax({
        type: "GET",
        url: "calls/warehouses",
        success: function(data)
        {
            $.each(data, function(){
              $('#wh').append(
                '<label>'+
                '   <input type="checkbox" class="warehousecheckbox" whid="'+this.id+'" >'+this.name+
                '&nbsp;</label>'
              );
            });
        },
        error: function(data)
        {
            alert("returnWarehouses ERROR"+data);
        }
    });
}
