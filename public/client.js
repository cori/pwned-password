$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var pwd = $('input').val();
      var hash = crypto.subtle.digest('SHA-1', new ArrayBuffer(pwd));
      
      hash.then(function(result) {
        alert(result);
      }, function(err) {
        alert(err);
      });
    // $.post('/checkpwd?' + $.param({pwd: pwd}), function() {
    // });
  });

});
