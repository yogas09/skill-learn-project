// ==========================================
// SkillConnect Applications
// ==========================================


// CHECK LOGIN

if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "login.html";

}


// GET USER

let user =
    JSON.parse(localStorage.getItem("studentUser"));


// APPLICATIONS

let applications =
    user.applications || [];


// DISPLAY APPLICATIONS

function displayApplications(list) {

    const container =
        document.getElementById(
            "applicationsContainer"
        );

    const empty =
        document.getElementById(
            "emptyApplications"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    list.forEach(function (application) {

        const card =
            document.createElement("div");

        card.className =
            "application-card";


        const status =
            application.status || "Pending";


        const statusClass =
            status.toLowerCase();


        card.innerHTML = `

            <div class="application-top">

                <div class="application-logo">
                    🏢
                </div>


                <div class="application-info">

                    <h2>
                        ${application.jobTitle}
                    </h2>

                    <p>
                        ${application.company}
                    </p>

                </div>


                <span
                    class="status ${statusClass}">
                    ${status}
                </span>

            </div>


            <div class="application-bottom">

                <span class="application-date">
                    📅 Applied on:
                    ${application.appliedDate}
                </span>


                <a
                    href="jobs.html"
                    class="view-job-btn">
                    View Jobs →
                </a>

            </div>

        `;


        container.appendChild(card);

    });

}


// UPDATE STATISTICS

function updateStatistics() {

    const total =
        applications.length;


    const pending =
        applications.filter(
            app => app.status === "Pending"
        ).length;


    const selected =
        applications.filter(
            app => app.status === "Selected"
        ).length;


    const rejected =
        applications.filter(
            app => app.status === "Rejected"
        ).length;


    document.getElementById(
        "totalApplications"
    ).textContent = total;


    document.getElementById(
        "pendingApplications"
    ).textContent = pending;


    document.getElementById(
        "selectedApplications"
    ).textContent = selected;


    document.getElementById(
        "rejectedApplications"
    ).textContent = rejected;

}


// STATUS FILTER

document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        function () {

            const selectedStatus =
                this.value;


            if (
                selectedStatus === "all"
            ) {

                displayApplications(
                    applications
                );

                return;

            }


            const filtered =
                applications.filter(
                    application =>
                        application.status ===
                        selectedStatus
                );


            displayApplications(
                filtered
            );

        }
    );


// LOGOUT

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    window.location.href =
        "login.html";

}


// INITIAL LOAD

updateStatistics();

displayApplications(
    applications
);