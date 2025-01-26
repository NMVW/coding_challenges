// for running outside browser context
if (!$) $ = () => ({ ready (fn) { fn() }});

(function go () {
  $(document).ready(function() {
    require('./components').app();
  })
})($)