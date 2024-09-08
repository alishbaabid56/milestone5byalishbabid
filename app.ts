interface ResumeData {
    username: string;
    name: string;
    email: string;
    phone: string;
    education: string;
    experience: string;
    skills: string;
}

// Handle the form submission
document.getElementById("resumeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const resumeData: ResumeData = {
        username: (document.getElementById("username") as HTMLInputElement).value,
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLTextAreaElement).value,
        experience: (document.getElementById("experience") as HTMLTextAreaElement).value,
        skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
    };

    displayResume(resumeData);
    generateResumeLink(resumeData.username);
    enablePDFDownload(resumeData);
});

// Function to display the resume with edit buttons
function displayResume(data: ResumeData) {
    const resumeContent = `
        <h3 id="displayName">${data.name} <button onclick="editField('name')">Edit</button></h3>
        <p><strong>Email:</strong> <span id="displayEmail">${data.email}</span> <button onclick="editField('email')">Edit</button></p>
        <p><strong>Phone:</strong> <span id="displayPhone">${data.phone}</span> <button onclick="editField('phone')">Edit</button></p>
        <h4>Education</h4>
        <p id="displayEducation">${data.education} <button onclick="editField('education')">Edit</button></p>
        <h4>Experience</h4>
        <p id="displayExperience">${data.experience} <button onclick="editField('experience')">Edit</button></p>
        <h4>Skills</h4>
        <p id="displaySkills">${data.skills} <button onclick="editField('skills')">Edit</button></p>
    `;

    document.getElementById("resumeContent")!.innerHTML = resumeContent;
}
// Function to make a field editable
function editField(field: keyof ResumeData) {
    const fieldElement = document.getElementById(`display${capitalizeFirstLetter(field)}`)!;
    const currentValue = fieldElement.innerText;
    fieldElement.innerHTML = `<input type="text" id="edit${capitalizeFirstLetter(field)}" value="${currentValue}"> 
                              <button onclick="saveField('${field}')">Save</button>`;
}

// Function to save the edited field and update the resume
function saveField(field: keyof ResumeData) {
    const inputElement = document.getElementById(`edit${capitalizeFirstLetter(field)}`) as HTMLInputElement;
    const newValue = inputElement.value;

    const displayElement = document.getElementById(`display${capitalizeFirstLetter(field)}`)!;
    displayElement.innerHTML = `${newValue} <button onclick="editField('${field}')">Edit</button>`;
}
// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to generate a resume link based on the username
function generateResumeLink(username: string) {
    const baseUrl = "https://vercel.app/";
    const resumeUrl = `${username}.${baseUrl}`;
    const resumeLink = `<p><strong>Shareable Resume URL:</strong> <a href="${resumeUrl}" target="_blank">${resumeUrl}</a></p>`;
    document.getElementById("resumeLink")!.innerHTML = resumeLink;
}

// Function to enable PDF download
function enablePDFDownload(data: ResumeData) {
    const downloadButton = document.getElementById("downloadPDF")!;
    downloadButton.style.display = "block";
    downloadButton.onclick = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(`Name: ${data.name}`, 10, 10);
        doc.text(`Email: ${data.email}`, 10, 20);
        doc.text(`Phone: ${data.phone}`, 10, 30);
        doc.text(`Education:`, 10, 40);
        doc.text(data.education, 10, 50);
        doc.text(`Experience:`, 10, 70);
        doc.text(data.experience, 10, 80);
        doc.text(`Skills:`, 10, 100);
        doc.text(data.skills, 10, 110);

        doc.save(`${data.username}_resume.pdf`);
    };
}