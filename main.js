
prediccion1="";
prediccion2="";
Webcam.set({
    width: 350, height: 300, image_format:'png', png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function tomar_foto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="imagen_capturada" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T2NSHGuOW/model.json', modelLoaded);
function modelLoaded(){
    console.log('modelo cargado correctamente');
}
function speak(){
    var synth= window.speechSynthesis;
    primera_prediccion="la primera prediccion es:" + prediccion1;
    segunda_prediccion="la segunda prediccion es:" + prediccion2;
    var utterThis = new SpeechSynthesisUtterance(primera_prediccion + segunda_prediccion);
    synth.speak(utterThis);
}
function check(){
    img= document.getElementById('imagen_capturada');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediccion1=results[0].label;
        prediccion2=results[1].label;
        speak();
        if(results[0].label == "feliz"){
           document.getElementById("update_emoji").innerHTML ="&#128513";
        }
        if(results[1].label == "feliz"){
            document.getElementById("update_emoji2").innerHTML ="&#128513";
        }
        if(results[0].label == "enojado"){
            document.getElementById("update_emoji").innerHTML ="&#128548";
        }
        if(results[1].label == "enojado"){
            document.getElementById("update_emoji2").innerHTML ="&#128548";
        }
        if(results[0].label == "triste"){
            document.getElementById("update_emoji").innerHTML ="&#128557";
        }
        if(results[1].label == "triste"){
            document.getElementById("update_emoji2").innerHTML ="&#128557";
        }


    }
}