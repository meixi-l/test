setTimeout(() => {
    document.querySelectorAll('.article-table-responsive-container').forEach((tableContainer) => {
        tableContainer.classList.remove('article-table-responsive-container');
    });
    
    document.querySelectorAll('.article-table-responsive').forEach((tableContainer) => {
        tableContainer.classList.remove('article-table-responsive');
    });
    
    document.querySelectorAll('body.page__article .block-field-blocknodearticlefield-content table').forEach(function(table, count) {
        // for table identifier, unique each table
        table.parentElement.classList.add(`article-table-responsive-script-${count}`);
        
        // add same class to all tables, for styling
        table.parentElement.parentElement.classList.add("article-table-responsive-script-container"); 
        table.parentElement.classList.add("article-table-responsive-script");
        
        // determine if there is overflow
        if(table.offsetWidth < table.scrollWidth) {
            // insert arrows after the table for navigation
            const btnArrowLeft = document.createElement('span');
            btnArrowLeft.setAttribute('id', "btn-slide-left");;
            btnArrowLeft.setAttribute("class", `btn-hidden left-arrow left-arrow-${count}`);
            table.parentElement.appendChild(btnArrowLeft);
            const btnArrowRight = document.createElement("span");
            btnArrowRight.setAttribute("id", "btn-slide-right");;
            btnArrowRight.setAttribute("class", `btn-hidden right-arrow right-arrow-${count}`);
            table.parentElement.appendChild(btnArrowRight);

            // append two <div>s for fade effect
            const divGradientLeft = document.createElement("div");
            divGradientLeft.setAttribute("class", `gradient-hidden table-gradient-overlap-left table-gradient-overlap-left-${count}`);
            divGradientLeft.setAttribute("id", "table-gradient-overlap-left-id");
            table.parentElement.appendChild(divGradientLeft);
            const divGradientRight = document.createElement("div");
            divGradientRight.setAttribute("class", `gradient-hidden table-gradient-overlap-right table-gradient-overlap-right-${count}`);
            divGradientRight.setAttribute("id", "table-gradient-overlap-right-id");
            table.parentElement.appendChild(divGradientRight);
        
            // Declare variables for container, max scroll left, left and right buttons
            // var container = $('.article-table-responsive-script-'+count)[0];
            const maxScrollLeft = table.scrollWidth - table.clientWidth;
            // const btnSlideLeft = $(`.left-arrow-${count}`);
            // const btnSlideRight = $(`.right-arrow-${count}`);
            // const tableGradientOverlapLeft = $(`.table-gradient-overlap-left-${count}`);
            // const tableGradientOverlapRight = $(`.table-gradient-overlap-right-${count}`);
        
            // Right Arrow Click
            btnArrowRight.addEventListener('click', function() {
                console.log('right arrow button clicked');
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
                console.log('left arrow button clicked');
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
        
            table.onscroll = ()=>{
            if(table.scrollLeft >= 0) {
                btnArrowLeft.classList.remove("btn-hidden");
                divGradientLeft.classList.remove("gradient-hidden");
            }
            if(table.scrollLeft > maxScrollLeft-1) {
                btnArrowRight.classList.add("btn-hidden");
                divGradientRight.classList.add("gradient-hidden");
            }
            if(table.scrollLeft < 23){
                btnArrowLeft.classList.add("btn-hidden");
                divGradientLeft.classList.add("gradient-hidden");
            }
            if(table.scrollLeft < maxScrollLeft-1) {
                btnArrowRight.classList.remove("btn-hidden");
                divGradientRight.classList.remove("gradient-hidden");
            }
            }
        }
    });
}, 3000);
