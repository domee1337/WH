$(document).ready(function() {

    $('.findPlace').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            findPlace($(this).val());
        }
    });
    $('#menge').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            var variationId = $('#menge').attr("variationId");
            var number = $('#menge').attr("number");
            var menge = $(this).val();
            incoming[variationId] = new Object();
            incoming[variationId] = [number, menge];
            refreshstatus();
        }
    });
    $('.back').click(function() {
        $(this).prop("disabled", true);
        $('#output').html("");
        $('#status').html("");
        $('#output_place').html("");
        $('#articleean').val("");
        $('.findPlace').val("");
        $('#articleean').prop("disabled", true);
        $('.findPlace').removeAttr("disabled");
        $('.findPlace').focus();
    });

    $('#articleean').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            findVariant($(this).val(), false, true);
        }
    });

});