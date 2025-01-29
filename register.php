<?php
// ตั้งค่าการเชื่อมต่อกับฐานข้อมูล
$host = 'localhost';
$dbname = 'user_system';
$user = 'root';
$pass = '';

// เชื่อมต่อกับฐานข้อมูล
$conn = new mysqli($host, $user, $pass, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// รับข้อมูลจากฟอร์ม
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// เข้ารหัสรหัสผ่าน
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// เตรียมคำสั่ง SQL
$sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $hashed_password);

// บันทึกข้อมูล
if ($stmt->execute()) {
    echo "ลงทะเบียนสำเร็จ!";
    header("Location: login.html");
} else {
    echo "เกิดข้อผิดพลาด: " . $conn->error;
}

// ปิดการเชื่อมต่อ
$stmt->close();
$conn->close();
?>
