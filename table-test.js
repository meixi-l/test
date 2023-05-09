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

    const tableHeaders = document.querySelectorAll('table th');
    for (i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].style.fontWeight = 'red';
    }
})();