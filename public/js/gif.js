function getgiphy() {
    $.ajax({
        url: 'http://localhost:3000/getgif',
        method: 'POST',
        data: {
            userSearch: gif_keyword.value
        },
        success: function(response) {
            console.log(response);
            gif_container.innerHTML = '';
            response.data.map(function(item) {
                console.log(item);
                var slideContainer = document.createElement("div");
                slideContainer.className = "w3-display-container mySlides";
                let gifImage = document.createElement("img");
                gifImage.id = item.id;
                gifImage.src = "../images/ajax-loader.gif";

                //let imageSrc = item.images.fixed_height.url;
                /*
                gifImage.onload = function() {
                    console.log("here");
                    console.log(imageSrc);
                    gifImage.src = imageSrc;
                }*/
                var slideTextContainer = document.createElement("div");
                slideTextContainer.className = "w3-display-bottomleft w3-large w3-container w3-padding-16 w3-black";
                slideTextContainer.innerText = item.title;
                slideContainer.appendChild(gifImage);
                slideContainer.appendChild(slideTextContainer);
                /*
                var htmlData = `<div class="w3-display-container mySlides">
                                    <img src=` + item.images.fixed_height.url + ` style="width:100%" />
                                    <div class="w3-display-bottomleft w3-large w3-container w3-padding-16 w3-black">
                                    ` + item.title + `
                                    </div>
                                </div>`;
                */
                gif_container.appendChild(slideContainer);

                var imageLoader = new Image();
                imageLoader.id = item.id;
                imageLoader.onload = function() {
                    gifImage.style.width = "100%";
                    document.getElementById(this.id).src = this.src;
                    document.getElementById(this.id).style.width = "100%";
                }
                imageLoader.src = item.images.fixed_height.url;

                gif_container.innerHTML += `<button class="w3-button w3-display-left w3-black" onclick="plusDivs(-1)">&#10094;</button>
                <button class="w3-button w3-display-right w3-black" onclick="plusDivs(1)">&#10095;</button>`;
                showDivs(slideIndex);
            });
        },
        error: function(status, errorThrown) {
            console.log(status);
        }
    });
}

var slideIndex = 1;

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}