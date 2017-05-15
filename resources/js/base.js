var variationId;

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
              $('#output').html("<p class='find-false'>Es wurde keine Artikel gefunden.</p>");
              $('.findArticle').removeAttr("disabled");
            }
            else
            {
              //Wenn nur ein Artikel gefunden wurde
              data.entries.forEach( function(variant){
                items++;
                used = variant.id;
                number = variant.number;
                $('#output').append("<div class='find-true'><p>Artikel <span id='variant_"+variant.id+"' class='number'>"+variant.number+
                "</span> wurde gefunden. </p><input type='button' variant='"+variant.id+"' class='use_variant btn' value='Ok' onclick='usevariant("+variant.id+");'></div>");
              });

              if(items == 1)
              {
                variationId = used;
                $('#output').html("<div class='find-true'><p>Artikel <span id='variant_"+used+"' class='number'>"+number+
                "</span> wurde ausgewählt</p></div>");

                $('.use_variant').remove();
                $('.locationEan').removeAttr("disabled");
                menge();
              }
            }
            $('#load').hide();


        },
        error: function(data)
        {
            console.log(data);
            $('#load').hide();
            $('.findArticle').removeAttr("disabled");
        }
    });
}

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
            $('#login').hide();
            $('#load').hide();
        },
        error: function(data)
        {
            alert("Benutername oder Passwort falsch!");
            $('#username').val("");
            $('#password').val("");
            $('#load').hide();
        }
    });


}

function menge()
{
  if($("#standart_menge").is(':checked'))
  {
    $('.locationEan').removeAttr("disabled");
    $('.locationEan').select();
  }
  else {
    $('#menge').val("1");
    $('#menge').select();
  }
}

function checkaccess()
{

  $.ajax({
        type: "GET",
        url: "/rest/authorized_user",
        headers: {
    			"Authorization": "Bearer "+localStorage.getItem("accessToken")
    		},
        error: function(data)
        {
          $('#username').val("");
          $('#password').val("")
          $('#login').show();
          $('#username').focus();
        }
    });
  //LOGIN SELBER ERMÖGLICHEN UND DIE ROUTE /rest/authorized_user BEKOMMEN
}

function usevariant(id)
{
    var number = $("#variant_"+id).text();
    $('#output').html("<div class='find-true'>Artikel <span class='number'>"+number+"</span> wurde ausgewählt</div>");
    variationId = id;
    menge();
}
$(document).ready(function(){
  checkaccess();




  $('#submit').click( function(){
    login();
  });

  $('#username').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      login();
    }
  });

  $('#password').bind("keydown", function(e)
  {
    if(e.keyCode === 13)
    {
      login();
    }
  });
  $('.back').click( function(){
    $('#output').html("");
    $('.locationEan').val("");
    $('.findArticle').val("");
    $('.locationEan').prop("disabled", true);
    $('.findArticle').removeAttr("disabled");
    $('.findArticle').focus();
  });

});
