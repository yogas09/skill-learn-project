// ==========================================
// SkillConnect Admin Login
// ==========================================

const adminLoginForm =
    document.getElementById("adminLoginForm");


adminLoginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const username =
            document
                .getElementById("adminUsername")
                .value
                .trim();


        const password =
            document
                .getElementById("adminPassword")
                .value;


        const error =
            document.getElementById(
                "loginError"
            );


        // DEMO ADMIN CREDENTIALS

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            window.location.href =
                "admin.html";

        }

        else {

            error.textContent =
                "Invalid username or password.";

        }

    }
);