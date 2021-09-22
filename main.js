status = "";
img = "";
objects = [];
function preload(){
    audio = loadSound("security_bridge.jpg");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status: object detecting";
}
function modelLoaded(){
    console.log("model loaded!");
    status = true;  
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }

        console.log(results);
        objects = results;

}
function draw(){
    image(video,0,0,380,380);
   if(status != ""){
       r = random(255);
       g = random(255);
       b = ramdom(255);
    objectDetector.detect(video,gotResult);
     for(i=0;i<objects.length;i++){
         if(objects[i].label = "person"){
             document.getElementById("baby_is_detectedornot").innerHTML="baby detected";
             audio.stop ()
            document.getElementById("status").innerHTML="status : objects detected";
            document.getElementById("no._of_objects").innerHTML="number of objects detected are - "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         }
         else{
            document.getElementById("baby_is_detectedornot").innerHTML="baby not detected";
            audio.play();
         }
         if(objects.length<0){
            document.getElementById("baby_is_detectedornot").innerHTML="baby not detected";
            audio.play();
         }
     }
   }
}