<?php

ini_set("log_errors", "off");
error_reporting(0);

$apiKey = '7531815457:AAH5FSox51lvfZOaeCbNw7N1wvW7f4sA9Ts'; // Replace with your actual API token
$update = json_decode(file_get_contents('php://input'));
$username = isset($update->message->from->first_name) ? $update->message->from->first_name : 'User';
$games_url = 'https://jolly-lebkuchen-2a46e7.netlify.app';
$community = 't.me/salek200'; // Corrected variable name

function LampStack($method, $datas = []) {
    global $apiKey;
    $url = 'https://api.telegram.org/bot' . $apiKey . '/' . $method;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $datas);
    $res = curl_exec($ch);
    if (curl_error($ch)) {
        return json_decode(curl_error($ch));
    } else {
        return json_decode($res);
    }
}

if (isset($update->message)) {
    $msg = isset($update->message->text) ? $update->message->text : '';
    $from_id = $update->message->from->id;
    $message_id = $update->message->message_id;

    if ($msg === '/start') {
        LampStack('sendPhoto', [
            'chat_id' => $from_id,
            'photo' => new CURLFile('home.png'), // Ensure this path is correct
            'caption' => "<b>Hey, $username! welcome </b>\n\nClick on to play @salekbd_bot",
            'parse_mode' => 'HTML',
            'reply_to_message_id' => $message_id,
            'reply_markup' => json_encode([
                'inline_keyboard' => [
                    [['text' => 'Open App 👍', 'web_app' => ['url' => $games_url]]],
                    [['text' => 'Contact Ads', 'url' => $community]]
                ]
            ])
        ]);
    }
}
