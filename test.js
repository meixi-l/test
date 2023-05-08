(function hello1() {
    console.log("hello");
    for (i = 0; i < testParagraphs.length; i++) {
        testParagraphs[i].style.color = 'red';
    }
    document.querySelector("#test-paragraph").style.color = "orange";
})();
