// ==========================================
// SkillConnect Authentication
// ==========================================


// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const department = document.getElementById("department").value;
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        // Check password
        if (password.length < 6) {

            message.textContent =
                "Password must contain at least 6 characters.";

            message.className = "message error";

            return;
        }


        // Check confirm password
        if (password !== confirmPassword) {

            message.textContent =
                "Passwords do not match.";

            message.className = "message error";

            return;
        }


        // Check existing user
        const existingUser =
            JSON.parse(localStorage.getItem("studentUser"));

        if (existingUser &&
            existingUser.email === email) {

            message.textContent =
                "An account with this email already exists.";

            message.className = "message error";

            return;
        }


        // Create user object
        const user = {

            name: name,

            email: email,

            department: department,

            password: password,

            skills: [],

            certifications: [],

            applications: []

        };


        // Save user
        localStorage.setItem(
            "studentUser",
            JSON.stringify(user)
        );


        message.textContent =
            "Account created successfully! Redirecting...";

        message.className = "message success";


        // Redirect to login
        setTimeout(function () {

            window.location.href = "login.html";

        }, 1500);

    });
}



// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        // Get registered user
        const user =
            JSON.parse(localStorage.getItem("studentUser"));


        if (!user) {

            message.textContent =
                "No account found. Please register first.";

            message.className = "message error";

            return;
        }


        // Validate login
        if (
            email === user.email &&
            password === user.password
        ) {

            // Save login status
            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            message.textContent =
                "Login successful! Redirecting...";

            message.className =
                "message success";


            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        } else {

            message.textContent =
                "Invalid email or password.";

            message.className =
                "message error";
        }

    });
}