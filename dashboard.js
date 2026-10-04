// ==========================================
// SkillConnect Dashboard
// ==========================================


// Check Login

const isLoggedIn =
    localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    window.location.href = "login.html";

}


// Get Student Data

const user =
    JSON.parse(localStorage.getItem("studentUser"));


// If User Exists

if (user) {

    // Welcome Name

    document.getElementById("studentName")
        .textContent = user.name;


    // Summary

    document.getElementById("summaryName")
        .textContent = user.name;

    document.getElementById("summaryEmail")
        .textContent = user.email;

    document.getElementById("summaryDepartment")
        .textContent = user.department;


    // Skills Count

    const skills = user.skills || [];

    document.getElementById("skillCount")
        .textContent = skills.length;


    // Certificates Count

    const certificates =
        user.certifications || [];

    document.getElementById("certificateCount")
        .textContent = certificates.length;


    // Applications Count

    const applications =
        user.applications || [];

    document.getElementById("applicationCount")
        .textContent = applications.length;


    // Profile Status

    const profileStatus =
        document.getElementById("profileStatus");

    if (
        user.name &&
        user.email &&
        user.department
    ) {

        profileStatus.textContent =
            "Completed";

        profileStatus.style.color =
            "#16a34a";

    } else {

        profileStatus.textContent =
            "Incomplete";

        profileStatus.style.color =
            "#dc2626";
    }

}


// Logout Function

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}