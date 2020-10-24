const buttonSend = $('.btnSend');

buttonSend.on('click', () => {
    const data = {
        firstName: $("input[name='firstName']").val(),
        lastName: $("input[name='lastName']").val(),
        email: $("input[name='email']").val(),
        password: $("input[name='password']").val(),
        retryPassword: $("input[name='retryPassword']").val(),
    }

    $.ajax({
        method: 'POST',
        url: "index.php",
        data,
        success: (data) => {
            console.log(data)

            if( data == 'OK' ) {
                $('.form').addClass('d-none');
                $('.notificationError').addClass('d-none');
                $('.container').append('<div class="alert alert-success text-center"> Вы успешно отправили форму </div>');
                $('.container').append('<div class="text-center"><a href="index.html" class="btn btn-success align-items-center"> Вернуться </a></div>');
            } else if( data == 'Error' && !$('div').is('.notificationError') ) {
                $('.form').before('<div class="alert alert-danger text-center notificationError"> Пользователь с такой почтой уже существует </div>')
            }
        }
    })
})