const scriptURL = "https://script.google.com/macros/s/AKfycbxIkEqoP5Y5OikX4xf5re-AoM73-AJjgWs-guShgAXzGALtgASj-TRnSydMf_RszDy3/exec";

const form = document.getElementById("applicationForm");
const messageBox = document.getElementById("messageBox");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  messageBox.style.display = "none";

  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();

  // Mobile Validation
  if (!/^[0-9]{10}$/.test(mobile)) {

    showMessage("Enter valid 10 digit mobile number", "error");
    return;

  }

  // Email Validation
  if (!validateEmail(email)) {

    showMessage("Enter valid email address", "error");
    return;

  }

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const formData = {

    fullName: document.getElementById("fullName").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    mobile: mobile,
    email: email,
    college: document.getElementById("college").value,
    university: document.getElementById("university").value,
    location: document.getElementById("location").value,
    address: document.getElementById("address").value,
    qualification: document.getElementById("qualification").value,
    course: document.getElementById("course").value,
    skills: document.getElementById("skills").value,
    languages: document.getElementById("languages").value,
    relocate: document.getElementById("relocate").value,
    studies: document.getElementById("studies").value,
    shiftWork: document.getElementById("shiftWork").value,
    passport: document.getElementById("passport").value,
    license: document.getElementById("license").value

  };

  try {

    const response = await fetch(scriptURL, {

      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify(formData)

    });

    const text = await response.text();

    const result = JSON.parse(text);

    if (result.status === "success") {

      showMessage(result.message, "success");

      form.reset();

    } else {

      showMessage(result.message, "error");

    }

  } catch (error) {

    console.log(error);

    showMessage("Something went wrong", "error");

  }

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Application";

});

function showMessage(message, type) {

  messageBox.style.display = "block";

  messageBox.className = type;

  messageBox.innerText = message;

}

function validateEmail(email) {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}