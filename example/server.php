<?php

usleep(500000);

http_response_code(422);

header('Content-Type: application/json');

echo json_encode([
    'username' => ['The username field is required.'],
    'password' => ['The password field is required.'],
]);
