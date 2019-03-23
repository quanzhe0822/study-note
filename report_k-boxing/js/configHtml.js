function configAnimationHtml(name) {
    var ob = {};
    switch (name) {
        case 'spe18':
            var page = new Spage1();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe22':
            ob.html = new Spage2().html;
            ob.action = new Spage2().currentPageAction;
            break;
        case 'spe30':
            var page = new Spage3();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe32':
            var page = new Spage4();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe44':
            var page = new Spage5();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe48':
            var page = new Spage6();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe56':
            var page = new Spage7();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe58':
            var page = new Spage8();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe70':
            var page = new Spage9();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe74':
            var page = new Spage10();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe82':
            var page = new Spage11();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        case 'spe84':
            var page = new Spage12();
            ob.html = page.html;
            ob.action = page.currentPageAction;
            break;
        default:
            break;
    }
    return ob;
}