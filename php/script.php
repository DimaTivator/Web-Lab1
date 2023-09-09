<?php
date_default_timezone_set('Europe/Moscow');

function isPointInArea($x, $y, $r): bool {
    if ($x >= 0 && $y >= 0) {
        return $x <= $r && $y <= $r / 2;
    }

    if ($x >= 0 && $y <= 0) {
        return $x * $x + $y * $y <= $r * $r / 4;
    }

    if ($x <= 0 && $y <= 0) {
        return $x + $y <= $r;
    }

    return false;
}

function isValid($x, $y, $r): bool {
    if (!is_numeric($x)) {
        return false;
    }
    if (!is_numeric($y)) {
        return false;
    }
    if (!is_numeric($r)) {
        return false;
    }

    $x = floatval($x);
    $y = floatval($y);
    $r = floatval($r);

    $y_values = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
    $r_values = [1, 1.5, 2, 2.5, 3];

    return -3 <= $x && $x <= 3 && in_array($y, $y_values) && in_array($r, $r_values);
}

if (!isset($_SESSION['results'])) {
    $_SESSION['results'] = array();
}

// Получаем значения X, Y и R из GET запроса
if (isset($_GET['X']) && isset($_GET['Y']) && isset($_GET['R'])) {

    $x = $_GET['X'];
    $y = $_GET['Y'];
    $r = $_GET['R'];

    if (!isValid($x, $y, $r)) {
        trigger_error("Incorrect data", 400);
    }

    $x = floatval($x);
    $y = floatval($y);
    $r = floatval($r);

    $startTime = microtime(true);

    $result = isPointInArea($x, $y, $r) ? "Yes" : "No";

    $endTime = microtime(true);

    $executionTime = $endTime - $startTime;

    $response = '<tr>';
    $response .= '<td>' . $x . '</td>';
    $response .= '<td>' . $y . '</td>';
    $response .= '<td>' . $r . '</td>';
    $response .= '<td>' . $result . '</td>';
    $response .= '<td>' . date('H:i:s') . '</td>';
    $response .= '<td>' . number_format($executionTime, 8) . '</td>';
    $response .= '</tr>';


    echo $response;
}

