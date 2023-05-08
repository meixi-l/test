document.querySelectorAll('.article-table-responsive-container').forEach((tableContainer) => {
    tableContainer.classList.remove('article-table-responsive-container');
});

document.querySelectorAll('.article-table-responsive').forEach((tableContainer) => {
    tableContainer.classList.remove('article-table-responsive');
});

$('body.page__article .block-field-blocknodearticlefield-content table').each(function(i) {
  // for table identifier, unique each table
  $(this).parent().addClass("article-table-responsive-script-"+i); 

  // add same class to all tables, for styling
  $(this).parent().parent().addClass("article-table-responsive-script-container"); 
  $(this).parent().addClass("article-table-responsive-script");

  var element = document.querySelector('.article-table-responsive-script-'+i);
  // determine if there is overflow
  if(element.offsetWidth < element.scrollWidth) {
    // insert arrows after the table for navigation
    $("<span class='btn-hidden left-arrow left-arrow-"+i+" id='btn-slide-left'></span>").insertAfter('.article-table-responsive-script-'+i);
    $("<span class='right-arrow right-arrow-"+i+"' id='btn-slide-right'></span>").insertAfter('.article-table-responsive-script-'+i);

    // append two <div>s for fade effect
    $("<div class='gradient-hidden table-gradient-overlap-left table-gradient-overlap-left-"+i+"' id='table-gradient-overlap-left-id'></div>").insertAfter('.article-table-responsive-script-'+i);
    $("<div class='table-gradient-overlap-right table-gradient-overlap-right-"+i+"' id='table-gradient-overlap-right-id'></div>").insertAfter('.article-table-responsive-script-'+i);

    // Declare variables for container, max scroll left, left and right buttons
    var container = $('.article-table-responsive-script-'+i)[0];
    var maxScrollLeft = container.scrollWidth - container.clientWidth;
    var btnSlideLeft = $(".left-arrow-"+i);
    var btnSlideRight = $(".right-arrow-"+i);
    var tableGradientOverlapLeft = $(".table-gradient-overlap-left-"+i);
    var tableGradientOverlapRight = $(".table-gradient-overlap-right-"+i);

    // Right Arrow Click
    $( ".right-arrow-"+i ).each(function() {
      $(this).on('click', function() {
        sideScroll(container, 'right', 25, 100, 10);

        // If scrolled to right and there is more to scroll
        if(container.scrollLeft >= 0) {
          btnSlideLeft.removeClass("btn-hidden");
          tableGradientOverlapLeft.removeClass("gradient-hidden");
        }
        // If scrolled to right and max is reached
        if(container.scrollLeft > maxScrollLeft-50) {
          btnSlideRight.addClass("btn-hidden");
          tableGradientOverlapRight.addClass("gradient-hidden");
        }
      });
    });

    // Left Arrow Click
    $( ".left-arrow-"+i ).each(function() {
      $(this).on('click', function() {
        sideScroll(container, 'left', 25, 50, 10);

        if(container.scrollLeft < 23){
          btnSlideLeft.addClass("btn-hidden");
          tableGradientOverlapLeft.addClass("gradient-hidden");
        }
        if(container.scrollLeft < maxScrollLeft-1) {
          btnSlideRight.removeClass("btn-hidden");
          tableGradientOverlapRight.removeClass("gradient-hidden");
        }
      });
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

    element.onscroll = ()=>{
      if(container.scrollLeft >= 0) {
        btnSlideLeft.removeClass("btn-hidden");
        tableGradientOverlapLeft.removeClass("gradient-hidden");
      }
      if(container.scrollLeft > maxScrollLeft-1) {
        btnSlideRight.addClass("btn-hidden");
        tableGradientOverlapRight.addClass("gradient-hidden");
      }
      if(container.scrollLeft < 23){
        btnSlideLeft.addClass("btn-hidden");
        tableGradientOverlapLeft.addClass("gradient-hidden");
      }
      if(container.scrollLeft < maxScrollLeft-1) {
        btnSlideRight.removeClass("btn-hidden");
        tableGradientOverlapRight.removeClass("gradient-hidden");
      }
    }
  }
});