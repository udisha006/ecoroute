
const mongoose =require("mongoose");
mongoose.set('strictQuery', true);
const db =mongoose.connect('mongodb+srv://salvin:$sr2411@cluster0.9xbdn6y.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {console.log("sucessfull connected");

//-----------------------------------------------------creating a function-------------------
const Register = require("./modals/nextstation");
var getDetails = require('./dummy');
const registerD = require("./modals/nextstation");



var currentPercentage = getDetails.dbattery;
var PerMinCharge =getDetails.perminuteC;

//--------
var currentCharge =getDetails.currentCh;
var MileageCar =getDetails.milageC;

function chargingTime(a,b){
  var current = a; //currentPercentage;
  var modalC = b; //PerMinCharge;

  var time = 0;
  var required = 100-current;
  time = required*modalC;
  console.log(time);

}
function chargingfornext(a,b){
  var requiredF = a; //requiredPercentage;
  var modalC = b; //PerMinCharge;

  var time = 0;
  
  time = requiredF*modalC;  
  console.log("time required ");
  console.log(time);

}
function distance(a,b){
  var current = a; //currentCharge;
  var milage = b; //MileageCar;

  var perMilage = 0;
  
  perMilage = current*milage;
  console.log(perMilage);

}

function chargerequired(){
  var currentBattery =10;
  var nextchargeEv = 100;
  var milage = 1.2;
  var requiredT = nextchargeEv/milage;
  console.log(requiredT);

  var want = requiredT- currentBattery;
console.log("per required")
  console.log(want);

  chargingfornext(want,PerMinCharge);


}
chargingTime(currentPercentage,PerMinCharge);
distance(currentCharge,MileageCar);

chargerequired();
//let path
// var resultt = Register.find({id:"1"})
 
  

 
 

//Register.find({currentCharge:{$elemMatch:{email : "salvinrai24@gmail.com"}}});
//console.warn(Register.find({currentCharge:{$elemMatch:{email : "salvinrai24@gmail.com"}}}));




})
.catch((err)=> console.log(err));