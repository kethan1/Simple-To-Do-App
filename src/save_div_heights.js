var div = document.getElementById("to_do_lists")
var divChildren = div.children

if (get_Save_Div_Heights()) {
    document.addEventListener("DOMContentLoaded", function(event) { 
        for (let divChild of divChildren) {
            console.log(divChild)
            height_and_width = localStorage.getItem(divChild.children[0].children[0].children[0].children[0].children[0].innerHTML)
            if (height_and_width !== null) {
                // divChild.style.width = height_and_width.split("|")[0]+"px"
                divChild.style.width = String(height_and_width.split("|")[0]/document.documentElement.clientWidth*100)+"vw";
                // divChild.style.height = height_and_width.split("|")[1]+"px"
                divChild.style.height = String(height_and_width.split("|")[1]/document.documentElement.clientHeight*100)+"vh";
            }
        }
    });
}


window.onload = function () {
    var myObserver = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.target.children[0].tagName.toLowerCase() == "table") { 
                var elementProperties = {
                    "elementChanged": mutation.target, 
                    "elementListName": mutation.target.children[0].children[0].children[0].children[0].children[0].innerHTML,
                    "width": mutation.target.scrollWidth,
                    "height": mutation.target.scrollHeight
                }
                console.log(elementProperties)
                localStorage.setItem(elementProperties["elementListName"], String(`${elementProperties["width"]}|${elementProperties["height"]}`))
                console.log(localStorage.getItem(elementProperties["elementListName"]))
            }
        }           
    });
    var arr = Array.prototype.slice.call(divChildren)
    arr.forEach(eachChild => {
        myObserver.observe(eachChild, { attributes: true });
    });
};
