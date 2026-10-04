// ==========================================
// SkillConnect Profile
// ==========================================


// Check Login

if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "login.html";

}


// Get User

let user =
    JSON.parse(localStorage.getItem("studentUser"));


// If user doesn't exist

if (!user) {

    window.location.href = "register.html";

}


// Load Existing Data

function loadProfile() {

    document.getElementById("profileName").value =
        user.name || "";

    document.getElementById("profileEmail").value =
        user.email || "";

    document.getElementById("profileDepartment").value =
        user.department || "";

    document.getElementById("phone").value =
        user.phone || "";

    document.getElementById("dob").value =
        user.dob || "";

    document.getElementById("gender").value =
        user.gender || "";

    document.getElementById("college").value =
        user.college || "";

    document.getElementById("year").value =
        user.year || "";

    document.getElementById("cgpa").value =
        user.cgpa || "";

    document.getElementById("bio").value =
        user.bio || "";


    displaySkills();

    displayCertificates();

}


// Save Profile

document
    .getElementById("profileForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        user.name =
            document.getElementById("profileName").value.trim();

        user.phone =
            document.getElementById("phone").value.trim();

        user.dob =
            document.getElementById("dob").value;

        user.gender =
            document.getElementById("gender").value;

        user.department =
            document.getElementById("profileDepartment").value;

        user.college =
            document.getElementById("college").value.trim();

        user.year =
            document.getElementById("year").value;

        user.cgpa =
            document.getElementById("cgpa").value;

        user.bio =
            document.getElementById("bio").value.trim();


        // Save updated user

        localStorage.setItem(
            "studentUser",
            JSON.stringify(user)
        );


        const message =
            document.getElementById("profileMessage");

        message.textContent =
            "Profile saved successfully! ✓";


        setTimeout(function () {

            message.textContent = "";

        }, 2500);

    });


// ==========================================
// SKILLS
// ==========================================

function addSkill() {

    const input =
        document.getElementById("skillInput");

    const skill =
        input.value.trim();


    if (skill === "") {

        alert("Please enter a skill.");

        return;
    }


    if (!user.skills) {

        user.skills = [];

    }


    // Prevent duplicate skill

    if (
        user.skills.some(
            item => item.toLowerCase() === skill.toLowerCase()
        )
    ) {

        alert("This skill is already added.");

        return;
    }


    user.skills.push(skill);


    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );


    input.value = "";

    displaySkills();
}


// Display Skills

function displaySkills() {

    const list =
        document.getElementById("skillsList");

    list.innerHTML = "";


    if (!user.skills || user.skills.length === 0) {

        list.innerHTML =
            "<p style='color:#64748b;'>No skills added yet.</p>";

        return;
    }


    user.skills.forEach(function (skill, index) {

        const item =
            document.createElement("div");

        item.className = "item";

        item.innerHTML = `
            ${skill}

            <button
                class="delete-item"
                onclick="deleteSkill(${index})">
                ×
            </button>
        `;

        list.appendChild(item);

    });

}


// Delete Skill

function deleteSkill(index) {

    user.skills.splice(index, 1);

    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );

    displaySkills();
}


// ==========================================
// CERTIFICATIONS
// ==========================================

function addCertificate() {

    const input =
        document.getElementById("certificateInput");

    const certificate =
        input.value.trim();


    if (certificate === "") {

        alert("Please enter a certification.");

        return;
    }


    if (!user.certifications) {

        user.certifications = [];

    }


    user.certifications.push(certificate);


    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );


    input.value = "";

    displayCertificates();
}


// Display Certificates

function displayCertificates() {

    const list =
        document.getElementById("certificatesList");

    list.innerHTML = "";


    if (
        !user.certifications ||
        user.certifications.length === 0
    ) {

        list.innerHTML =
            "<p style='color:#64748b;'>No certifications added yet.</p>";

        return;
    }


    user.certifications.forEach(
        function (certificate, index) {

            const item =
                document.createElement("div");

            item.className = "item";

            item.innerHTML = `
                ${certificate}

                <button
                    class="delete-item"
                    onclick="deleteCertificate(${index})">
                    ×
                </button>
            `;

            list.appendChild(item);

        }
    );

}


// Delete Certificate

function deleteCertificate(index) {

    user.certifications.splice(index, 1);

    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );

    displayCertificates();
}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}


// Load Profile

loadProfile();