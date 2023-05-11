setTimeout(() => {
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
            overflow-y: hidden;
            white-space: nowrap;
            display: block;
        }

        .article-table-container {
            position: relative;
        }

        .article-table-container .article-table-arrow-right {
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            right: 5px;
        }
        .article-table-container .article-table-arrow-left {
            -webkit-transform: rotate(-135deg);
            transform: rotate(-135deg);
            left: 5px;
        }
        .article-table-container .article-table-arrow-right, .article-table-container .article-table-arrow-left {
            width: 1em;
            height: 1em;
            border-top: 0.3em solid #000;
            border-right: 0.3em solid #000;
            border-radius: 3px;
            font-style: normal;
            cursor: pointer;
            z-index: 1;
        }
        .article-table-container .article-table-arrow-container-left, .article-table-container .article-table-arrow-container-right {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            width: 28px;
            height: 100%;
            top: 1px;
            z-index: 1;
        }
        .article-table-container .hidden {
            display: none;
        }
        .article-table-container .article-table-arrow-container-left {
            background-image: linear-gradient(-90deg, rgba(255, 255, 255, 0) 5.73%, rgba(255, 255, 255, 0.95) 80.21%);
            left: 0;
        }
        .article-table-container .article-table-arrow-container-right {
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
            // insert arrows after the table for navigation within containers for fade effect
            const divArrowContainerLeft = document.createElement("div");
            divArrowContainerLeft.setAttribute("class", "hidden article-table-arrow-container-left");
            tableContainer.appendChild(divArrowContainerLeft);
            const btnArrowLeft = document.createElement('span');
            btnArrowLeft.setAttribute("class", "article-table-arrow-left");
            divArrowContainerLeft.appendChild(btnArrowLeft);

            const divArrowContainerRight = document.createElement("div");
            divArrowContainerRight.setAttribute("class", "hidden article-table-arrow-container-right");
            tableContainer.appendChild(divArrowContainerRight);
            const btnArrowRight = document.createElement("span");
            btnArrowRight.setAttribute("class", "article-table-arrow-right");
            divArrowContainerRight.appendChild(btnArrowRight);


            // Declare variables for container, max scroll left, left and right buttons
            const maxScrollLeft = table.scrollWidth - table.clientWidth;

            btnArrowRight.addEventListener('click', function() {
                sideScroll(table, 'right', 25, 100, 10);

                console.log({ scrollLeft: table.scrollLeft, maxScrollLeft });

                // If scrolled to right and there is more to scroll
                if(table.scrollLeft >= 0) {
                    divArrowContainerLeft.classList.remove("hidden");
                }
                // If scrolled to right and max is reached
                if(table.scrollLeft > maxScrollLeft-50) {
                    divArrowContainerRight.classList.add("hidden");
                }
            });

                // Left Arrow Click
            btnArrowLeft.addEventListener('click', function() {
                sideScroll(table, 'left', 25, 50, 10);

                console.log({ scrollLeft: table.scrollLeft, maxScrollLeft });

                if(table.scrollLeft < 23){
                    divArrowContainerLeft.classList.add("hidden");
                }
                if(table.scrollLeft < maxScrollLeft-1) {
                    divArrowContainerRight.classList.remove("hidden");
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
                    divArrowContainerLeft.classList.remove("hidden");
                }
                if(table.scrollLeft > maxScrollLeft-1) {
                    divArrowContainerRight.classList.add("hidden");
                }
                if(table.scrollLeft < 23){
                    divArrowContainerLeft.classList.add("hidden");
                }
                if(table.scrollLeft < maxScrollLeft-1) {
                    divArrowContainerRight.classList.remove("hidden");
                }
            };

            table.addEventListener('scroll', () => { updateTableArrows(table) });
            updateTableArrows(table);
        }
    });
}, 1000);
