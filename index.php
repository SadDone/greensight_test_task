<?php

$temp = [
    ['Sad', 'Akh', 'test@mail.ru', '222', '333'],
    ['Sad', 'Akh', 'test2@mail.ru', '222', '333'],
    ['Sad', 'Akh', 'test3@mail.ru', '222', '333'],
    ['Sad', 'Akh', 'test4@mail.ru', '222', '333'],
    ['Sad', 'Akh', 'test5@mail.ru', '222', '333'],
];

$flag = TRUE;

foreach($temp as $item) {
    if(in_array($_POST['email'], $item)) {
        $flag = FALSE;
    }
}

if($flag) {
    echo "OK";
} else {
    echo "Error";
}


//echo json_encode($temp);