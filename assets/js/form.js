const form = document.getElementById("resumeForm");

// ---- ABOUT SECTION ----
form.addEventListener("input", () => {
  const firstName = document.getElementById("firstName").value;
  const middleName = document.getElementById("middleName").value;
  const lastName = document.getElementById("lastName").value;
  const designation = document.getElementById("designation").value;
  const address = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const summary = document.getElementById("summary").value;
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const portfolio = document.getElementById("portfolio").value;

  document.querySelector(".name").textContent =
    `${firstName} ${middleName} ${lastName}`.trim() || "Your Name";
  document.querySelector(".designation").textContent =
    designation || "Your Designation";
  document.querySelector(".location").textContent =
    address || "Your City";
  document.querySelector(".phone").textContent =
    phone || "0000000000";
  document.querySelector(".email").textContent =
    email || "you@example.com";
  document.querySelector(".about p").textContent =
    summary || "Write something about yourself...";
  document.querySelector(".linkedin").textContent =
    linkedin || "linkedin.com/in/you";
  document.querySelector(".github").textContent =
    github || "github.com/you";
  document.querySelector(".portfolio").textContent =
    portfolio || "you.vercel.app";
});

document
  .getElementById("profileImageInput")
  .addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        document.querySelector(
          ".resume-header .profile img"
        ).src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

// ---- UTILITY ----
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
}

function addRemoveButton(formBlock, previewBlock) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("remove-btn");

  btn.innerHTML = '<i class="fa-solid fa-minus"></i>';

  btn.style.position = "absolute";
  btn.style.top = "5px";
  btn.style.right = "5px";
  btn.style.background = "red";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.width = "28px";
  btn.style.height = "28px";
  btn.style.fontSize = "14px";
  btn.style.cursor = "pointer";
  btn.style.borderRadius = "50%";
  btn.style.display = "flex";
  btn.style.alignItems = "center";
  btn.style.justifyContent = "center";
  btn.style.padding = "0";

  formBlock.style.position = "relative";

  formBlock.appendChild(btn);

  btn.addEventListener("click", () => {
    formBlock.remove();
    previewBlock.remove();
  });
}

// ---- EDUCATION ----
function attachEducationListeners(group, previewBlock) {
  const school = group.querySelector(".school");
  const degree = group.querySelector(".degree");
  const city = group.querySelector(".city");
  const sdate = group.querySelector(".sdate");
  const edate = group.querySelector(".edate");
  const pr = group.querySelector(".pr");

  function update() {
    const schoolVal = school.value;
    const degreeVal = degree.value;
    const cityVal = city.value;
    const startDate = formatDate(sdate.value);
    const endDate = edate.value ? formatDate(edate.value) : "Present";
    const prVal = pr.value;

    previewBlock.querySelector(".head").textContent =
      degreeVal && schoolVal
        ? `${degreeVal} - ${schoolVal}`
        : "Your Degree";
    previewBlock.querySelector(".edu-date").textContent =
      startDate || edate.value || cityVal
        ? `${startDate || "Start"} - ${endDate} | ${
            cityVal || "City"
          }`
        : "Dates";
    previewBlock.querySelector(".pr").textContent =
      prVal || "0.00 PR";
  }

  [school, degree, city, sdate, edate, pr].forEach((inp) =>
    inp.addEventListener("input", update)
  );
  update();
}

document
  .querySelectorAll(".education-section .add")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".education-section");
      const clone = section
        .querySelector(".border-box")
        .cloneNode(true);
      clone.querySelectorAll("input").forEach(
        (input) => (input.value = "")
      );
      section.insertBefore(clone, this);

      const preview = document.querySelector(".education");
      const eduInfo = document.createElement("div");
      eduInfo.classList.add("edu-info");
      eduInfo.innerHTML = `
        <div class="edu-subheader">
          <p class="head">Your Degree</p>
          <span class="pr">0.00 PR</span>
        </div>
        <p class="edu-date">Dates</p>
      `;
      preview.insertBefore(
        eduInfo,
        preview.querySelector("h3").nextSibling
      );

      attachEducationListeners(clone, eduInfo);
      addRemoveButton(clone, eduInfo);
    });
  });

attachEducationListeners(
  document.querySelector(".education-section .border-box"),
  document.querySelector(".education .edu-info")
);

// ---- EXPERIENCE ----
function attachExperienceListeners(group, previewBlock) {
  const title = group.querySelector("#title");
  const company = group.querySelector("#company");
  const location = group.querySelector("#location");
  const sdate = group.querySelector("#exp_sdate");
  const edate = group.querySelector("#exp_edate");
  const description = group.querySelector("#expdes");

  function update() {
    previewBlock.querySelector(".head").textContent =
      title.value || "Job Title";
    previewBlock.querySelector(".company").textContent =
      (company.value || "Company") +
      (location.value ? `, ${location.value}` : "");
    previewBlock.querySelector(".period").textContent =
      sdate.value || edate.value
        ? `${formatDate(sdate.value) || "Start"} – ${
            formatDate(edate.value) || "Present"
          }`
        : "Dates";
    previewBlock.querySelector(".exp-desc").textContent =
      description.value || "Job description goes here...";
  }

  [title, company, location, sdate, edate, description].forEach(
    (inp) => inp.addEventListener("input", update)
  );
  update();
}

document
  .querySelectorAll(".experience-section .add")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".experience-section");
      const clone = section
        .querySelector(".border-box")
        .cloneNode(true);
      clone.querySelectorAll("input").forEach(
        (i) => (i.value = "")
      );
      section.insertBefore(clone, this);

      const preview = document.querySelector(".experience");
      const expInfo = document.createElement("div");
      expInfo.classList.add("exp-info");
      expInfo.innerHTML = `
        <p class="head">Job Title</p>
        <div class="exp-subheader">
          <p class="company">Company</p>
          <span class="period">Dates</span>
        </div>
        <p class="exp-desc">Job description goes here...</p>
      `;
      preview.insertBefore(
        expInfo,
        preview.querySelector("h3").nextSibling
      );

      attachExperienceListeners(clone, expInfo);
      addRemoveButton(clone, expInfo);
    });
  });

attachExperienceListeners(
  document.querySelector(".experience-section .border-box"),
  document.querySelector(".experience .exp-info")
);

// ---- PROJECTS ----
function attachProjectListeners(group, previewBlock) {
  const pname = group.querySelector("#pname");
  const pdes = group.querySelector("#pdes");
  const link = group.querySelector("#link");
  const tech = group.querySelector("#tech");

  function update() {
    previewBlock.querySelector(".head").textContent =
      pname.value || "Project Name";
    previewBlock.querySelector(".pdescription").textContent =
      pdes.value || "Project description here...";
    previewBlock.querySelector(".stack").textContent = tech.value
      ? `Tech Stack: ${tech.value}`
      : "Tech Stack: Example";
    previewBlock.querySelector(".link").textContent =
      link.value || "yourproject.vercel.app";
  }

  [pname, pdes, link, tech].forEach((inp) =>
    inp.addEventListener("input", update)
  );
  update();
}

document
  .querySelectorAll(".project-section .add")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const section = this.closest(".project-section");
      const clone = section
        .querySelector(".border-box")
        .cloneNode(true);
      clone.querySelectorAll("input").forEach(
        (i) => (i.value = "")
      );
      section.insertBefore(clone, this);

      const preview = document.querySelector(".projects");
      const projInfo = document.createElement("div");
      projInfo.classList.add("project-info");
      projInfo.innerHTML = `
        <p class="head">Project Name</p>
        <p class="tech"><span class="stack">Tech Stack: Example</span></p>
        <p class="pdescription">Project description here...</p>
        <p class="link">yourproject.vercel.app</p>
      `;
      preview.insertBefore(
        projInfo,
        preview.querySelector("h3").nextSibling
      );

      attachProjectListeners(clone, projInfo);
      addRemoveButton(clone, projInfo);
    });
  });

attachProjectListeners(
  document.querySelector(".project-section .border-box"),
  document.querySelector(".projects .project-info")
);

// ---- SKILLS ----
function createSkillPreview(skill, level) {
  const skillInfo = document.createElement("div");
  skillInfo.classList.add("skill-info");
  skillInfo.innerHTML = `
    <span>${skill || "Your skill here"}</span>
    <div class="bar">
      <div class="fill" style="width: ${
        level ? Math.min(Math.max(level, 0), 100) : 50
      }%;"></div>
    </div>
  `;
  return skillInfo;
}

function attachSkillListeners(group, previewBlock) {
  const skillInput = group.querySelector("#skill");
  const levelInput = group.querySelector("#level");

  function update() {
    previewBlock.querySelector("span").textContent =
      skillInput.value || "Your skill here";
    const width = Math.min(
      Math.max(levelInput.value || 50, 0),
      100
    );
    previewBlock.querySelector(".fill").style.width =
      width + "%";
  }

  [skillInput, levelInput].forEach((inp) =>
    inp.addEventListener("input", update)
  );
  update();
}

const skillsPreview = document.querySelector(".skills");
attachSkillListeners(
  document.querySelector(".skills-section .border-box"),
  skillsPreview.querySelector(".skill-info")
);

document
  .getElementById("addSkillBtn")
  .addEventListener("click", function () {
    const section = this.closest(".skills-section");
    const clone = section
      .querySelector(".border-box")
      .cloneNode(true);
    clone.querySelectorAll("input").forEach(
      (i) => (i.value = "")
    );
    section.insertBefore(clone, this);

    const skillPreview = createSkillPreview("", 50);
    skillsPreview.insertBefore(
      skillPreview,
      skillsPreview.querySelector("h3").nextSibling
    );

    attachSkillListeners(clone, skillPreview);
    addRemoveButton(clone, skillPreview);
  });

// ---- ACHIEVEMENTS ----
function createAchievementPreview(title, description) {
  const achieveInfo = document.createElement("div");
  achieveInfo.classList.add("achieve-info");
  achieveInfo.innerHTML = `
    <p class="achieve-name">${title || "Your Achievement"}</p>
    <p class="achieve-desc">${
      description || "Your Achievement Description"
    }</p>
  `;
  return achieveInfo;
}

function attachAchievementListeners(group, previewBlock) {
  const title = group.querySelector("#atitle");
  const description = group.querySelector("#achievedes");

  function update() {
    previewBlock.querySelector(".achieve-name").textContent =
      title.value || "Your Achievement";
    previewBlock.querySelector(".achieve-desc").textContent =
      description.value || "Your Achievement Description";
  }

  [title, description].forEach((inp) =>
    inp.addEventListener("input", update)
  );
  update();
}

const achievementsPreview = document.querySelector(".achievements");
attachAchievementListeners(
  document.querySelector(".achievement-section .border-box"),
  achievementsPreview.querySelector(".achieve-info")
);

document
  .querySelector(".achievement-section .add")
  .addEventListener("click", function () {
    const section = this.closest(".achievement-section");
    const clone = section
      .querySelector(".border-box")
      .cloneNode(true);
    clone.querySelectorAll("input").forEach(
      (i) => (i.value = "")
    );
    section.insertBefore(clone, this);

    const achievePreview = createAchievementPreview("", "");
    achievementsPreview.insertBefore(
      achievePreview,
      achievementsPreview.querySelector("h3").nextSibling
    );

    attachAchievementListeners(clone, achievePreview);
    addRemoveButton(clone, achievePreview);
  });

// ---- LANGUAGES ----
document
  .getElementById("lang")
  .addEventListener("input", () => {
    const langInput = document.getElementById("lang").value;
    const langList = document.querySelector(".lang ul");
    langList.innerHTML = "";
    const langs = langInput
      .split(",")
      .map((l) => l.trim())
      .filter((l) => l);
    if (langs.length === 0) {
      langList.innerHTML = `<li>English</li><li>Gujarati</li><li>Hindi</li>`;
      return;
    }
    langs.forEach((l) => {
      const li = document.createElement("li");
      li.textContent = l;
      langList.appendChild(li);
    });
  });
