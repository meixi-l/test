document.querySelectorAll('.article-table-responsive-container').forEach((tableContainer) => {
    tableContainer.classList.remove('article-table-responsive-container');
});

document.querySelectorAll('.article-table-responsive').forEach((tableContainer) => {
    tableContainer.classList.remove('article-table-responsive');
});

document.querySelectorAll('.left-arrow, .right-arrow, .table-gradient-overlap-left, .table-gradient-overlap-right').forEach((element) => {
    element.remove();
});

const css = `
    /* For webview tables rendered in mobile apps, make sure they are scrollable */
    body:not(:has(main.main-content)) table,
    body.page__article .block-field-blocknodearticlefield-content table {
        overflow-x: hidden;
        /* overflow-x: auto; */
        white-space: nowrap;
        display: block;
        /* scroll-behavior: smooth; */
    }

    .article-table-container {
        position: relative;
        /* scroll-behavior: smooth; */
    }

    .article-table-container .article-table-right-arrow {
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        right: 5px;
    }
    .article-table-container .article-table-left-arrow {
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
        left: 5px;
    }
    .article-table-container .article-table-right-arrow, .article-table-container .article-table-left-arrow {
        width: 1em;
        height: 1em;
        border-top: 0.3em solid #000;
        border-right: 0.3em solid #000;
        border-radius: 3px;
        display: inline-block;
        font-style: normal;
        position: absolute;
        top: 50%;
        cursor: pointer;
        z-index: 1;
    }
    .article-table-container .article-table-right-arrow.hidden, .article-table-container .article-table-left-arrow.hidden {
        display: none;
    }
    .article-table-container .article-table-gradient-overlap-left, .article-table-container .article-table-gradient-overlap-right {
        position: absolute;
        width: 24px;
        height: 100%;
        top: 1px;
        z-index: 1;
    }
    .article-table-container .article-table-gradient-overlap-left.hidden, .article-table-container .article-table-gradient-overlap-right.hidden {
        display: none;
    }
    .article-table-container .article-table-gradient-overlap-left {
        background-image: linear-gradient(-90deg, rgba(255, 255, 255, 0) 5.73%, rgba(255, 255, 255, 0.95) 80.21%);
        left: 0;
    }
    .article-table-container .article-table-gradient-overlap-right {
        background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 5.73%, rgba(255, 255, 255, 0.95) 80.21%);
        right: 0;
    }
`;
const head = document.head || document.getElementsByTagName('head')[0];
const style = document.createElement('style');
head.appendChild(style);

if (style.styleSheet){
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.querySelectorAll('body:not(:has(main.main-content)) table, body.page__article .block-field-blocknodearticlefield-content table').forEach(function(table) {
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('article-table-container');
    table.parentNode.replaceChild(tableContainer, table);
    tableContainer.appendChild(table);

    // determine if there is overflow
    if(table.offsetWidth < table.scrollWidth) {
        // insert arrows after the table for navigation
        const btnArrowLeft = document.createElement('span');
        btnArrowLeft.setAttribute("class", "hidden article-table-left-arrow");
        tableContainer.appendChild(btnArrowLeft);
        const btnArrowRight = document.createElement("span");
        btnArrowRight.setAttribute("class", "hidden article-table-right-arrow");
        tableContainer.appendChild(btnArrowRight);

        // // append two <div>s for fade effect
        const divGradientLeft = document.createElement("div");
        divGradientLeft.setAttribute("class", "hidden article-table--gradient-overlap-left");
        tableContainer.appendChild(divGradientLeft);
        const divGradientRight = document.createElement("div");
        divGradientRight.setAttribute("class", "hidden article-table--gradient-overlap-right");
        tableContainer.appendChild(divGradientRight);
    
        // Declare variables for container, max scroll left, left and right buttons
        const maxScrollLeft = table.scrollWidth - table.clientWidth;

        btnArrowRight.addEventListener('click', function() {
            sideScroll(table, 'right', 25, 100, 10);

            // If scrolled to right and there is more to scroll
            if(table.scrollLeft >= 0) {
                btnArrowLeft.classList.remove("btn-hidden");
                divGradientLeft.classList.remove("gradient-hidden");
            }
            // If scrolled to right and max is reached
            if(table.scrollLeft > maxScrollLeft-50) {
                btnArrowRight.classList.add("btn-hidden");
                divGradientRight.classList.add("gradient-hidden");
            }
        });
        
            // Left Arrow Click
        btnArrowLeft.addEventListener('click', function() {
            sideScroll(table, 'left', 25, 50, 10);

            if(table.scrollLeft < 23){
                btnArrowLeft.classList.add("btn-hidden");
                divGradientLeft.classList.add("gradient-hidden");
            }
            if(table.scrollLeft < maxScrollLeft-1) {
                btnArrowRight.classList.remove("btn-hidden");
                divGradientRight.classList.remove("gradient-hidden");
            }
        });
        
            // Scroll Function on click
        function sideScroll(element, direction, speed, distance, step) {
            var scrollAmount = 0;
            var slideTimer = setInterval(function () {
                if (direction == 'left') {
                    element.scrollLeft -= step * 2;
                } else {
                    element.scrollLeft += step * 1;
                }
                scrollAmount += step;
                if (scrollAmount >= distance) {
                    window.clearInterval(slideTimer);
                }
            }, speed);
        }

        const updateTableArrows = () => {
            if(table.scrollLeft >= 0) {
                btnArrowLeft.classList.remove("hidden");
                divGradientLeft.classList.remove("hidden");
            }
            if(table.scrollLeft > maxScrollLeft-1) {
                btnArrowRight.classList.add("hidden");
                divGradientRight.classList.add("hidden");
            }
            if(table.scrollLeft < 23){
                btnArrowLeft.classList.add("hidden");
                divGradientLeft.classList.add("hidden");
            }
            if(table.scrollLeft < maxScrollLeft-1) {
                btnArrowRight.classList.remove("hidden");
                divGradientRight.classList.remove("hidden");
            }
        };

        table.addEventListener('scroll', () => { updateTableArrows(table) });
        updateTableArrows(table);
    }
});