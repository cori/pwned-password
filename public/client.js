$(function() {
  
  $('input').focus();
  
  $('form').submit(function(event) {
    event.preventDefault();
    var pwd = $('input').val();
    var enc = new TextEncoder('utf-8');
    var denc = new TextDecoder();

    var encoded = enc.encode(pwd);
    
    var prom = crypto.subtle.digest('SHA-1', encoded);

    prom.then(function(result) {
      var hash = hex(result).toUpperCase();
      
      var hashPrefix = hash.substring(0,5);
      
      $.get(
        {
          url: 'https://api.pwnedpasswords.com/range/' + hashPrefix,
          method: 'GET',
          success: function(data){
            var pwnedCount = checkPwdHash(hash, data);
              $('#results-count').text(pwnedCount);
            if (pwnedCount == 0 ) {
              var $rtitle = $('#results-title');
              $rtitle.css('color', 'green');
              $rtitle.text('Your password has not been exposed');
              $('#results-text').text("Your password doesn't show up in the Have I Been Pwned exposed password list.");
            }
            $('#results').toggle();
            // alert(pwnedCount);
          }
      });
    }, function(err) {
      console.log(err);
    });
    $('input').val('');
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

function checkPwdHash(hash, data) {
  var lines = data.split('\n');
  for(var i = 0; i < lines.length; i++){
    var hashBits = lines[i].split(':');
    // console.log(hashBits[0]);
    if( hash.endsWith(hashBits[0])) {
       return hashBits[1];
    }
  }
  return 0;
}