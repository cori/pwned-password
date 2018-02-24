$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var pwd = $('input').val();
    var enc = new TextEncoder('utf-8');
    var prom = crypto.subtle.digest('SHA-1', enc.encode(pwd));

    prom.then(function(result) {
      var denc = new TextDecoder();
      var hash = denc.decode(result);
      alert(hash);
    }, function(err) {
      alert(err);
    });
    // $.post('/checkpwd?' + $.param({pwd: pwd}), function() {
    // });
  });

});
