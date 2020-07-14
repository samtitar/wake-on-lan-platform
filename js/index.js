$(function() {
    $('#login').click(function() {
        var password = $('#password').val();

        $(".footer").animate({ height: '110%' }, 500, function() {
            window.location.href = '/systems.html';
        });
    });
})