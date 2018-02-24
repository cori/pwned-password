$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var pwd = $('input').val();
    $.post('/checkpwd?' + $.param({pwd: pwd}), function() {
      
    });
  });

});
