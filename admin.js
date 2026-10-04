```javascript
// ==========================================
// SkillConnect - Admin Dashboard
// ==========================================


// ==========================================
// 1. ADMIN ACCESS CHECK
// ==========================================

if (localStorage.getItem("adminLoggedIn") !== "true") {

    window.location.href = "admin-login.html";

}


// ==========================================
// 2. GET STUDENT DATA
// ==========================================

let user = JSON.parse(
    localStorage.getItem("studentUser")
);


// If no student is registered

if (!user) {

    user = {
        name: "No Student",
        email: "-",
        department: "-",
        skills: [],
        certifications: [],
        applications: []
    };

}


// ==========================================
// 3. GET APPLICATIONS
// ==========================================

let applications = user.applications || [];


// ==========================================
// 4. TOTAL AVAILABLE JOBS
// ==========================================

// Currently we have 8 demo jobs
const totalJobs = 8;


// ==========================================
// 5. UPDATE DASHBOARD STATISTICS
// ==========================================

function updateStatistics() {

    const totalApplications =
        applications.length;


    const pendingApplications =
        applications.filter(
            function (application) {

                return (
                    application.status === "Pending"
                );

            }
        ).length;


    const selectedApplications =
        applications.filter(
            function (application) {

                return (
                    application.status === "Selected"
                );

            }
        ).length;


    const rejectedApplications =
        applications.filter(
            function (application) {

                return (
                    application.status === "Rejected"
                );

            }
        ).length;


    // Student count

    document.getElementById(
        "studentCount"
    ).textContent =
        user.name !== "No Student" ? "1" : "0";


    // Job count

    document.getElementById(
        "jobCount"
    ).textContent =
        totalJobs;


    // Application count

    document.getElementById(
        "applicationCount"
    ).textContent =
        totalApplications;


    // Pending count

    document.getElementById(
        "pendingCount"
    ).textContent =
        pendingApplications;

}


// ==========================================
// 6. DISPLAY APPLICATIONS
// ==========================================

function displayApplications() {

    const table =
        document.getElementById(
            "applicationsTable"
        );


    const emptyMessage =
        document.getElementById(
            "noApplications"
        );


    // Clear old table data

    table.innerHTML = "";


    // No applications

    if (applications.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    // Create table row for every application

    applications.forEach(
        function (application, index) {

            const row =
                document.createElement("tr");


            // Default status

            const status =
                application.status || "Pending";


            // Status CSS

            let statusClass =
                "status-pending";


            if (status === "Selected") {

                statusClass =
                    "status-selected";

            }


            else if (status === "Rejected") {

                statusClass =
                    "status-rejected";

            }


            // Action buttons

            let actionHTML = "";


            if (status === "Pending") {

                actionHTML = `

                    <div class="action-buttons">

                        <button
                            class="action-btn select-btn"
                            onclick="updateStatus(${index}, 'Selected')">

                            ✓ Select

                        </button>


                        <button
                            class="action-btn reject-btn"
                            onclick="updateStatus(${index}, 'Rejected')">

                            ✕ Reject

                        </button>

                    </div>

                `;

            }


            else {

                actionHTML = `

                    <span style="color:#94a3b8;">
                        Completed
                    </span>

                `;

            }


            // Create row

            row.innerHTML = `

                <td class="student-name-cell">
                    ${user.name || "-"}
                </td>


                <td>
                    ${user.email || "-"}
                </td>


                <td>
                    ${application.jobTitle || "-"}
                </td>


                <td>
                    ${application.company || "-"}
                </td>


                <td>
                    ${application.appliedDate || "-"}
                </td>


                <td>

                    <span
                        class="status-badge ${statusClass}">

                        ${status}

                    </span>

                </td>


                <td>
                    ${actionHTML}
                </td>

            `;


            table.appendChild(row);

        }
    );

}


// ==========================================
// 7. UPDATE APPLICATION STATUS
// ==========================================

function updateStatus(
    index,
    newStatus
) {

    // Check application

    if (!applications[index]) {

        alert(
            "Application not found."
        );

        return;

    }


    const application =
        applications[index];


    // Confirmation

    const confirmMessage =
        `Are you sure you want to mark "${application.jobTitle}" as ${newStatus}?`;


    const confirmed =
        confirm(confirmMessage);


    if (!confirmed) {

        return;

    }


    // Update status

    application.status =
        newStatus;


    // Update user object

    user.applications =
        applications;


    // Save to localStorage

    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );


    // Refresh data

    applications =
        user.applications || [];


    updateStatistics();

    displayApplications();


    // Success message

    alert(
        `Application status updated to ${newStatus}.`
    );

}


// ==========================================
// 8. DISPLAY STUDENT INFORMATION
// ==========================================

function displayStudent() {

    const studentName =
        document.getElementById(
            "studentName"
        );


    const studentEmail =
        document.getElementById(
            "studentEmail"
        );


    const studentDepartment =
        document.getElementById(
            "studentDepartment"
        );


    const studentSkills =
        document.getElementById(
            "studentSkills"
        );


    const studentCertificates =
        document.getElementById(
            "studentCertificates"
        );


    // Name

    studentName.textContent =
        user.name || "No Student";


    // Email

    studentEmail.textContent =
        user.email || "-";


    // Department

    studentDepartment.textContent =
        user.department || "Not Added";


    // Skills count

    studentSkills.textContent =
        Array.isArray(user.skills)
            ? user.skills.length
            : 0;


    // Certification count

    studentCertificates.textContent =
        Array.isArray(user.certifications)
            ? user.certifications.length
            : 0;

}


// ==========================================
// 9. ADMIN LOGOUT
// ==========================================

function adminLogout() {

    // Remove admin session

    localStorage.removeItem(
        "adminLoggedIn"
    );


    // Go to admin login

    window.location.href =
        "admin-login.html";

}


// ==========================================
// 10. INITIALIZE ADMIN DASHBOARD
// ==========================================

updateStatistics();

displayApplications();

displayStudent();
```
