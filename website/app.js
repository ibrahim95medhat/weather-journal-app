
const zipStatus=document.getElementById("zipstatus");
const apiKey="&appid=4c84b2e1633bb2e9672406752a2900e3&units=imperial";
const generate=document.getElementById("generate");
const zipCode=document.getElementById("zip");
const status=document.getElementById("feelings");
const baseUrl="https://api.openweathermap.org/data/2.5/forecast?zip=";

//sending data to server using async fn
const postData = async ( url="", data )=>{
    
      const resp = await fetch("http://localhost:3000/sendingData",{

method: 'POST', 
credentials: 'same-origin',
headers: {
'Content-Type': 'application/json',
},
     // Body data type must match "Content-Type" header        
body:JSON.stringify(data), 
    });

      try {
        const newData = await resp.json();
       
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

//getting data from api 
const getWeather=async (baseurl,userData,apikey)=>{
    const response= await fetch(baseurl+userData.zipValue+apikey);
    try{
        zipStatus.innerHTML="" ;
        const data= await response.json();
        if(data.cod!=200){
          zipStatus.innerHTML="invalid zip" ;
        }
        const temp=data.list[0].main.temp
        const date=data.list[0].dt_txt
        comData={
        temp:temp,
        date:date,
        }
        return comData;
    }
    catch(error){
      console.log("error",zipcode)  ;
        
    }
}
//getting data from server and updating ui
const gettingData = async () =>{
    const request = await fetch('http://localhost:3000/gettingData');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData);
    // Write updated data to DOM elements
    for(let i=0;i<allData.length;i++){
       
    document.getElementById('temp').innerHTML = Math.round(allData[allData.length-1].temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData[allData.length-1].feel;
   document.getElementById("date").innerHTML =allData[allData.length-1].date;
}
}
    catch(error) {
      console.log("error", error);
      
    }
   }
   // by clicking on generate button a performaction fn will be triggered which inturn trigger getweather,sending data and getting data fns.
function performAction(){
    let userData={
        zipValue:zipCode.value+",",
        feeling:status.value,
    }
    getWeather(baseUrl,userData,apiKey).then(function (data){
         postData("/sendingData",{temp:data.temp,feel:userData.feeling,date:data.date});
    }).then(function(data){
        gettingData()
    });
}
//triggering perform action fn on click
generate.addEventListener("click",performAction);

