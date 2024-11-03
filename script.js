var addSkillButton = document.getElementById("AddSkillButton");
var skillContainer = document.getElementById("AddSkillsContainer");
var resumeForm = document.getElementById("resume-container");
var resumePreviewElement = document.getElementById("Resume-Preview");
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadButton = document.getElementById('download-pdf');
addSkillButton.addEventListener("click", function () {
    var newSkillInput = document.createElement("input");
    newSkillInput.name = "skills[]";
    newSkillInput.type = "text";
    newSkillInput.placeholder = "Enter Your Skill";
    newSkillInput.className = "skill-input";
    skillContainer.appendChild(newSkillInput);
});
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Collecting personal information
    var pictureInput = document.getElementById("Picture");
    var pictureURL = '';
    if (pictureInput.files && pictureInput.files[0]) {
        pictureURL = URL.createObjectURL(pictureInput.files[0]);
    }
    var username = document.getElementById('username').value.trim();
    if (!username) {
        console.error("Username is required to generate a shareable link.");
        return; // Exit if username is empty
    }
    var jobName = document.getElementById("JobName").value;
    var firstName = document.getElementById("FirstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("Email").value;
    var address = document.getElementById("Address").value;
    var country = document.getElementById("Country").value;
    var city = document.getElementById("City").value;
    var phone = document.getElementById("PhoneNumber").value;
    // Collecting work experience
    var companyName = document.getElementById("CompanyName").value;
    var yourLastJob = document.getElementById("YourLastJob").value;
    var jobDescription = document.getElementById("JobDescription").value;
    var skillInputs = skillContainer.querySelectorAll("input[name='skills[]']");
    var skillsArray = [];
    skillInputs.forEach(function (skillInput) {
        if (skillInput.value) {
            skillsArray.push(skillInput.value);
        }
    });
    var skills = skillsArray.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
    // Collecting education information
    var instituteName = document.getElementById("InstituteName").value;
    var degree = document.getElementById("Degree").value;
    var yearsOfEducation = document.getElementById("YearsOfEducation").value;
    var educationDescription = document.getElementById("EducationTextArea").value;
    // Prepare the resume content
    var resumeContent = "\n        <h2>Your Resume</h2><hr>\n        <h3>Personal Information</h3><hr>\n        ".concat(pictureURL ? "<img src=\"".concat(pictureURL, "\" alt=\"Profile Picture\" style=\"width:100px; height:auto; border-radius:50%; display:block; margin:10px 0;\" />") : "", "\n        <p><strong>Job Name:</strong> <span contenteditable=\"true\">").concat(jobName, "</span></p>\n        <p><strong>First Name:</strong> <span contenteditable=\"true\">").concat(firstName, "</span></p>\n        <p><strong>Last Name:</strong> <span contenteditable=\"true\">").concat(lastName, "</span></p>\n        <p><strong>Email:</strong> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><strong>Address:</strong> <span contenteditable=\"true\">").concat(address, "</span></p>\n        <p><strong>Country:</strong> <span contenteditable=\"true\">").concat(country, "</span></p>\n        <p><strong>City:</strong> <span contenteditable=\"true\">").concat(city, "</span></p>\n        <p><strong>Phone Number:</strong> <span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3>Work Experience</h3><hr>\n        <p><strong>Company Name:</strong> <span contenteditable=\"true\">").concat(companyName, "</span></p>\n        <p><strong>Last Job:</strong> <span contenteditable=\"true\">").concat(yourLastJob, "</span></p>\n        <p><strong>Job Description:</strong> <span contenteditable=\"true\">").concat(jobDescription, "</span></p>\n\n        <h3>Skills</h3><hr>\n        <ul>").concat(skills, "</ul>\n\n        <h3>Education</h3><hr>\n        <p><strong>Institute Name:</strong> <span contenteditable=\"true\">").concat(instituteName, "</span></p>\n        <p><strong>Degree:</strong> <span contenteditable=\"true\">").concat(degree, "</span></p>\n        <p><strong>Years of Education:</strong> <span contenteditable=\"true\">").concat(yearsOfEducation, "</span></p>\n        <p><strong>Education Description:</strong> <span contenteditable=\"true\">").concat(educationDescription, "</span></p>\n    ");
    resumePreviewElement.innerHTML = resumeContent;
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    console.log("Shareable URL:", shareableURL);
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
    var resumeData = {
        jobName: jobName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        country: country,
        city: city,
        phone: phone,
        companyName: companyName,
        yourLastJob: yourLastJob,
        jobDescription: jobDescription,
        skills: Array(skillInputs).map(function (input) { return input; }).filter(function (skill) { return skill; }),
        instituteName: instituteName,
        degree: degree,
        yearsOfEducation: yearsOfEducation,
        educationDescription: educationDescription
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Store data with the username as the key
});
// Handle PDF download
downloadButton.addEventListener('click', function () {
    window.print();
});
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('JobName').value = resumeData.jobName;
            document.getElementById('FirstName').value = resumeData.firstName;
            document.getElementById('lastName').value = resumeData.lastName;
            document.getElementById('Email').value = resumeData.email;
            document.getElementById('Address').value = resumeData.address;
            document.getElementById('Country').value = resumeData.country;
            document.getElementById('City').value = resumeData.city;
            document.getElementById('PhoneNumber').value = resumeData.phone;
            document.getElementById('CompanyName').value = resumeData.companyName;
            document.getElementById('YourLastJob').value = resumeData.yourLastJob;
            document.getElementById('JobDescription').value = resumeData.jobDescription;
            document.getElementById('InstituteName').value = resumeData.instituteName;
            document.getElementById('Degree').value = resumeData.degree;
            document.getElementById('YearsOfEducation').value = resumeData.yearsOfEducation;
            document.getElementById('EducationTextArea').value = resumeData.educationDescription;
            resumeData.skills.forEach(function (skill) {
                var skillInput = document.createElement("input");
                skillInput.name = "skills[]";
                skillInput.type = "text";
                skillInput.placeholder = "Enter Your Skill";
                skillInput.className = "skill-input";
                skillInput.value = skill;
                skillContainer.appendChild(skillInput);
            });
        }
    }
});
