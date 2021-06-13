var divChildren = document.getElementById("to_do_lists").children;

if (get_Save_Div_Heights()) {
    document.addEventListener("DOMContentLoaded", function(event) { 
        for (let divChild of divChildren) {
            height_and_width = localStorage.getItem(divChild.children[0].children[0].children[0].children[0].children[0].innerHTML)
            if (height_and_width !== null) {
                divChild.style.width = String(height_and_width.split("|")[0]/document.documentElement.clientWidth*100)+"vw";
                divChild.style.height = String(height_and_width.split("|")[1]/document.documentElement.clientHeight*100)+"vh";
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    var myObserver = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.target.children[0].tagName.toLowerCase() == "table") { 
                var elementProperties = {
                    "elementListName": mutation.target.children[0].children[0].children[0].children[0].children[0].innerHTML,
                    "width": mutation.target.scrollWidth,
                    "height": mutation.target.scrollHeight
                }
                localStorage.setItem(elementProperties["elementListName"], String(`${elementProperties["width"]}|${elementProperties["height"]}`))
            }
        }           
    });
    Array.prototype.slice.call(divChildren).forEach(eachChild => {
        myObserver.observe(eachChild, { attributes: true });
    });
});
