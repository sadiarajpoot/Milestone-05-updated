const addSkillButton = document.getElementById("AddSkillButton") as HTMLButtonElement;
const skillContainer = document.getElementById("AddSkillsContainer") as HTMLDivElement;
const resumeForm = document.getElementById("resume-container") as HTMLFormElement;
const resumePreviewElement = document.getElementById("Resume-Preview") as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadButton = document.getElementById('download-pdf') as HTMLButtonElement; 

addSkillButton.addEventListener("click", function () {
    const newSkillInput = document.createElement("input");
    newSkillInput.name = "skills[]";
    newSkillInput.type = "text";
    newSkillInput.placeholder = "Enter Your Skill";
    newSkillInput.className = "skill-input";
    skillContainer.appendChild(newSkillInput);
});

resumeForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    // Collecting personal information
    const pictureInput = document.getElementById("Picture") as HTMLInputElement;
    let pictureURL = '';
    if (pictureInput.files && pictureInput.files[0]) {
        pictureURL = URL.createObjectURL(pictureInput.files[0]);
    }

    const username = (document.getElementById('username') as HTMLInputElement).value.trim();
    if (!username) {
        console.error("Username is required to generate a shareable link.");
        return; // Exit if username is empty
    }

    const jobName = (document.getElementById("JobName") as HTMLInputElement).value;
    const firstName = (document.getElementById("FirstName") as HTMLInputElement).value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
    const email = (document.getElementById("Email") as HTMLInputElement).value;
    const address = (document.getElementById("Address") as HTMLInputElement).value;
    const country = (document.getElementById("Country") as HTMLInputElement).value;
    const city = (document.getElementById("City") as HTMLInputElement).value;
    const phone = (document.getElementById("PhoneNumber") as HTMLInputElement).value;

    // Collecting work experience
    const companyName = (document.getElementById("CompanyName") as HTMLInputElement).value;
    const yourLastJob = (document.getElementById("YourLastJob") as HTMLInputElement).value;
    const jobDescription = (document.getElementById("JobDescription") as HTMLTextAreaElement).value;

    const skillInputs = skillContainer.querySelectorAll("input[name='skills[]']") as NodeListOf<HTMLInputElement>;
    const skillsArray: string[] = [];
    skillInputs.forEach((skillInput) => {
        if (skillInput.value) {
            skillsArray.push(skillInput.value);
        }
    });

    const skills = skillsArray.map(skill => `<li>${skill}</li>`).join('');

    // Collecting education information
    const instituteName = (document.getElementById("InstituteName") as HTMLInputElement).value;
    const degree = (document.getElementById("Degree") as HTMLInputElement).value;
    const yearsOfEducation = (document.getElementById("YearsOfEducation") as HTMLInputElement).value;
    const educationDescription = (document.getElementById("EducationTextArea") as HTMLTextAreaElement).value;

    // Prepare the resume content
    const resumeContent = `
        <h2>Your Resume</h2><hr>
        <h3>Personal Information</h3><hr>
        ${pictureURL ? `<img src="${pictureURL}" alt="Profile Picture" style="width:100px; height:auto; border-radius:50%; display:block; margin:10px 0;" />` : ""}
        <p><strong>Job Name:</strong> <span contenteditable="true">${jobName}</span></p>
        <p><strong>First Name:</strong> <span contenteditable="true">${firstName}</span></p>
        <p><strong>Last Name:</strong> <span contenteditable="true">${lastName}</span></p>
        <p><strong>Email:</strong> <span contenteditable="true">${email}</span></p>
        <p><strong>Address:</strong> <span contenteditable="true">${address}</span></p>
        <p><strong>Country:</strong> <span contenteditable="true">${country}</span></p>
        <p><strong>City:</strong> <span contenteditable="true">${city}</span></p>
        <p><strong>Phone Number:</strong> <span contenteditable="true">${phone}</span></p>

        <h3>Work Experience</h3><hr>
        <p><strong>Company Name:</strong> <span contenteditable="true">${companyName}</span></p>
        <p><strong>Last Job:</strong> <span contenteditable="true">${yourLastJob}</span></p>
        <p><strong>Job Description:</strong> <span contenteditable="true">${jobDescription}</span></p>

        <h3>Skills</h3><hr>
        <ul>${skills}</ul>

        <h3>Education</h3><hr>
        <p><strong>Institute Name:</strong> <span contenteditable="true">${instituteName}</span></p>
        <p><strong>Degree:</strong> <span contenteditable="true">${degree}</span></p>
        <p><strong>Years of Education:</strong> <span contenteditable="true">${yearsOfEducation}</span></p>
        <p><strong>Education Description:</strong> <span contenteditable="true">${educationDescription}</span></p>
    `;
    resumePreviewElement.innerHTML = resumeContent;

    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    console.log("Shareable URL:", shareableURL); 

  
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;

 
    const resumeData = {
        jobName,
        firstName,
        lastName,
        email,
        address,
        country,
        city,
        phone,
        companyName,
        yourLastJob,
        jobDescription,
        skills: Array(skillInputs).map(input => input).filter(skill => skill),
        instituteName,
        degree,
        yearsOfEducation,
        educationDescription
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Store data with the username as the key
});

// Handle PDF download
downloadButton.addEventListener('click', () => {
    window.print();
});


window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
       
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
   const resumeData = JSON.parse(savedResumeData);
 (document.getElementById('username') as HTMLInputElement).value = username;
 (document.getElementById('JobName') as HTMLInputElement).value = resumeData.jobName;
(document.getElementById('FirstName') as HTMLInputElement).value = resumeData.firstName;
(document.getElementById('lastName') as HTMLInputElement).value = resumeData.lastName;
(document.getElementById('Email') as HTMLInputElement).value = resumeData.email;
 (document.getElementById('Address') as HTMLInputElement).value = resumeData.address;
(document.getElementById('Country') as HTMLInputElement).value = resumeData.country;
(document.getElementById('City') as HTMLInputElement).value = resumeData.city;
(document.getElementById('PhoneNumber') as HTMLInputElement).value = resumeData.phone;
 (document.getElementById('CompanyName') as HTMLInputElement).value = resumeData.companyName;
 (document.getElementById('YourLastJob') as HTMLInputElement).value = resumeData.yourLastJob;
 (document.getElementById('JobDescription') as HTMLTextAreaElement).value = resumeData.jobDescription;
(document.getElementById('InstituteName') as HTMLInputElement).value = resumeData.instituteName;
(document.getElementById('Degree') as HTMLInputElement).value = resumeData.degree;
 (document.getElementById('YearsOfEducation') as HTMLInputElement).value = resumeData.yearsOfEducation;
(document.getElementById('EducationTextArea') as HTMLTextAreaElement).value = resumeData.educationDescription;

           
            resumeData.skills.forEach(skill => {
                const skillInput = document.createElement("input");
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
