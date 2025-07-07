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





Math.random() → 0.5 (example)
Math.random() * (100 - 1 + 1) → 0.5 * 100 → 50
Math.floor(50) + 1 → 50 + 1 = 51



