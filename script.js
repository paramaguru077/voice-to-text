const result= document.getElementById("result");
let recognition;



function startConverting(){
    //checking api supports to browser
    if("webkitSpeechRecognition" in window){
        recognition = new webkitSpeechRecognition();
        setupRecognition(recognition);
        recognition.start();
    }

}

function setupRecognition(recognition){
    recognition.continuous= true;

    recognition.interimResults= true; // listen voice while speaking

    recognition.lang='en-US';

    recognition.onresult = function(event){
        console.log(event);

        const{finalTranscript,interTranscript}=processResult(event.results);
        let arr=[finalTranscript+interTranscript];
        localStorage.setItem("voices",JSON.stringify(arr))

        result.innerHTML = finalTranscript+interTranscript;

    }


}

function processResult(results){
    let finalTranscript = ""; // after speaks
    let interTranscript="";
    for(let i=0;i<results.length;i++){
        let transcript = results[i][0].transcript;
       // transcript.replace("\n","<br>");
        if(results[i].isFinal){
            finalTranscript += transcript;
        }
        else{
            interTranscript +=transcript;
        }
    }
    return { finalTranscript,interTranscript}

}
function stopConverting(){
    if(recognition){
        recognition.stop();
    }

}
function previous() {
    let get = JSON.parse(localStorage.getItem("voices")) || [];
    console.log(get);
    let reslt = document.getElementById("result"); // Assuming result is an HTML element with id="result"
    get.forEach((gett) => {
        reslt.innerHTML = gett;
    });
}
