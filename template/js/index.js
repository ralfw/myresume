function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function parseParameter(parameterName, defaultParameter){
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get(parameterName) == null)
        return defaultParameter;
    else
        return urlParams.get(parameterName); // https://stackoverflow.com/a/901144/5964489 
}

//to parse JSON
readTextFile(parseParameter("myresume", "./myresume.json"), function(text){
    var data = JSON.parse(text);
    var titleImage=data.titleimage;
    var profilePic=data.personaldata.image;
    var name=data.personaldata.name;
    var position=data.personaldata.position;
    var shortbio=data.personaldata.shortbio;
    var location=data.personaldata.location;
    var themecolor=data.themecolor;
    data.personaldata.socialmedia.forEach(createElement);  

    //to create theme color
    function ColorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i*2,2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00"+c).substr(c.length);
  }

  return rgb;
}
    var sameColor=ColorLuminance(themecolor, 0);    // same"
    var lightColor= ColorLuminance(themecolor, 1.0);  //  lighter
    var lighterColor= ColorLuminance(themecolor, 2.2);  // lighter
    //var darkColor= ColorLuminance(themecolor, -0.5);  //  darker
   
    document.documentElement.style.setProperty('--main-light-color', lightColor);
    document.documentElement.style.setProperty('--main-lighter-color', lighterColor);


    function createElement(arrayItem, index, array) {
    if(arrayItem.icon==="twitter"){
        if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"'  ><i class='fa fa-twitter'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;

    }else if(arrayItem.icon==="linkedin"){
       if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"' ><i class='fa fa-linkedin '></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;

    }else if(arrayItem.icon==="email"){
       if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href='mailto:"+ arrayItem.url +"' target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"' onclick='return theFunction()'' ><i class='fa fa-envelope '></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;

    }else if(arrayItem.icon==="xing"){
       if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"' ><i class='fa fa-xing'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;

    }else if(arrayItem.icon==="github"){
       if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"' ><i class='fa fa-github'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;

    }else if(arrayItem.icon==="web"){
        if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"'  ><i class='fa fa-globe'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;
       
    }else if(arrayItem.icon==="instagram"){
        if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"'  ><i class='fa fa-instagram'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;
       
    }else if(arrayItem.icon==="facebook"){
        if(arrayItem.tooltip===undefined){arrayItem.tooltip=arrayItem.icon}
        var spanObj = "<span class='social-links'><a href="+ arrayItem.url +"  target='_blank' data-toggle='tooltip' title='"+ arrayItem.tooltip +"' ><i class='fa fa-facebook'></i></a></span>"
        document.getElementById('myList').innerHTML +=spanObj;      
    }             
}
  document.getElementById('header').style.backgroundImage="url("+titleImage+")";
  document.getElementById('profile-pic').src=profilePic; 
  document.getElementById('name').innerHTML=name; 
  document.getElementById('position').innerHTML=position; 
  document.getElementById('shortBio').innerHTML=shortbio; 
  document.getElementById('location').innerHTML=location; 
    document.getElementById('q').href += '?q='+ location;
    document.title= "About: "+name;

//TimeLine -checking whether workhistory is present.
if(data.personaldata.workhistory!==undefined){
  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');
  var dataSet=[];
  data.personaldata.workhistory.map(elem=>{
    if(elem.from!==undefined && elem.until!==undefined){
    var timeline={};
    timeline.content=elem.description;
    timeline.start=elem.from;
    if(elem.until==="today"){
      var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

     timeline.end= [year, month, day].join('-');
    }else{
    timeline.end=elem.until;      
    }
    dataSet.push(timeline);
     }
    });

  var items = new vis.DataSet(dataSet);

  // Configuration for the Timeline
  var options = {
    zoomable:false,
    timeAxis: {scale: 'year', step: 2}
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
  }

//================end of workhistory sequential========================



//================create a Track Record (achievements)=================
if(data.personaldata.workhistory!==undefined){
data.personaldata.workhistory.slice(0).reverse().map(elem=>{

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];    
  if(elem.from!==undefined && elem.until!==undefined){
  const [year, month, day] = elem.from.split("-");
   var fromDate= new Date(year,month-1,day); 
   const [year1, month1, day1] = elem.until.split("-");
   if(elem.until==="today"){
   var toDate= new Date(); 
   }else{
   var toDate= new Date(year1,month1-1,day1);     
   }

    var fromMonth= monthNames[fromDate.getMonth()]
    var toMonth= monthNames[toDate.getMonth()]
   if(elem.until==="today"){
   toMonth= ""; 
   }
   //calculate year months
   var diff = Math.floor(toDate.getTime() - fromDate.getTime());
    var dayonly = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff/dayonly);
    //var months = Math.floor(days/31);
    //var years = Math.floor(months/12);
    var y = 365;
    var y2 = 31;
    var remainder = days % y;
    var casio = remainder % y2;
    var yearNew = (days - remainder) / y;
    var monthNew = (remainder - casio) / y2;
    var calculateYearMonth;
    if(yearNew!==0){
        calculateYearMonth=yearNew+ "yr "+monthNew+"mth";
    }else{
        calculateYearMonth=monthNew+"mth";
    }
    var imageBox="";
    //loop through achievents if present
    if(elem.achievements!==undefined){
        var achievements= elem.achievements.map(data=>{
            tags = []
            if(data.tags!==undefined){
              tags=data.tags.map(tag=>{
                return `&nbsp;<span id="tagModal" class="resume-skill comma-seperated comma-blocks">`+tag+`</span>`
              });
            }
            
            //to get url widget
            var embedLink="";
            if(data.url!==undefined){
                var embedLink=`<h4 class="adUrl" >
                <a class="no-underline" target="_blank" href="`+data.url+`">
                <img src="https://www.google.com/s2/favicons?domain=`+ data.url +`">
                <span class="underline">`+data.url+`</span>
                </a></h4>`
            }

            if(data.images!==undefined){
              imageBox=data.images.map(image=>{
                  return `<div  class="imageBox-image" style="background-image: url(`+image+`)"></div>`
              }).join('');  
            }

            if (tags.length > 0)
              tags = `<i class="fa fa-flash"></i>` + tags

            return `<div class="resume-body resume-details">
              <div><p class="dot themeBackgroundDark"></p></div>
              <div>
              <h5 class="themeColorDark" >`+data.title+`</h5>
              </div>
              <div class="pen themeColorText">
              <p class="tagMargin">`+ data.description+`&nbsp;</p>
              </div>`
              +embedLink+
              `<div class="resume-skills skills-list selectable" >`
              +tags+
              `</div>`
              +
              `<div class="imageBox" >
              `+imageBox+`</div>
              </div>`     
    }).join('');
    }else{
      achievements="";
    }
     

var trackRecord = `<li class='profile-resume normal right first-in-experience has-experience'>
      <span class="line vertical themeBackgroundDark"></span>
        <div class='resume-body resume-body-fixed left'>
          <div class='resume-experience top themeBorderFaded' >
            <span class='experience-connector themeBackgroundDark'>
              <div class="arrow-down"></div>
            </span>
              <a class='experience-item no-icon work' href="`+ elem.website +`" target="_blank">
                <h1>
                  <span >Joined</span>
                   <strong> `+ elem.description +`</strong>
                </h1>
                <h1>as <strong>`+elem.jobtitle+`</strong></h1>
                <h3><img src="https://www.google.com/s2/favicons?domain=`+ elem.website +`">`+fromMonth+" "+year+`</h3>
              </a>
            </div>
          </div>
          `
          +achievements+
          `
          <div class="resume-body resume-body-fixed left">
          <div class="resume-experience bottom themeBorderFaded" >
            <span class="experience-connector themeBackgroundDark">
            <div class="arrow-up"></div>
            </span>
              <a class="experience-item no-icon work">
                <h3>`+toMonth+" "+year1+` [`+calculateYearMonth+`]</h3>
              </a>
            </div>
          </div>           
        </li>`
    }
  //if(elem.from!==undefined && elem.until!==undefined)
    else{
          if(elem.tags!==undefined){
           var tags=elem.tags.map(tag=>{
            return `&nbsp;<span id="tagModal" class="resume-skill comma-seperated comma-blocks">`+tag+`</span>`
        });
         }

         if (tags.length > 0)
          tags = `<i class="fa fa-flash"></i>` + tags

       var trackRecord=  `<li class="">
          
          <div class="point-body point-details" >
            <div>
            <h5 class="themeColorDark" >`+elem.jobtitle+`</h5>
            </div>
            <div class="pen themeColorText">`+elem.description+`
            </div>
            <div>
              <h4 class="adUrl" >
            <a class="no-underline" target="_blank" href="`+elem.website+`">
             <img src="https://www.google.com/s2/favicons?domain=`+ elem.website +`">
            <span class="underline">`+elem.website+`</span>
            </a></h4>
            </div>
            <div class="point-skills skills-list selectable">`
              +tags+
          `</div>
        </li> `
        
    }  
      
  document.getElementById('workHistory').innerHTML +=trackRecord;
//============model on click of image ====================================     
      $('.imageBox-image').click(function(){
        var bg =$(this).css('background-image');
         bg = bg.replace('url(','').replace(')','');
         bg=bg.replace(/['"]+/g, '');
        $("body").addClass("modal-open");

// Get the modal
var modal = document.getElementById('myModal');
// open the modal 
 modal.style.display = "block";
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $("body").removeClass("modal-open")
    }
}


$(function() {
    $('#close').click(function(){
    modal.style.display = "none";
    $("body").removeClass("modal-open")
});
});


$(document).keydown(function(event) { 
  if (event.keyCode == 27) { 
     modal.style.display = "none";
     $("body").removeClass("modal-open")
  }
});


var myNode = document.getElementById("myModal");

while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}   

document.getElementById('myModal').innerHTML +=`<div class="modal-content-image">
<img class="imageBox-image-modal" src="`+bg+`">
<button id ="close" class="closemodal">&times;</button>
</div>
</div>`; 

}); 
//=========the image click modal code end here=========================
});
}

 //=====================clssified Ad====================================
 if(data.classifiedads!==undefined){
var innerAd="";
var classifiedAd = data.classifiedads.map(elem=>{
  if(elem.ads!==undefined){
     innerAd= elem.ads.map(ad=>{
        var progress="";
        var imageBox="";
        if(ad.progress!==undefined){
            var progress=`<div id="myProgress" class="myProgress">
                <div id="myBar" class="myBar" style="width:`+ad.progress+`%"></div>
            </div>`
        }
        var urlfield="";
        if(ad.url!==undefined){
            var urlfield=`<h4 class="adUrl" >
            <a class="no-underline" target="_blank" href="`+ad.url+`">
             <img src="https://www.google.com/s2/favicons?domain=`+ ad.url +`">
            <span class="underline">`+ad.url+`</span>
            </a></h4>`
        }
        if(ad.tags!==undefined){
        var tags=ad.tags.map(tag=>{
            return `&nbsp;<span id="tagModal" class="taglist">`+tag+`</span>`
        });
      }

      if (tags.length > 0)
        tags = `<i class="fa fa-flash"></i>` + tags

        if(ad.images!==undefined){
            imageBox=ad.images.map(image=>{
            return `
                      <div class="imageBox-image" style="background-image: url(`+image+`)">
                      </div>`
              }).join('');  
            }

        return ` <li class="profile-resume">
            <div class="resume-body resume-details">
            <div class="adChart">
                <h5>`+ad.title+`</h5>
            </div>
            `+progress+`
              <div class="embed">
               <p>`+ad.description+`</p>
               </div>
                `+urlfield+`
               <div class="taglist1">`
              +tags+`<div class="imageBox" >`
              +imageBox+`</div>
                </div>
              </div>
            </li>`
   
    }).join('');
   }
return `<section class ="resume-section blocks" style="background-color:`+elem.backgroundcolor+`;">
    <h4 class="section-title themeColorDark">`+elem.caption+`</h4>
    <ul class="points clearfix">`+innerAd +`</ul>
  </section>`

}).join('');

document.getElementById('classifiedAd').innerHTML +=classifiedAd;     

//============model on click of image ====================================     
  $('.imageBox-image').click(function(){
  var bg =$(this).css('background-image');
  bg = bg.replace('url(','').replace(')','');
  bg=bg.replace(/['"]+/g, '');
  $("body").addClass("modal-open");

// Get the modal
var modal = document.getElementById('myModal');
// open the modal 
 modal.style.display = "block";
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $("body").removeClass("modal-open")
    }
}


$(function() {
    $('#close').click(function(){
    modal.style.display = "none";
    $("body").removeClass("modal-open")
});
});


$(document).keydown(function(event) { 
  if (event.keyCode == 27) { 
     modal.style.display = "none";
     $("body").removeClass("modal-open")
  }
});


var myNode = document.getElementById("myModal");

while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}   

document.getElementById('myModal').innerHTML +=`<div class="modal-content-image">
<img class="imageBox-image-modal" src="`+bg+`">
<button id ="close" class="closemodal">&times;</button>
</div>
</div>`; 

}); 
}
//=========the image click modal code end here=========================

//get in touch section
var iconContact="";
if(data.getintouch.mode==="email"){
    var mode="mailto:";
    iconContact=`<i class="fa fa-envelope" aria-hidden="true"style="width: 30px;font-size: medium;"></i>`;
}else{
    var mode="";
        iconContact=`<i class="fa fa-pencil-square" aria-hidden="true" style="width: 30px;font-size: large;"></i>`;
}
var getInTouchElem = `<div>
  <section class="contact">
  <h4 class="contact-title">`+data.getintouch.caption+`</h4>  
    <ul class="contact-section">
      <li class="contact-point">
        <div>
          <h5 class="contact-h5">`+data.getintouch.title+`</h5>
        </div>
        <div class="contact-desc">
          `+data.getintouch.description+`
        </div>
        <div class="contact-div">
            <a class="contact-button" target="_blank" href="`+mode+``+data.getintouch.url+`">`+iconContact+``+data.getintouch.url+`</a>
      </div>
      </li>
    </ul>
  </section>
</div>`
document.getElementById('getInTouch').innerHTML +=getInTouchElem;    

//tags on click
var tagEntry=[];
 var content="";
$('span#tagModal').click(function(){
    var tagName = $(this).text();
    $("body").addClass("modal-open");
//personal data 
if(data.personaldata.workhistory!==undefined){
   data.personaldata.workhistory.reverse().forEach(function (elem) {
      if(elem.achievements===undefined){
        if(elem.tags.includes(tagName)){
        tagEntry.push(elem);
      }
    }else{
      var tagElem=elem.achievements.filter(data=>{
        if(data.tags.includes(tagName)){
        tagEntry.push(data);
      }
      });
    }
}); 
}
    //here the complete json parent avialble

    if(data.classifiedads!==undefined){

  data.classifiedads.forEach(function (elem) {
      elem.ads.filter(function (adElem) {
        if(adElem.tags.includes(tagName)){
        tagEntry.push(adElem);
      }
      });
});
}

// Get the modal
var modal = document.getElementById('myModal');
// open the modal 
 modal.style.display = "block";
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        $("body").removeClass("modal-open")
    }
}


 content= tagEntry.map(tagElem=>{
    var tags="";
    if(tagElem.tags!==undefined){
     var tags=tagElem.tags.map(tag=>{
            return `&nbsp;<span id="tagModal" class="resume-skill comma-seperated comma-blocks">`+tag+`</span>`
        });
    }

    if (tags.length > 0)
      tags = `<i class="fa fa-flash"></i>` + tags

    var modalUrl="";
    if(tagElem.jobtitle===undefined){
       if(tagElem.url!==undefined){
            modalUrl=`<div class="modalUrl"> <h4 class="adUrl" >
            <a class="no-underline" target="_blank" href="`+tagElem.url+`">
             <img src="https://www.google.com/s2/favicons?domain=`+ tagElem.url +`">
            <span class="underline">`+tagElem.url+`</span>
            </a></h4></div>`
          }else{
            modalUrl="";
          }

        return `<div class="modal-body">
              <div>
              <h5 class="themeColorDark" >`+tagElem.title+`</h5>
              </div>
              <div class="pen">
              <p class="tagMargin">`+ tagElem.description+`&nbsp;</p>
              </div>
               `+modalUrl+`
              <div class="resume-skills skills-list selectable modalpad" >`
              +tags+
              `</div>
              </div>`
    }else{
          if(tagElem.website!==undefined){
            modalUrl=`<div class="modalUrl"> <h4 class="adUrl" >
            <a class="no-underline" target="_blank" href="`+tagElem.website+`">
             <img src="https://www.google.com/s2/favicons?domain=`+ tagElem.website +`">
            <span class="underline">`+tagElem.website+`</span>
            </a></h4></div>`
          }else{
            modalUrl="";
          }
         return `<div class="modal-body">
              <div>
              <h5 class="themeColorDark" >`+tagElem.jobtitle+`</h5>
              </div>
              <div class="pen themeColorText">
              <p class="tagMargin">`+ tagElem.description+`&nbsp;</p>
              </div>
                `+modalUrl+`
              <div class="resume-skills skills-list selectable modalpad" >`
              +tags+
              `</div>
              </div>`
    }
  }).join('');

   tagEntry =[];
$(function() {
    $('#close').click(function(){
    modal.style.display = "none";
    $("body").removeClass("modal-open")
});
});
$(document).keydown(function(event) { 
  if (event.keyCode == 27) { 
     modal.style.display = "none";
     $("body").removeClass("modal-open")
  }
});


var myNode = document.getElementById("myModal");

while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}   
document.getElementById('myModal').innerHTML +=`<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title">
<i class="fa fa-flash"></i>&nbsp;`+tagName+`</h1>`+content+`
<div  class="modal-footers text-center"><button id ="close" class="green inline">Close</button></div>
</div>`; 

}); 

});
