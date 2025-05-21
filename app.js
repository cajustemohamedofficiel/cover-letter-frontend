const menu = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');

//Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
}

menu.addEventListener('click', mobileMenu);

// Collect service form inputs and save as JSON
document.getElementById('save-service').addEventListener('click', () => {
  const serviceData = {
    fullName: document.getElementById('full-name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    recruiter: document.getElementById('recruiter').value,
    companyName: document.getElementById('company-name').value,
    position: document.getElementById('position').value,
    companyAddress: document.getElementById('company-address').value,
    experience: document.getElementById('experience').value,
    skills: document.getElementById('skills').value,
    objective: document.getElementById('objective').value,
  };

    // Store in localStorage or send to backend
  localStorage.setItem('serviceData', JSON.stringify(serviceData));
  alert('Service data saved!');

  const prompt = `
  Write a professional cover letter using the following information:
  - Full Name: ${serviceData.fullName}
  - Email: ${serviceData.email}
  - Phone: ${serviceData.phone}
  - Recruiter's Name: ${serviceData.recruiter || "N/A"}
  - Company: ${serviceData.companyName}
  - Position: ${serviceData.position}
  - Company Address: ${serviceData.companyAddress}
  - Experience: ${serviceData.experience}
  - Skills: ${serviceData.skills}
  - Objective: ${serviceData.objective}
  `;

  fetch("https://openai-backend-ppv4.onrender.com/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prompt }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.response) {
        document.getElementById("cover-letter-output").textContent = data.response;
      } else {
        alert("Error: " + data.error);
      }
    })
    .catch(err => {
      alert("Request failed.");
      console.error(err);
    });
});


// Collect contact form inputs and save as JSON
document.getElementById('save-contact').addEventListener('click', () => {
  const contactData = {
    name: document.getElementById('contact-name').value,
    email: document.getElementById('contact-email').value,
    message: document.getElementById('contact-message').value,
  };

  localStorage.setItem('contactData', JSON.stringify(contactData));
  alert('Contact form saved!');
});

