<?php
date_default_timezone_set("Europe/Moscow");
$arrayUsers = [
    [
        'id' => 1,
        'name' => 'Sad1',
        'email' => 'test1@mail.ru'
    ],
    [
        'id' => 2,
        'name' => 'Sad2',
        'email' => 'test2@mail.ru'
    ],
    [
        'id' => 3,
        'name' => 'Sad3',
        'email' => 'test3@mail.ru'
    ],
    [
        'id' => 4,
        'name' => 'Sad4',
        'email' => 'test4@mail.ru'
    ],
    [
        'id' => 5,
        'name' => 'Sad5',
        'email' => 'test5@mail.ru'
    ]
];

function writeLog($str) {
    $log = date('Y-m-d H:i:s', time()) . $str;
    file_put_contents(__DIR__ . '/log.txt', $log . PHP_EOL, FILE_APPEND);
}

$email = $_POST['email'];
if(!strpos($email, '@')) {
    writeLog(" Введена некорректная почта $email (обошли валидацию на фронте)");
    echo "Error: incorrect email";
    exit();
}

if($_POST['password'] != $_POST['retryPassword']) {
    writeLog(" Пароли не совпадают. (обошли валидацию на фронте)");
    echo "Error: passwords don't match";
    exit();
}

$flag = TRUE;

foreach($arrayUsers as $user) {
    if($email == $user['email']) {
        $flag = FALSE;
    }
}

if($flag) {
    writeLog(" Успешная отправка формы с почтой $email");
    echo "OK";
    exit();
} else {
    writeLog(" Учетная запись с почтой $email уже существует");
    echo "Error";
    exit();
}