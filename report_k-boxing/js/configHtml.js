function configAnimationHtml(name) {
    var ob = {};
    switch (name) {
        case 'spe19':
            var page = new Spage1();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe23':
            ob.html = new Spage2().html;
            ob.action = new Spage2().currentPageAction;
            break;
        case 'spe31':
            var page = new Spage3();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe44':
            var page = new Spage4();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe48':
            var page = new Spage5();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe56':
            var page = new Spage6();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe69':
            var page = new Spage7();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe73':
            var page = new Spage8();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe81':
            var page = new Spage9();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe107':
            var page = new Spage10();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        default:
            break;
    }
    return ob;
}
