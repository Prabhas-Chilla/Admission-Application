function getRandomInt(min, max) {
  min = Math.ceil(min); 
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomInt = getRandomInt(1, 100);
console.log("Random integer between 1 and 100:", randomInt);





let userDetails=[
  {
  email:"chiru@gmail.com",
  password:"1234"

}
,
{
  email:"chirutha@gmail.com",
  password:"3456"
}
]


let applications=[
  {
    applicationId:"",
    courseName:"Btech",
    fullName:"indhuvadhana",
    fatherName:"chiru",
    motherName:"puli",
    aadharNumber:"39885984003999",
    classtenNumber:"029389849048",
    dateofbirth:"31-1-2000",
    email:"chiru@gmail.com",
    phoneNumber:"123455699",
    uploadPhoto:"",
    uploadSignature:""


  },

]

let totalApplications={

  previous:"110",
  total:"120"
}

let admin={

  "admin1":{
    name:"chiru",
    password:"12344"
  },
  "admin2":{
    name:"gandu",
    password:"455677"
  }
}


<script>
      const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      alert("Please log in to continue.");
      window.location.href = "login.html"; // or wherever your login page is
    }
    const courseSelect = document.getElementById("course");
    const branchSelect = document.getElementById("branch");
    const branchGroup = document.getElementById("branch-group");
    const decisionSelect = document.getElementById("approveReject");
    const remarksGroup = document.getElementById("remarks-group");

    const branchesByCourse = {
      BTECH: ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL"],
      MTECH: ["CSE", "VLSI", "Structural Engg", "Thermal Engg"],
      MBA: ["Finance", "HR", "Marketing", "Operations"],
      BCOM: ["General", "Computers", "Taxation"]
    };

    courseSelect.addEventListener("change", function () {
      const selectedCourse = courseSelect.value;
      branchSelect.innerHTML = "";
      if (branchesByCourse[selectedCourse]) {
        branchesByCourse[selectedCourse].forEach(branch => {
          const option = document.createElement("option");
          option.value = branch;
          option.textContent = branch;
          branchSelect.appendChild(option);
        });
        branchGroup.style.display = "block";
      } else {
        branchGroup.style.display = "none";
      }
    });

    decisionSelect.addEventListener("change", function () {
      if (this.value === "rejected") {
        remarksGroup.style.display = "block";
      } else {
        remarksGroup.style.display = "none";
      }
    });

    document.querySelector(".application-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const form = e.target;

      const application = {
        appId: "APP" + Math.floor(Math.random() * 1000000),
        timeRegistered: new Date().toISOString(),
        course: form.course.value,
        branch: form.branch?.value || '',
        fullName: form.fullName.value,
        fatherName: form.fatherName.value,
        motherName: form.motherName.value,
        aadhar: form.aadhar.value,
        hallTicket: form.emcetMarks.value,
        tenthPercentage: form.tenthPercentage.value,
        interPercentage: form.interPercentage.value,
        dob: form.dob.value,
        email: form.email.value,
        phone: form.phone.value,
        photo: form.photo.files[0]?.name || '',
        signature: form.signature.files[0]?.name || '',
        status: form.approveReject.value,
        remarks: form.remarks.value
      };

      // Send to backend (Replace with actual API call)
      fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(application)
      })
      .then(res => res.json())
      .then(data => {
        alert("Application submitted successfully!");
        form.reset();
        branchGroup.style.display = "none";
        remarksGroup.style.display = "none";
      })
      .catch(err => {
        console.error("Submission error:", err);
        alert("Something went wrong!");
      });
    });
  </script>


// Math.random() → 0.5 (example)
// Math.random() * (100 - 1 + 1) → 0.5 * 100 → 50
// Math.floor(50) + 1 → 50 + 1 = 51



