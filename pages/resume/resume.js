let $name = document.getElementById("name");
let $primary_email = document.getElementById("primary_email");
let $secondary_email = document.getElementById("secondary_email");
let $introduction = document.getElementById("introduction");
let $programming_languages = document.getElementById("programming_languages");
let $web_techs = document.getElementById("web_techs");
let $data_techs = document.getElementById("data_techs");
let $other_techs = document.getElementById("other_techs");
let $jobs = document.getElementById("jobs");
let $personal = document.getElementById("personal");
let $information = document.getElementById("information");

function getResume() {
  fetch("/public/resume/resume.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      $name.innerHTML = data.general_information.name;
      $introduction.innerHTML = data.experience.introduction;

      setContact(data.general_information.contact);

      setSkills(data.experience.programming_languages, $programming_languages);
      setSkills(data.experience.web_technologies, $web_techs);
      setSkills(data.experience.data_technologies, $data_techs);
      setSkills(data.experience.other_technologies, $other_techs);
      setExperience(data.experience.jobs);
      setPersonalExperience(data.experience.other_experiences);
      return data;
    });
}

function setSkills(list, element) {
  for (let index = 0; index < list.length; index++) {
    const item = list[index];

    let span = element.appendChild(document.createElement("span"));

    span.className = "content-item";
    span.innerHTML = item;
  }
}

function setExperience(experiences) {
  for (let experience of experiences) {
    let div = document.createElement("div");
    div.className = "section-div";
    div.innerHTML = experienceTemplate(experience);

    $jobs.appendChild(div);
  }
}

function setPersonalExperience(experiences) {
  for (let experience of experiences) {
    let div = document.createElement("div");
    div.className = "section-div";
    div.innerHTML = personalExperienceTemplate(experience);

    $personal.appendChild(div);
  }
}

function setContact(contacts) {
  for (let contact of contacts) {
    let div = document.createElement("div");
    div.className = "contact-model";
    div.innerHTML = contactTemplate(contact);

    $information.appendChild(div);
  }
}

function contactTemplate(data) {
  return `
    <span>${data.title}</span>
    ${getTemplateByType(data.type, data.content, data.label)}
  `;
}

function getTemplateByType(type, content, label) {
  switch (type) {
    case "email":
      return `<a href="mailto:${content}">${label ? label : content}</a>`;
    case "link":
      return `<a href="${content}">${label ? label : content}</a>`;
    default:
      return `<span>$${label ? label : content}</span>`;
  }
}

function experienceTemplate(data) {
  return `
  <div class="experience-model">
    <div class="experience-header">
        <h5>${data.title}</h5>
        <span class="company-name">${data.company}, ${data.time.from} - ${data.time.to}</span>
    </div>
    <p>${data.description}</p>
  </div>
  `;
}

function personalExperienceTemplate(data) {
  return `
  <div class="experience-model">
    <div class="experience-header">
        <h5>${data.title}</h5>
        <span class="company-name">${data.situation}</span>
        ${data.reference ? getRefLink(data.reference) : ""}
    </div>
    <p>${data.description}</p>
  </div>
  `;
}

function getRefLink(reference) {
  return `<a href="${reference.link}">${reference.title}</a>`;
}
