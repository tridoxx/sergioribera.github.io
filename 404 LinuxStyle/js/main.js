var index = 0;
var indexInicio = 0;
var c = document.getElementById('c');
var okText = "[<code style=\"color:green\">&nbsp;&nbsp;OK&nbsp;&nbsp;</code>]&nbsp;";
var keyPressActive = false;
document.addEventListener('keydown', function(event) {
    if(keyPressActive){
        if(event.keyCode == 8){
            c.innerHTML = c.innerHTML.substring(0, c.innerHTML.length - 1);
        }
        else if(event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 35 &&
            event.keyCode != 36 && event.keyCode != 13 && event.keyCode != 34 && event.keyCode != 33 &&
            event.keyCode != 13 && event.keyCode != 144 && event.keyCode != 9 && event.keyCode != 18 && 
            event.keyCode != 113 && event.keyCode != 114 && event.keyCode != 115 && event.keyCode != 117 &&
            event.keyCode != 123){
            c.innerHTML += event.key;
        }
        if(event.key == "1"){
            c.innerHTML += textBye;
            c.scrollTo(0, c.scrollHeight);
            $(this).delay(1000).queue(function() {
                window.location.href = window.location.protocol + "//" + window.location.host;
                $(this).dequeue();
            });
            keyPressActive = false;
        }else if(event.key == "2"){
            c.innerHTML += textContact;
            c.scrollTo(0, c.scrollHeight);
        }
        
    }
});

function LoadNextText(){
    if(index < texts.length){
        let e = texts[index];
        c.innerHTML += "<p>" + (e.hasOK ? okText : "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;") + "<code>" + e.text + "</code></p>";
        let t = e.time;
        index++;
        c.scrollTo(0, c.scrollHeight);
        $(this).delay(t).queue(function() {
            LoadNextText();
            $(this).dequeue();
        });
    } else {
        if(indexInicio == 0)
            c.innerHTML = "";
        if(indexInicio < textsInicio.length){
            let e = textsInicio[indexInicio];
            c.innerHTML += e.text;
            indexInicio++;
            c.scrollTo(0, c.scrollHeight);
            $(this).delay(1000).queue(function() {
                LoadNextText();
                $(this).dequeue();
            });
        }
        if(indexInicio == textsInicio.length){
            keyPressActive = true;
            $("#input_trampa").prompt();
            $("#input_trampa").focus();
            $("#input_trampa").click();
        }
        c.scrollTo(0, c.scrollHeight);
    }
}