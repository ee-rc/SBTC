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
// ดึงข้อมูลสินค้า
db.collection("products").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="buy-button" onclick="orderProduct('${product.name}', ${product.price})">BUY</button>
            `;
            document.querySelector(".product-list").appendChild(productCard);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
