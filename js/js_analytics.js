/*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
    
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');



async function initFingerprintJS() {

    const fp = await FingerprintJS.load({ /* ... */})
    const result = await fp.get()
    const visitorId = result.visitorId

    window.ga = window.ga || function () {
        (ga.q = ga.q || []).push(arguments)
    };
    ga.l = +new Date;

    console.log(visitorId);
    ga('create', 'UA-180475860-1', {
        'storage': 'none',
        'clientId': visitorId
    });
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
}
