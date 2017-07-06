function umbuchenbutton(id)
{
    $("#lagerorteoutput").hide();
    $('#selectedoutput').show();
    var warehouseId = $("#umbuchen_"+id).attr('wid');
    usedwarehouse = warehouseId;
    var warehousename = $("#umbuchen_"+id).attr('wname');
    var locationId = $("#umbuchen_"+id).attr('sid');
    usedlocation = locationId;
    var locationname = $('.place[sid='+locationId+']').text();
    var quantity = $("#umbuchen_"+id).attr('qty');
    var html = "<p>Ausgewählter Datensatz: </p><table class='table'><th>Lager</th><th>Lagerort</th><th>Menge</th>"+
      "<tr><td>"+warehousename+"</td>"+
      "<td>"+locationname+"</td>"+
      "<td>"+quantity+"</td></table><input type='button' class='umbuchenzurueck btn' value='Zurück' onclick='umbuchenzurueck();'>";
    $('#selectedoutput').html(html);
    menge();

}

function umbuchenzurueck()
{
  $("#lagerorteoutput").show();
  $('#selectedoutput').hide();
  $('#lagerortean').prop("disabled", true);
}

function umbuchen()
{
  console.log(usedwarehouse+"@"+usedlocation);
}
$(document).ready( function(){

  $('.findArticle').bind("keydown", function(e)
	{
        if (e.keyCode === 13)
		      {
            var result = findVariant($(this).val());
          }
  });

  $('#menge').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      $('.locationEan').focus();
    }
  });
  $('.back').click( function(){
    $(this).prop("disabled", true);
    $('.output').html("");
    $('.locationEan').val("");
    $('.findArticle').val("");
    $('.locationEan').prop("disabled", true);
    $('.findArticle').removeAttr("disabled");
    $('.findArticle').focus();
  });

  $('.locationEan').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      umbuchen();
    }
  });


});
