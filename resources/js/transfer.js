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

  $('.umbuchenbutton').click( function(){
    $("#lagerorteoutput").hide();
    $('#selectedoutput').show();
    var warehouseId = $(this).attr('wid');
    usedwarehouse = warehouseId;
    var warehousename = $(this).attr('wname');
    var locationId = $(this).attr('sid');
    usedlocation = locationId;
    var locationname = $('.place[sid='+locationId+']').text();
    var quantity = $(this).attr('qty');
    var html = "<p>Ausgewählter Datensatz: </p><table class='table'><th>Lager</th><th>Lagerort</th><th>Menge</th>"+
      "<tr><td>"+warehousename+"</td>"+
      "<td>"+locationname+"</td>"+
      "<td>"+quantity+"</td></table><input type='button' class='umbuchenzurueck btn' value='Zurück'>";
    $('#selectedoutput').html(html);
    menge();
  });
});
