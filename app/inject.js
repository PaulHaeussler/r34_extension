window.onload=function(){
    console.log("page load!");
}

fetch("http://hentai.bilbosjournal.com/allGroups", {headers: [
        ['Content-Type', 'application/x-www-form-urlencoded'],
        ['Content-Type', 'multipart/form-data'],
        ['Content-Type', 'text/plain'],
        ['charset', 'utf-8'],
    ]})
    .then(response => response.text())
    .then((response) => {
        console.log(response)
        var input = document.getElementsByName("tags")[0];
        var search = input.value.replace(" ", "");




        var match = false;
        response.split("=====").forEach(function(item){
            if(item.replace(" ", "") === "") return;
            if(search === item) {
                match = true;
                console.log(item + " matched!")
            }

            var tags = document.getElementById("tag-sidebar");
            const listArray = Array.from(tags.children);
            listArray.forEach((item2) => {
                var tmp = item2.innerHTML.split("</a>")
                if(tmp.length > 1) {
                    var tmp2 = tmp[0].split(">");
                    var tmp3 = tmp2[tmp2.length - 1];
                    if (tmp3.replace(" ", "_") === item.replace(" ", "")){
                        console.log(tmp3);
                        item2.className = "";
                        const arr = Array.from(item2.children);
                        arr.forEach((item3) => {
                            item3.style.color = "white";
                            item3.style.backgroundColor = "#5A00FF";
                        })
                    }
                }
            });

            var postList = document.getElementById("post-list");
            if(postList === null) return;
            var content = postList.getElementsByClassName("content")[0];

                var divSpans = content.getElementsByTagName('span');
                arr = Array.from(divSpans)
                arr.forEach((item2) => {
                   var a = item2.getElementsByTagName('a')[0];
                   if (a === undefined) return;
                   var img = a.getElementsByTagName('img')[0];
                   if (img === undefined) return;

                   var alt = img.getAttribute('alt');


                   alt.split(" ").forEach((item3) => {
                       if(item3 === "") return;
                       if(item3 === item){
                           if(img.style.border !== ""){
                                img.style = "border:10px outset #B300FF";
                           } else {
                                img.style = "border:10px outset #5A00FF";
                           }
                       }
                   });
                });
        });

        if(match) {
            input.style.color = "white";
            input.style.backgroundColor = "#5A00FF";
        }
    })
    .catch(err => console.log(err))