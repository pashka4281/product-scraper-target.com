// this is a phantom js script
//

var page = require('webpage').create(),
  system = require('system'),
  t, address;

if (system.args.length === 1) {
  console.log('Usage: phantomjs parser.js <some URL>');
  phantom.exit();
}

address = system.args[1];
phantom.addCookie({
  'name': 'bfx.currency',
  'value': 'USD',
  'domain': '.target.com'
});

phantom.addCookie({
  'name': 'bfx.country',
  'value': 'US',
  'domain': '.target.com'
});

page.onLoadFinished = function(status) { };

page.open(address, function(status) {
  if (status === 'success') {
    var data = page.evaluate(function() {
      var details = $('#tab-content-details').html().trim();
      var images  = $('.js-showZoomImage img').map(function(i, img) { return $(img).prop('src') }).toArray();
      var price   = $('#stickySidebar .price .h-text-lowercase').text().trim();
      var title   = $('.title-product').text().trim();

      var result = {
        title   : title,
        details : details,
        price   : price,
        images  : images
      };

      return JSON.stringify(result);
    });
    console.log(data);
    phantom.exit(0);
  } else {
    console.log('FAIL to load the address');
    phantom.exit(1);
  }
});
