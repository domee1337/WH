$(document).ready(function() {

    $('.findPlace').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            findPlace($(this).val());
        }
    });
    $('#menge').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            $('.locationEan').focus();
        }
    });
    $('.back').click(function() {
        $(this).prop("disabled", true);
        $('#output').html("");
        $('.locationEan').val("");
        $('.findArticle').val("");
        $('.locationEan').prop("disabled", true);
        $('.findArticle').removeAttr("disabled");
        $('.findArticle').focus();
    });

    $('.locationEan').bind("keydown", function(e) {
        if (e.keyCode === 13) {
            einbuchen();
        }
    });

});