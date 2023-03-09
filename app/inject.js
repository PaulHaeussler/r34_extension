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
        var search = ""
        if(input !== undefined){
         search = input.value.replace(" ", "");
        }
        var postList = document.getElementById("post-list");


        var match = false;
        response.split("=====").forEach(function(item){
            if(item.replace(" ", "") === "") return;
            if(search === item) {
                match = true;
                console.log(item + " matched!")
            }

            var tags = document.getElementById("tag-sidebar");
            if(tags !== null){
                const listArray = Array.from(tags.children);
                listArray.forEach((item2) => {
                    var tmp = item2.innerHTML.split("</a>\n<span class=\"tag-count\">")
                    if(tmp.length > 1) {
                        if(postList === null){
                            var tmp2 = tmp[0].split(">");
                        } else {
                            var tmp2 = tmp[0].split(">\n");
                        }

                        var tmp3 = tmp2[tmp2.length - 1].trim();
                        if (tmp3.replace(new RegExp(' ', "g"), "_") === item || tmp3 === item || tmp3.replace(' ', '_') === item){
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
            }

            //identify img page
            if(window.location.href.includes("id=") && postList !== null){
                //resize img: 20px padding from content + 200px sidebar + 12.8px margin = 232.8px + 25px für padding zum rand = screen size - 252px
                var img = document.getElementById("image")

                var width = Math.round(screen.width - 257)
                if(img.getAttribute("width") > width || img.getAttribute("height") < 1600){
                    img.removeAttribute("height")
                    img.removeAttribute("width")
                    img.style.cssText = "height: 100%; width: " + width.toString() + "px;"
                }
            }




            if(postList === null){
            // favorites

                var content = document.getElementById("content").getElementsByClassName("thumb")
                var arr = Array.from(content)
                arr.forEach((ii) => {
                    var img = ii.children[0].children[0]
                    img.getAttribute('title').split(' ').forEach((tag) => {
                        if(item === tag){
                            console.log("Matched " + tag)
                           if(img.style.border !== ""){
                                img.style = "border:10px outset #B300FF";
                           } else {
                                img.style = "border:10px outset #5A00FF";
                           }
                        }
                    })

                })
            } else {
            // Normal search result page
                var content = postList.getElementsByClassName("content")[0];

                    var divSpans = content.getElementsByClassName('image-list')[0];
                    arr = Array.from(divSpans.getElementsByClassName('thumb'))
                    arr.forEach((item2) => {
                       var a = item2.getElementsByTagName('a')[0];
                       if (a === undefined) return;
                       var img = a.getElementsByTagName('img')[0];
                       if (img === undefined) return;

                       var alt = img.getAttribute('alt');
                       if(alt === null) {
                        alt = a.getElementsByTagName('img')[1];
                       }


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
            }

        });

        if(match) {
            input.style.color = "white";
            input.style.backgroundColor = "#5A00FF";
        }
    })