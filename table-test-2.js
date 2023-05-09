(function hello1() {
    console.log('hello from table-test.js');
    var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/gh/meixi-l/test/table-styles.css'
    document.head.appendChild(link);

    var css = 'table tr { background: green; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    head.appendChild(style);
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    const tableHeaders = document.querySelectorAll('table th');
    for (i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].style.color = 'red';
    }
})();
