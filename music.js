/*
*  Author : Abhinaya Ramchandran
* 
*/
var api_key = "PUT YOUR API KEY HERE";

function sendRequest () {

    /* Section 1 : Artist Info */
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var url =JSON.stringify(json.artist["url"]);
            /* 
            * An additional JSON.parse is used here to escape 
            * the new lines and quotes within the summary field
            */
            var bio ="<p>"+ JSON.parse(JSON.stringify(json.artist["bio"]["summary"]))+"</p>";
            document.getElementById("name").innerHTML = "<h1>" + json.artist["name"]+"</h1>"
            document.getElementById("link").innerHTML = "<a href = " + url  + ">"+url+" </a>";
            document.getElementById("biography").innerHTML = bio;
            document.getElementById("picture").src = json.artist.image[2]["#text"];
        }
    };
    xhr.send(null);

    /* Section 2 : Getting top Albums */
    method = "artist.gettopalbums";
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr2.setRequestHeader("Accept","application/json");
    var list="<h2>Top Albums</h2>";
    xhr2.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var topAlbums =json.topalbums.album;

            /* 
            * The number of top Albums is limited to 
            *  10 to make the web page shorter
            */

            if (topAlbums.length > 10){
                top_length = 10;
            }
            for (var i=0;i < top_length ;i++){
                if (topAlbums[i].name == "(null)") {continue;}
                list += "<h3>" +topAlbums[i].name +" </h3>";
                list += "<br/>";
                list += "<img src=\" "+topAlbums[i].image[2]["#text"] + "\"/>" ;
            }

            document.getElementById("listOfAlbums").innerHTML = list;
        }
    };
    xhr2.send(null);

    /* Section 3 : Getting Similar Artists */
    method = "artist.getsimilar";
    var xhr3 = new XMLHttpRequest();
    xhr3.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr3.setRequestHeader("Accept","application/json");
    var s_list="<h2>Similar Artists</h2> <ul> ";

    xhr3.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var similar =json.similarartists.artist;
            /*
            * The number of similar artisits is limited to 10 
            *  to make the web page shorter
            */
            if (similar.length > 10) {
                length = 10;
            }
            for (var i=0; i < length; i++){
                if (similar[i].name == "(null)") {continue;}
                s_list += " <li>" +similar[i].name +" </li> ";
            }
            s_list += "</ul>"
            document.getElementById("similarArtists").innerHTML = s_list;
        }
    };
    xhr3.send(null);


    
}
