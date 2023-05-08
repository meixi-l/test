(function hello1() {
    console.log("hello");
    [...document.getElementsByClassName('test-paragraph')].forEach((element) => element.style.color = 'red');
    document.querySelector("#test-paragraph").style.color = "orange";
})();
