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
    
    document.querySelectorAll('body.page__article .block-field-blocknodearticlefield-content table').forEach(function(table, count) {
        // for table identifier, unique each table
        const tableParent = table.parentElement;
        tableParent.classList.add(`article-table-responsive-script-${count}`);
        
        // add same class to all tables, for styling
        tableParent.parentElement.classList.add("article-table-responsive-script-container"); 
        tableParent.classList.add("article-table-responsive-script");
        
        // determine if there is overflow
        if(tableParent.offsetWidth < tableParent.scrollWidth) {
            // append two <div>s for fade effect
            const divGradientRight = document.createElement("div");
            divGradientRight.setAttribute("class", `gradient-hidden table-gradient-overlap-right-script table-gradient-overlap-right-script-${count}`);
            divGradientRight.setAttribute("id", "table-gradient-overlap-right-script-id");
            tableParent.parentElement.appendChild(divGradientRight);
            const divGradientLeft = document.createElement("div");
            divGradientLeft.setAttribute("class", `gradient-hidden table-gradient-overlap-left-script table-gradient-overlap-left-script-${count}`);
            divGradientLeft.setAttribute("id", "table-gradient-overlap-left-script-id");
            tableParent.parentElement.appendChild(divGradientLeft);

            // insert arrows after the table for navigation
            const btnArrowRight = document.createElement("span");
            btnArrowRight.setAttribute("id", "btn-slide-right");;
            btnArrowRight.setAttribute("class", `btn-hidden right-arrow-script right-arrow-script-${count}`);
            tableParent.parentElement.appendChild(btnArrowRight);
            const btnArrowLeft = document.createElement('span');
            btnArrowLeft.setAttribute('id', "btn-slide-left");;
            btnArrowLeft.setAttribute("class", `btn-hidden left-arrow-script left-arrow-script-${count}`);
            tableParent.parentElement.appendChild(btnArrowLeft);

        
            // Declare variables for container, max scroll left, left and right buttons
            // var container = $('.article-table-responsive-script-'+count)[0];
            const maxScrollLeft = tableParent.scrollWidth - tableParent.clientWidth;
            // const btnSlideLeft = $(`.left-arrow-${count}`);
            // const btnSlideRight = $(`.right-arrow-${count}`);
            // const tableGradientOverlapLeft = $(`.table-gradient-overlap-left-script-${count}`);
            // const tableGradientOverlapRight = $(`.table-gradient-overlap-right-script-${count}`);
        
            // Right Arrow Click
            btnArrowRight.addEventListener('click', function() {
                console.log('right arrow button clicked from embed script');
                sideScrollScript(tableParent, 'right', 25, 100, 10);

                // If scrolled to right and there is more to scroll
                if(tableParent.scrollLeft >= 0) {
                    btnArrowLeft.classList.remove("btn-hidden");
                    divGradientLeft.classList.remove("gradient-hidden");
                }
                // If scrolled to right and max is reached
                if(tableParent.scrollLeft > maxScrollLeft-50) {
                    btnArrowRight.classList.add("btn-hidden");
                    divGradientRight.classList.add("gradient-hidden");
                }
            });
        
            // Left Arrow Click
            btnArrowLeft.addEventListener('click', function() {
                console.log('left arrow button clicked from embed script');
                sideScrollScript(tableParent, 'left', 25, 50, 10);

                if(tableParent.scrollLeft < 23){
                    btnArrowLeft.classList.add("btn-hidden");
                    divGradientLeft.classList.add("gradient-hidden");
                }
                if(tableParent.scrollLeft < maxScrollLeft-1) {
                    btnArrowRight.classList.remove("btn-hidden");
                    divGradientRight.classList.remove("gradient-hidden");
                }
            });
        
            // Scroll Function on click
            function sideScrollScript(element, direction, speed, distance, step) {
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
        
            function updateTableParent() {
                if(tableParent.scrollLeft >= 0) {
                    btnArrowLeft.classList.remove("btn-hidden");
                    divGradientLeft.classList.remove("gradient-hidden");
                }
                if(tableParent.scrollLeft > maxScrollLeft-1) {
                    btnArrowRight.classList.add("btn-hidden");
                    divGradientRight.classList.add("gradient-hidden");
                }
                if(tableParent.scrollLeft < 23){
                    btnArrowLeft.classList.add("btn-hidden");
                    divGradientLeft.classList.add("gradient-hidden");
                }
                if(tableParent.scrollLeft < maxScrollLeft-1) {
                    btnArrowRight.classList.remove("btn-hidden");
                    divGradientRight.classList.remove("gradient-hidden");
                }
            }
            tableParent.onscroll = ()=>{
                updateTableParent();
            }
            updateTableParent();
        }
    });
}, 3000);
