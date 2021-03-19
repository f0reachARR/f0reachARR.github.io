Object.defineProperty(window, '青春', {
    get: function () {
        console.error('そんなものはない');
        return undefined;
    }
});

var recaptchaOk = false;

function applyDisable() {
    var ok = recaptchaOk;
    $('#from, #email, #message').each(function (i, elem) {
        if ($(elem).val().length === 0)
            ok = false;
    });
    $('#submit').prop('disabled', !ok);
}

function reCaptchaOk() {
    recaptchaOk = true;
    applyDisable();
}

$(function () {
    $('#from, #email, #message').keyup(function () {
        applyDisable();
    });
    $('form.body').submit(function (e) {
        e.preventDefault();
        $('#submit').prop('disabled', true);
        $.ajax({
            type: 'POST',
            url: 'https://us-central1-f0reach-207313.cloudfunctions.net/send-contact',
            data: $(this).serialize()
        }).done(function () {
            $('.status.success').fadeIn(100);
            setTimeout(function () {
                $('#send-email').addClass('hide');
                $('.status.success').hide();
                $('#submit').prop('disabled', false);
            }, 500);
        }).fail(function () {
            $('.status.error').fadeIn(100);
            setTimeout(function () {
                $('.status.error').fadeOut(100);
                $('#submit').prop('disabled', false);
            }, 1000);
        });
        return false;
    });
    $('#send-email').click(function (e) {
        if ($(e.target).attr('id') === 'send-email')
            $('#send-email').addClass('hide');
    });
    $('#sendmail').click(function (e) {
        e.preventDefault();
        $('#send-email').removeClass('hide');
    });
});