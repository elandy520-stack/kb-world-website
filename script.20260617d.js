const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const open = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".dropdown-toggle").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const item = button.closest(".has-dropdown");
    const open = item.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(open));
  });
});

const chatButton = document.querySelector(".chat-button");
const chatPanel = document.querySelector(".chat-panel");

if (chatButton && chatPanel) {
  chatButton.addEventListener("click", () => {
    const willOpen = chatPanel.hasAttribute("hidden");
    chatPanel.toggleAttribute("hidden", !willOpen);
    chatButton.setAttribute("aria-expanded", String(willOpen));
  });
}

const calculator = document.querySelector("[data-stp-calculator]");
const calculatorResult = document.querySelector("[data-calculator-result]");
const occupancyOutput = document.querySelector("[data-occupancy]");

const loadFactors = {
  hotel: { base: 0.4, label: "AOS compact STP" },
  hospital: { base: 0.65, label: "GAS high-load STP" },
  condo: { base: 0.32, label: "AOS modular STP" },
  school: { base: 0.12, label: "AOS campus STP" },
  commercial: { base: 0.22, label: "AOS commercial STP" },
};

function updateCalculator() {
  if (!calculator || !calculatorResult) return;
  const data = new FormData(calculator);
  const type = String(data.get("type") || "hotel");
  const units = Math.max(1, Number(data.get("units") || 1));
  const occupancy = Math.max(20, Number(data.get("occupancy") || 75));
  const factor = loadFactors[type] || loadFactors.hotel;
  const capacity = Math.max(3, units * factor.base * (occupancy / 100));
  const rounded = Math.ceil(capacity * 10) / 10;
  const low = Math.max(1.2, rounded * 0.38);
  const high = Math.max(1.8, rounded * 0.62);

  if (occupancyOutput) occupancyOutput.textContent = `${occupancy}%`;

  calculatorResult.innerHTML = `
    <span>Estimated capacity</span>
    <strong>${rounded.toFixed(1)} m3/day</strong>
    <p>${factor.label} recommended for early planning. Indicative installed budget range: PHP ${low.toFixed(1)}M-${high.toFixed(1)}M. Confirm final sizing with a free site assessment.</p>
  `;
}

if (calculator) {
  calculator.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculator();
  });
  calculator.addEventListener("input", updateCalculator);
  updateCalculator();
}

const assessmentForm = document.querySelector("[data-assessment-form]");

if (assessmentForm) {
  const salesEmail = "kbwsales26@gmail.com";
  const whatsappNumber = "639560820266";
  const status = assessmentForm.querySelector("[data-assessment-status]");
  const summary = assessmentForm.querySelector("[data-assessment-summary]");
  const actions = assessmentForm.querySelector("[data-assessment-actions]");
  const copyButton = assessmentForm.querySelector("[data-copy-assessment]");
  const mailLink = assessmentForm.querySelector("[data-assessment-mail]");
  const whatsappLink = assessmentForm.querySelector("[data-assessment-whatsapp]");

  assessmentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!assessmentForm.checkValidity()) {
      assessmentForm.reportValidity();
      return;
    }

    const data = new FormData(assessmentForm);
    const inquiry = [
      "KB World Free Site Assessment Request",
      "",
      `Service type: ${data.get("serviceType")}`,
      `Project location: ${data.get("location")}`,
      `Project size: ${data.get("projectSize")}`,
      `Timeline: ${data.get("timeline")}`,
      "",
      "Please contact me to schedule the assessment.",
    ].join("\n");

    if (status) {
      status.hidden = false;
      status.innerHTML = "<strong>Inquiry ready.</strong><span>Copy the details or open an email draft to send this request.</span>";
    }

    if (summary) {
      summary.hidden = false;
      summary.value = inquiry;
    }

    if (actions) actions.hidden = false;

    if (mailLink) {
      const subject = encodeURIComponent("KB World Free Site Assessment Request");
      const body = encodeURIComponent(inquiry);
      mailLink.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
    }

    if (whatsappLink) {
      whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiry)}`;
    }
  });

  if (copyButton && summary) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(summary.value);
        copyButton.textContent = "Copied";
      } catch {
        summary.select();
        document.execCommand("copy");
        copyButton.textContent = "Copied";
      }
      window.setTimeout(() => {
        copyButton.textContent = "Copy Inquiry";
      }, 1600);
    });
  }
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  const salesEmail = "kbwsales26@gmail.com";
  const whatsappNumber = "639560820266";
  const status = contactForm.querySelector("[data-contact-status]");
  const summary = contactForm.querySelector("[data-contact-summary]");
  const actions = contactForm.querySelector("[data-contact-actions]");
  const copyButton = contactForm.querySelector("[data-copy-contact]");
  const mailLink = contactForm.querySelector("[data-contact-mail]");
  const whatsappLink = contactForm.querySelector("[data-contact-whatsapp]");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const inquiry = [
      "KB World Website Inquiry",
      "",
      `Name: ${data.get("name")}`,
      `Contact: ${data.get("contact")}`,
      `Service type: ${data.get("serviceType")}`,
      `Project location: ${data.get("location")}`,
      "",
      "Project details:",
      `${data.get("details")}`,
    ].join("\n");

    if (status) {
      status.hidden = false;
      status.innerHTML = "<strong>Inquiry ready.</strong><span>Copy the details, open an email draft, or send it on WhatsApp.</span>";
    }

    if (summary) {
      summary.hidden = false;
      summary.value = inquiry;
    }

    if (actions) actions.hidden = false;

    if (mailLink) {
      mailLink.href = `mailto:${salesEmail}?subject=${encodeURIComponent("KB World Website Inquiry")}&body=${encodeURIComponent(inquiry)}`;
    }

    if (whatsappLink) {
      whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiry)}`;
    }
  });

  if (copyButton && summary) {
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(summary.value);
        copyButton.textContent = "Copied";
      } catch {
        summary.select();
        document.execCommand("copy");
        copyButton.textContent = "Copied";
      }
      window.setTimeout(() => {
        copyButton.textContent = "Copy Inquiry";
      }, 1600);
    });
  }
}
