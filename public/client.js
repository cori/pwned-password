$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var pwd = $('input').val();
    var enc = new TextEncoder('utf-8');
    var denc = new TextDecoder();

    var encoded = enc.encode(pwd);
    
    var prom = crypto.subtle.digest('SHA-1', encoded);

    prom.then(function(result) {
      var hash = hex(result);
      
      var hashPrefix = hash.substring(0,5);
      
      $.get(
        {
          url: 'https://api.pwnedpasswords.com/pwnedpassword/',
          headers: {
            'Content-Type':'application/json'
          },
          method: 'POST',
          dataType: 'json',
          data: hashPrefix,
          success: function(data){
            console.log('success: '+data);
          }
      });  
      alert(hashPrefix);
    }, function(err) {
      alert(err);
    });
    // $.post('/checkpwd?' + $.param({pwd: pwd}), function() {
    // });
  });

});

//  from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Example
function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i)
    var stringValue = value.toString(16)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    hexCodes.push(paddedValue);
  }

  return hexCodes.join("");
}