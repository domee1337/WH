/**
* Prototype für das datum mit W3C-Format
*/

Date.prototype.toW3CString = function () {
    var year = this.getFullYear();
    var month = this.getMonth();
    month ++;
    if (month < 10) {
        month = '0' + month;
    }
    var day = this.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var hours = this.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    var minutes = this.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var seconds = this.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    var offset = -this.getTimezoneOffset();
    var offsetHours = Math.abs(Math.floor(offset / 60));
    var offsetMinutes = Math.abs(offset) - offsetHours * 60;
    if (offsetHours < 10) {
        offsetHours = '0' + offsetHours;
    }
    if (offsetMinutes < 10) {
        offsetMinutes = '0' + offsetMinutes;
    }
    var offsetSign = '+';
    if (offset < 0) {
        offsetSign = '-';
    }
    return year + '-' + month + '-' + day +
        'T' + hours + ':' + minutes + ':' + seconds +
        offsetSign + offsetHours + ':' + offsetMinutes;
};


/**
* Globale variablen
*/
var variationId;
var warehouses = new Object();

/**
* Funktion die einen Artikel über die Rest-Api anhand eines Barcodes sucht und in der div #output ausgibt
* @param barcode string
*/
function findVariant(barcode)
{

  $('#load').show();
  $('.findArticle').prop("disabled", true);
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
              $('#output').html("<p class='find-false'>Es wurde kein Artikel gefunden.</p>");
              $('.findArticle').removeAttr("disabled");
            }
            else
            {
              $('.back').removeAttr("disabled");
              //Wenn nur ein Artikel gefunden wurde
              data.entries.forEach( function(variant){
                items++;
                used = variant.id;
                number = variant.number;
                if($('#menu_var').text() == "umbuchen")
                {
                  $('#output').append("<div class='find-true'><p>Artikel <span id='variant_"+variant.id+"' class='number'>"+variant.number+
                  "</span> wurde gefunden. </p><input type='button' variant='"+variant.id+"' class='use_variant btn' value='Ok' onclick='usevariant("+variant.id+", true);'></div>");

                }
                else {
                  $('#output').append("<div class='find-true'><p>Artikel <span id='variant_"+variant.id+"' class='number'>"+variant.number+
                  "</span> wurde gefunden. </p><input type='button' variant='"+variant.id+"' class='use_variant btn' value='Ok' onclick='usevariant("+variant.id+");'></div>");

                }
              });

              if(items == 1)
              {
                variationId = used;
                $('#output').html("<div class='find-true'><p>Artikel <span id='variant_"+used+"' class='number'>"+number+
                "</span> wurde ausgewählt</p></div>");

                $('.use_variant').remove();
                $('.locationEan').removeAttr("disabled");
                if($('#menu_var').text() == "umbuchen")
                {
                  //Lagerorte besorgen
                }
                else {
                  menge();
                }

              }
            }
            $('#load').hide();


        },
        error: function(data)
        {
            var json = $.parseJSON(data.responseText);
            $('#output').html("<div class='find-false'><p>PlentyMarkets meldet folgenden Fehler: <br/> ErrorCode: "+json.error.code+" <br/> Message: "+json.error.message+"</p></div>");
            $('.findArticle').removeAttr("disabled");
        }
    });
}
function findPlaces()
{
  $('#lagerorteoutput').html("");
  $.each(warehouses, function(warehouseId, active){
    if(active == "1")
    {
      $.ajax({
            type: "GET",
            url: "/rest/stockmanagement/warehouses/"+warehouseId+"/stock/storageLocations",
            headers: {
        			"Authorization": "Bearer "+localStorage.getItem("accessToken")
        		},
            data: {variationId: variationId},
            success: function(data)
            {
              var html = "<hr></hr><table class='table'><thead><th>LagerortId</th><th>Lagerort</th><th>Menge</th><th>Aktion</th></thead><tbody>";
              var locations = 0;
              $.each(data.entries, function(){
                if(this.quantity > 0)
                {
                locations++;
                var name = getLocationName(warehouseId, this.storageLocationId);
                html = html+"<tr><td>"+this.storageLocationId+"</td><td>"+name+"</td><td>"+this.quantity+"</td><td>Aktion</td></tr>";
                }
              });
              html = html+"</tbody></table>";
              if(locations > 0)
              {
              $("#lagerorteoutput").append(html);
              }
              else {
                $("#lagerorteoutput").html("<div class='find-false'><p>Der Artikel weist in keinen von Ihnen ausgewählten Lagern einen positiven Bestand auf.</p></div>");
              }

            },
            error: function(data)
            {
              console.log(data);
            }
          });
    }
  });
}
function getLocationName(warehouseId, locationId)
{
  var name;
  console.log(warehouseId+locationId);
  $.ajax({
        type: "GET",
        url: "/rest/stockmanagement/warehouses/"+warehouseId+"/management/storageLocations/"+locationId,
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("accessToken")
        },
        success: function(data){
          return data['name'];

        },
        error: function(){
          console.log(data);
        }
      });

}
/**
* Login Funktion über die Rest-Api mit den Plenty-Logindaten
*/
function login()
{
  $('#load').show();
  var username = $('#username').val();
  var password = $('#password').val();
  $.ajax({
        type: "POST",
        url: "/rest/login",
        data: {username: username, password: password},
        success: function(data)
        {
            localStorage.setItem("accessToken", data.accessToken)
	    checkaccess();
            $('#login').fadeOut(250);
            $('#load').fadeOut(100);

        },
        error: function(data)
        {
            alert("Benutername oder Passwort falsch!");
            $('#username').val("");
            $('#password').val("");
            $('#load').fadeOut(100);
        }
    });


}

/**
* Funktion zum logout, derzeit wird nur das LocalStorage geleert, evtl. Logout über die Rest-Api
*/
function logout()
{
  $('#load').fadeIn(100);
	localStorage.removeItem("accessToken");
	location.reload();
}
/**
* Funktion die bestimmt ob die standardisierte menge aktiviert ist
*/
function menge()
{
  $('.back').removeAttr("disabled");
  if($("#standart_menge").is(':checked'))
  {
    $('.locationEan').removeAttr("disabled");
    $('.locationEan').select();
  }
  else {
    $('.locationEan').removeAttr("disabled");
    $('#menge').val("1");
    $('#menge').select();
  }
}
/**
* Funktion die prüft ob der accessToken im LocalStorage gültig ist, wenn nicht erscheint die Login-Maske
*/
function checkaccess()
{

  $.ajax({
        type: "GET",
        url: "/rest/authorized_user",
        headers: {
    			"Authorization": "Bearer "+localStorage.getItem("accessToken")
    		},
        success: function(data)
        {
            $('#realName').text(data.realName);
			$('#names').fadeIn(100);
        },
        error: function(data)
        {
		  $('#names').hide();
          $('#username').val("");
          $('#password').val("")
          $('#login').fadeIn(250);
          $('#username').focus();
        }
    });
}
/**
* Funktion die einen Artikel "benutzt" beim button "Ok" wenn mehrere Artikel gefunden wurden
*/
function usevariant(id, umbuchen = false)
{
    var number = $("#variant_"+id).text();
    $('#output').html("<div class='find-true'>Artikel <span class='number'>"+number+"</span> wurde ausgewählt</div>");
    variationId = id;
    if(umbuchen)
    {
      //Lagerorte besorgen
    }
    else {
      menge();
    }

}
/**
* Funktion die, die Ware beim erfolgreichen scannen über die Rest-Api einbucht
*/
function einbuchen()
{
  $('#load').show();
  var locationean = $('.locationEan').val();
  var x = locationean.split("L");
  var error = 0;
  if (typeof x[1] != 'undefined')
  {
    var xx = x[1].split("S");
  }
  else {
    var x = locationean.split("l");
    if (typeof x[1] != 'undefined')
    {
      var xx = x[1].split("s");
    }
    else {
      error = 1;
    }
  }

  if(error === 0)
  {
    var lager = xx[0];
    if(warehouses[lager] == "1")
    {
    var location = xx[1];
    var qty = $('#menge').val();
    var date = new Date();
    date = date.toW3CString();
    //date = "2017-05-15T03:30:29-04:00";
    var url = "/rest/stockmanagement/warehouses/"+
            lager+"/stock/bookIncomingItems";

    $.ajax({
          type: "PUT",
          url: url,
          headers: {
      			"Authorization": "Bearer "+localStorage.getItem("accessToken")
      		},
          data: { incomingItems: [
            {
                variationId: variationId,
                currency: "EUR",
                reasonId: 101,
                quantity: qty,
                storageLocationId: location,
                deliveredAt: date
            }
          ]},
          success: function(data)
          {
            $('#load').hide();
            $('#output').html("<div class='green'><p>Artikel wurde erfolgreich eingebucht</p></div>");
            $('.locationEan').prop("disabled", true);
            $('.locationEan').val("");
            $('.findArticle').removeAttr("disabled");
            $('.findArticle').select();
          },
          error: function(data)
          {
            $('#load').hide();
            var json = $.parseJSON(data.responseText);
            $('#output').html("<div class='find-false'><p>PlentyMarkets meldet folgenden Fehler: <br/> ErrorCode: "+json.error.code+" <br/> Message: "+json.error.message+"</p></div>");

          }
      });

    }
    else {
      alert("Das von Ihnen gewählte Lager wurde nicht gefunden oder Sie haben es nicht ausgewählt!");
      $('#load').hide();
      $('.locationEan').select();
    }
  }
  else {
    $('#output').html("<div class='find-false'><p>Bitte überprüfen Sie Ihre eingabe!</p></div>");
    $('#load').hide();
    $('.locationEan').select();
  }
}

/**
* Wenn das dokument ready ist
*/
$(document).ready(function(){
  checkaccess();



  /**
  * Button "login" -> funktion login();
  */
  $('#submit').click( function(){
    login();
  });
  /**
  * Input "username" bei enter -> funktion login();
  */
  $('#username').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      login();
    }
  });
  /**
  * Input "password" bei enter -> funktion login();
  */
  $('#password').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      login();
    }
  });
  /**
  * Wenn ein Ajax-Request gestartet wird
  * 1. Ladebalken wird eingeblentet
  * 2. accessToken wird geprüft
  */
  $(document).ajaxStart( function(){
    $('#load').fadeIn(100);
    checkaccess();
  /**
  * Wenn ein Ajax-Request beendet wird
  * Ladebalken wird ausgeblentet
  */
  }).ajaxStop( function(){
    $('#load').fadeOut(100);
  });

  /**
  * Wenn ein Lager ausgewählt wird
  */
  $('.warehousecheckbox').change( function(){

      $('.warehousecheckbox').each( function(){
        var checked = 0;
        if($(this).is(":checked"))
        {
          checked = 1;
        }
        warehouses[$(this).attr('whid')] = new Object();
        warehouses[$(this).attr('whid')] = checked;
      });
  });

  $('.menutip').click( function(){
    window.location = $(this).attr('href');
  });

  //Gets the menu
  $('.menutip[menu='+$('#menu_var').text()+']').removeClass("menutip");
});
