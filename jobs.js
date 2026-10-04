// ==========================================
// SkillConnect Jobs
// ==========================================


// CHECK LOGIN

if (localStorage.getItem("isLoggedIn") !== "true") {

    window.location.href = "login.html";

}


// JOB DATA

const jobs = [

    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        type: "Full Time",
        department: "CSE",
        location: "Chennai",
        salary: "₹4 - 6 LPA",
        skills: ["HTML", "CSS", "JavaScript"],
        description:
            "Develop responsive and user-friendly web applications."
    },


    {
        id: 2,
        title: "JavaScript Developer",
        company: "CodeWave Technologies",
        type: "Full Time",
        department: "IT",
        location: "Bangalore",
        salary: "₹5 - 8 LPA",
        skills: ["JavaScript", "React", "Git"],
        description:
            "Work with the development team to build modern web applications."
    },


    {
        id: 3,
        title: "Web Development Intern",
        company: "WebCraft Labs",
        type: "Internship",
        department: "CSE",
        location: "Chennai",
        salary: "₹15,000 / Month",
        skills: ["HTML", "CSS", "JavaScript"],
        description:
            "Learn and work on real-world web development projects."
    },


    {
        id: 4,
        title: "UI/UX Designer",
        company: "Creative Minds",
        type: "Full Time",
        department: "CSE",
        location: "Coimbatore",
        salary: "₹3 - 5 LPA",
        skills: ["Figma", "UI Design", "UX"],
        description:
            "Design beautiful and user-friendly digital experiences."
    },


    {
        id: 5,
        title: "Python Developer Intern",
        company: "DataTech Systems",
        type: "Internship",
        department: "IT",
        location: "Hyderabad",
        salary: "₹20,000 / Month",
        skills: ["Python", "SQL", "Git"],
        description:
            "Assist in developing Python-based applications and services."
    },


    {
        id: 6,
        title: "Embedded Systems Engineer",
        company: "ElectroTech",
        type: "Full Time",
        department: "ECE",
        location: "Chennai",
        salary: "₹4 - 7 LPA",
        skills: ["C", "Embedded", "Microcontroller"],
        description:
            "Develop and test embedded systems and electronic products."
    },


    {
        id: 7,
        title: "Electrical Engineer",
        company: "PowerGrid Solutions",
        type: "Full Time",
        department: "EEE",
        location: "Chennai",
        salary: "₹3 - 5 LPA",
        skills: ["Electrical", "AutoCAD"],
        description:
            "Work on electrical system design and maintenance."
    },


    {
        id: 8,
        title: "Mechanical Design Intern",
        company: "AutoWorks India",
        type: "Internship",
        department: "MECH",
        location: "Chennai",
        salary: "₹18,000 / Month",
        skills: ["AutoCAD", "SolidWorks"],
        description:
            "Assist engineers in mechanical design and development."
    }

];


// GET USER

let user =
    JSON.parse(localStorage.getItem("studentUser"));


// DISPLAY JOBS

function displayJobs(jobList) {

    const container =
        document.getElementById("jobsContainer");

    const noJobs =
        document.getElementById("noJobs");

    const jobCount =
        document.getElementById("jobCount");


    container.innerHTML = "";

    jobCount.textContent =
        jobList.length;


    if (jobList.length === 0) {

        noJobs.style.display = "block";

        return;

    }


    noJobs.style.display = "none";


    jobList.forEach(function (job) {

        const card =
            document.createElement("div");

        card.className = "job-card";


        const applications =
            user.applications || [];


        const alreadyApplied =
            applications.some(
                application =>
                    application.jobId === job.id
            );


        let skillsHTML = "";

        job.skills.forEach(function (skill) {

            skillsHTML += `
                <span class="job-tag">
                    ${skill}
                </span>
            `;

        });


        card.innerHTML = `

            <div class="job-top">

                <div class="company-logo">
                    🏢
                </div>

                <div class="job-title">

                    <h2>
                        ${job.title}
                    </h2>

                    <p>
                        ${job.company}
                    </p>

                </div>

                <span class="job-type">
                    ${job.type}
                </span>

            </div>


            <p class="job-description">
                ${job.description}
            </p>


            <div class="job-details">

                <span class="job-tag">
                    📍 ${job.location}
                </span>

                <span class="job-tag">
                    🎓 ${job.department}
                </span>

                ${skillsHTML}

            </div>


            <div class="job-bottom">

                <span class="salary">
                    ${job.salary}
                </span>


                ${
                    alreadyApplied

                    ?

                    `
                    <button
                        class="apply-btn applied"
                        disabled>
                        ✓ Applied
                    </button>
                    `

                    :

                    `
                    <button
                        class="apply-btn"
                        onclick="applyJob(${job.id})">
                        Apply Now
                    </button>
                    `
                }

            </div>

        `;


        container.appendChild(card);

    });

}


// APPLY JOB

function applyJob(jobId) {

    const job =
        jobs.find(
            item => item.id === jobId
        );


    if (!job) {
        return;
    }


    if (!user.applications) {

        user.applications = [];

    }


    // Check duplicate application

    const alreadyApplied =
        user.applications.some(
            application =>
                application.jobId === jobId
        );


    if (alreadyApplied) {

        alert("You have already applied for this job.");

        return;
    }


    // Create application

    const application = {

        jobId: job.id,

        jobTitle: job.title,

        company: job.company,

        appliedDate:
            new Date().toLocaleDateString(),

        status: "Pending"

    };


    user.applications.push(application);


    // Save

    localStorage.setItem(
        "studentUser",
        JSON.stringify(user)
    );


    alert(
        "Application submitted successfully! 🎉"
    );


    displayJobs(filteredJobs());

}


// FILTER JOBS

function filteredJobs() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const department =
        document
            .getElementById("departmentFilter")
            .value;


    const type =
        document
            .getElementById("jobTypeFilter")
            .value;


    return jobs.filter(function (job) {

        const matchesSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search);


        const matchesDepartment =
            department === "all" ||
            job.department === department;


        const matchesType =
            type === "all" ||
            job.type === type;


        return (
            matchesSearch &&
            matchesDepartment &&
            matchesType
        );

    });

}


// SEARCH

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            displayJobs(
                filteredJobs()
            );

        }
    );


// DEPARTMENT FILTER

document
    .getElementById("departmentFilter")
    .addEventListener(
        "change",
        function () {

            displayJobs(
                filteredJobs()
            );

        }
    );


// JOB TYPE FILTER

document
    .getElementById("jobTypeFilter")
    .addEventListener(
        "change",
        function () {

            displayJobs(
                filteredJobs()
            );

        }
    );


// LOGOUT

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href =
        "login.html";

}


// INITIAL DISPLAY

displayJobs(jobs);