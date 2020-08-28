$(function() {
    $('#login').click(function() {
        var password = $('#password').val();

        $.post('/login', { 'password': password }, function(result) {
            if (result['success'] == true) {
                $(".footer").animate({ height: '110%' }, 500, function() {
                    window.location.href = '/systems';
                });
            } else {
                $('#message').html('Wrong password');
            }
        });
    });
})