document.getElementById("signinForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = { username, email, password };

    // บันทึกข้อมูลลงใน Firestore
    db.collection("users").add(userData)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            localStorage.setItem("userData", JSON.stringify(userData));
            alert("สมัครสมาชิกสำเร็จ!");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
});
