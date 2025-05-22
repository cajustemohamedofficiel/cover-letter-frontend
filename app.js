const menu = document.querySelector('#mobile-menu');
const navMenu = document.querySelector('.nav-menu');

//Display Mobile Menu
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
}

menu.addEventListener('click', mobileMenu);

function addExperienceEntry(value = "") {
  const container = document.getElementById('experience-container');

  // First, mark all existing entries as "submitted" and remove their Add buttons
  const entries = container.querySelectorAll('.experience-entry');
  entries.forEach(entry => {
    const addBtn = entry.querySelector('.add-experience-btn');
    if (addBtn) addBtn.remove();

    if (!entry.querySelector('.remove-experience-btn')) {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'small-btn remove-experience-btn';
      removeBtn.style.marginTop = '10px';
      removeBtn.onclick = () => {
        entry.remove();
        // After removing, re-add add button to last
        updateExperienceAddButton();
      };
      entry.appendChild(removeBtn);
    }
  });

  // Create new blank entry (no remove button, but will have Add)
  const entryDiv = document.createElement('div');
  entryDiv.className = 'experience-entry';
  entryDiv.style.marginBottom = '20px';

  const label = document.createElement('label');
  label.textContent = 'Your experience';
  const textarea = document.createElement('textarea');
  textarea.name = 'experience[]';
  textarea.rows = 5;
  textarea.className = 'input-field';
  textarea.placeholder = 'E.g., IT Support at Walgreens...';
  textarea.value = value;

  // Only this new one gets the Add button
  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = 'Add';
  addBtn.className = 'small-btn add-experience-btn';
  addBtn.style.marginTop = '10px';
  addBtn.onclick = () => addExperienceEntry();

  entryDiv.appendChild(label);
  entryDiv.appendChild(textarea);
  entryDiv.appendChild(addBtn);

  container.appendChild(entryDiv);
}

// Helper to re-add Add button only to the last entry
function updateExperienceAddButton() {
  const container = document.getElementById('experience-container');
  const entries = container.querySelectorAll('.experience-entry');

  // If there's at least one entry, ensure last one has the Add button
  if (entries.length > 0) {
    const last = entries[entries.length - 1];

    // Remove any existing Add button first
    const oldAdd = last.querySelector('.add-experience-btn');
    if (oldAdd) oldAdd.remove();

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.textContent = 'Add';
    addBtn.className = 'small-btn add-experience-btn';
    addBtn.style.marginTop = '10px';
    addBtn.onclick = () => addExperienceEntry();

    last.appendChild(addBtn);
  }
}
function addSkillEntry(value = "") {
  const container = document.getElementById('skills-container');

  // Mark existing entries as submitted
  const entries = container.querySelectorAll('.skills-entry');
  entries.forEach(entry => {
    const addBtn = entry.querySelector('.add-skill-btn');
    if (addBtn) addBtn.remove();

    if (!entry.querySelector('.remove-skill-btn')) {
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'small-btn remove-skill-btn';
      removeBtn.style.marginTop = '10px';
      removeBtn.onclick = () => {
        entry.remove();
        updateSkillAddButton();
      };
      entry.appendChild(removeBtn);
    }
  });

  // New blank entry
  const entryDiv = document.createElement('div');
  entryDiv.className = 'skills-entry';
  entryDiv.style.marginBottom = '20px';

  const label = document.createElement('label');
  label.textContent = 'Your skill';
  const textarea = document.createElement('textarea');
  textarea.name = 'skills[]';
  textarea.rows = 3;
  textarea.className = 'input-field';
  textarea.placeholder = 'E.g., Python, Teamwork...';
  textarea.value = value;

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.textContent = 'Add';
  addBtn.className = 'small-btn add-skill-btn';
  addBtn.style.marginTop = '10px';
  addBtn.onclick = () => addSkillEntry();

  entryDiv.appendChild(label);
  entryDiv.appendChild(textarea);
  entryDiv.appendChild(addBtn);

  container.appendChild(entryDiv);
}

function updateSkillAddButton() {
  const container = document.getElementById('skills-container');
  const entries = container.querySelectorAll('.skills-entry');

  if (entries.length > 0) {
    const last = entries[entries.length - 1];
    const oldAdd = last.querySelector('.add-skill-btn');
    if (oldAdd) oldAdd.remove();

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.textContent = 'Add';
    addBtn.className = 'small-btn add-skill-btn';
    addBtn.style.marginTop = '10px';
    addBtn.onclick = () => addSkillEntry();

    last.appendChild(addBtn);
  }
}




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
    experience: Array.from(document.querySelectorAll('textarea[name="experience[]"]')).map(e => e.value).filter(Boolean),
    skills: Array.from(document.querySelectorAll('textarea[name="skills[]"]')).map(s => s.value).filter(Boolean),
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
  - Experience: ${serviceData.experience.join("\n- ")}
  - Skills: ${serviceData.skills.join(", ")}
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
      console.error("Error:", data.error);
    }
  })
  .catch(err => {
    console.error("Request failed:", err);
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

document.addEventListener("DOMContentLoaded", () => {
  addExperienceEntry(); 
  addSkillEntry();     
});
