$('.btnSend').on('click', () => {
    let validateFlag = true;

    $('.notificationError').remove(); // удаляем все выводы ошибок, перепроверяем и отрисовываем снова

    if( $("input[name='email']").val().indexOf('@') == -1 ) { // проверяем корректность ввода почты
        validateFlag = false;
        $('.form').before('<div class="alert alert-danger text-center notificationError incorrectEmail"> Некорректный ввод почты </div>');
    }

    if( $("input[name='password']").val() != $("input[name='retryPassword']").val() ) { // проверяем пароли
        validateFlag = false;
        $('.form').before('<div class="alert alert-danger text-center notificationError passwordMatch"> Пароли не совпадают </div>');
    }

    if(validateFlag) {
        const data = {
            firstName: $("input[name='firstName']").val().trim(),
            lastName: $("input[name='lastName']").val().trim(),
            email: $("input[name='email']").val().trim(),
            password: $("input[name='password']").val().trim(),
            retryPassword: $("input[name='retryPassword']").val().trim(),
        }

        $.ajax({
            method: 'POST',
            url: "index.php",
            data,
            success: (data) => {
                console.log(data)
    
                switch(data) { // в зависимости от ответа выводим ошибку
                    case "OK":
                        $('.form').addClass('d-none');
                        $('.notificationError').addClass('d-none');
                        $('.container').append('<div class="alert alert-success text-center"> Вы успешно отправили форму </div>');
                        $('.container').append('<div class="text-center"><a href="index.html" class="btn btn-success align-items-center"> Вернуться </a></div>');
                        break;
                    case "Error":
                        if(!$('div').is('.emailExists')) {
                            $('.form').before('<div class="alert alert-danger text-center notificationError emailExists"> Пользователь с такой почтой уже существует </div>');
                        }
                        break;
                    case "Error: incorrect email":
                        if(!$('div').is('.incorrectEmail')) {
                            $('.form').before('<div class="alert alert-danger text-center notificationError incorrectEmail"> Некорректный ввод почты </div>');
                        }
                        break;
                    case "Error: passwords don't match":
                        if(!$('div').is('.passwordMatch')) {
                            $('.form').before('<div class="alert alert-danger text-center notificationError passwordMatch"> Пароли не совпадают </div>');
                        }
                        break;
                }
            }
        })
    }
})