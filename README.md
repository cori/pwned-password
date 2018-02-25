Pwned Password checker
======================

![shield](https://octicons.glitch.me/svg/shield.svg?size=64&color=00FF00)

Simple client for the [Have I bbeen pwned?](https://haveibeenpwned.com) [Pwned Passwords API](https://haveibeenpwned.com/API/v2#PwnedPasswords).

Uses [range searches](https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange) and performs all "cryptographic" (hashing) and searching functions in the browser, so nothing except the first 5 characters of the SHA-1 hash of the password is ever sent to the API, maintaining anonymity.

The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)'s [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) functions are theoretically only supported in "modern" browsers, so the site may not work at all in some browsers, although my limited testing indicates that even where support is [assumed to be missing](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#Browser_compatibility) the site works fine.