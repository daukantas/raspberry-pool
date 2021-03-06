<a name="5.4.1"></a>
## [5.4.1](https://github.com/christophehurpeau/raspberry-pool/compare/v5.4.0...v5.4.1) (2017-02-01)


### Bug Fixes

* missing webpack.config.js ([5412a2b](https://github.com/christophehurpeau/raspberry-pool/commit/5412a2b))
* upgrade command doesn't ask for confirmation ([5f018a4](https://github.com/christophehurpeau/raspberry-pool/commit/5f018a4))


<a name="5.4.0"></a>
# [5.4.0](https://github.com/christophehurpeau/raspberry-pool/compare/v5.3.1...v5.4.0) (2017-02-01)


### Bug Fixes

* remove logo for now ([befe2ab](https://github.com/christophehurpeau/raspberry-pool/commit/befe2ab))


### v5.3.1

- [`d77c878`](https://github.com/christophehurpeau/raspberry-pool/commit/d77c878ed6e27cbbc98bd42f6de687fd796c1439) fix(scripts): apt-get install missing -y (Christophe Hurpeau)
- [`4b91947`](https://github.com/christophehurpeau/raspberry-pool/commit/4b91947e67bda08f3748677357a8440a572321f7) build (Christophe Hurpeau)

### v5.3.0

- [`60929a5`](https://github.com/christophehurpeau/raspberry-pool/commit/60929a51c28f8026afa8145318d5c88f512c1dd6) fix: add git as depencendy (DarzuL)
- [`860183b`](https://github.com/christophehurpeau/raspberry-pool/commit/860183bd7f171e5b526b7094e00ab679678da116) fix: add xorg as dependency (DarzuL)
- [`4077d28`](https://github.com/christophehurpeau/raspberry-pool/commit/4077d289f1bf8ead1c795909fdce72b3691e0ab8) build (Christophe Hurpeau)

### v5.2.0

- [`4d616af`](https://github.com/christophehurpeau/raspberry-pool/commit/4d616af38c8c43e1e3692f27b21d57051ae972b2) Fix path to install raspi2png because the last Raspian version doesn't have /usr/local dir (DarzuL)
- [`aedc919`](https://github.com/christophehurpeau/raspberry-pool/commit/aedc919e8d8afc8528d724cfbc39f28a88aa4ec1) fix: install openbox needs root now (Christophe Hurpeau)
- [`e2dec0c`](https://github.com/christophehurpeau/raspberry-pool/commit/e2dec0cbc2cdb39b027e5e44736fdb2ef2ab8f18) Remove kweb install (DarzuL)
- [`237b4b4`](https://github.com/christophehurpeau/raspberry-pool/commit/237b4b46bafe0c1dd54d73d6105d7d458354b2d7) refactor: remove kweb (Christophe Hurpeau)

### v5.1.1

- [`7e75463`](https://github.com/christophehurpeau/raspberry-pool/commit/7e75463318bc7cf75aeca6223874228c2f69a467) Use raspi2png instead of scrot (DarzuL)
- [`79268a0`](https://github.com/christophehurpeau/raspberry-pool/commit/79268a0e5d51d5ab6a87387ddbeba965d2294e82) Fix blocked installèclient because of youtube-dl asking for install confirmation (DarzuL)
- [`354929b`](https://github.com/christophehurpeau/raspberry-pool/commit/354929b331e2c1e8ca45e5c28f9c6a644b162ceb) Fix blocked apt.sh because of apt-get update command asking for permission (DarzuL)
- [`ab95a7d`](https://github.com/christophehurpeau/raspberry-pool/commit/ab95a7d507a7ef93875eef31c998d3fa5235bd2e) Enable ssh service (DarzuL)

### v5.1.0

- [`4138ba0`](https://github.com/christophehurpeau/raspberry-pool/commit/4138ba0ff568f164cf8a29d3d658d4a00c100957) Fix variable escape (DarzuL)
- [`7af867a`](https://github.com/christophehurpeau/raspberry-pool/commit/7af867a545e4ff8c08850a8c366a8b37edbea13f) update dependencies (Christophe Hurpeau)
- [`79762af`](https://github.com/christophehurpeau/raspberry-pool/commit/79762af0fbeb478724f907525c06768bd413b834) add omxplayer (Christophe Hurpeau)

### v5.0.1

- [`3a33246`](https://github.com/christophehurpeau/raspberry-pool/commit/3a3324696d4884addf49bda3d872d472fa7c3bfe) install missing dependency git (Christophe Hurpeau)
- [`bcd3ee0`](https://github.com/christophehurpeau/raspberry-pool/commit/bcd3ee0edd91ca84ff4c07a03eeb74118440c1a6) fix USER_ID position in install page, fix missing $ in install script (Christophe Hurpeau)
- [`6b06bda`](https://github.com/christophehurpeau/raspberry-pool/commit/6b06bda51a2f374f528cbf93d76b95768e85f478) lint (Christophe Hurpeau)

### v5.0.0

- [`8e23e1e`](https://github.com/christophehurpeau/raspberry-pool/commit/8e23e1e89244a93a141574d68a3086de8454ef2c) fix: install view hostname (Christophe Hurpeau)
- [`886a549`](https://github.com/christophehurpeau/raspberry-pool/commit/886a54991c42e573d0f497f234298c69f2f15685) fix: socket client count (Christophe Hurpeau)

### v5.0.0-beta.3

- [`e870714`](https://github.com/christophehurpeau/raspberry-pool/commit/e8707145b206ec36b37fb1a46f5a5e366b79a37a) update readme and remove index.js (Christophe Hurpeau)
- [`55cf12f`](https://github.com/christophehurpeau/raspberry-pool/commit/55cf12f8c8369791145ce3382895313b15a52c88) chore(package): alp-websocket@^3.6.0 (Christophe Hurpeau)

### v5.0.0-beta.2

- [`4abfdf5`](https://github.com/christophehurpeau/raspberry-pool/commit/4abfdf55ecef7f86972f7319debdc9fed32a9b9f) gitignore (Christophe Hurpeau)
- [`d4e8073`](https://github.com/christophehurpeau/raspberry-pool/commit/d4e8073ed3921b0127d202c8b0c14c3494e869cb) remove lib-node6-dev (Christophe Hurpeau)
- [`52297ad`](https://github.com/christophehurpeau/raspberry-pool/commit/52297ad6a03ac4391bce183a68e778657b7e7005) index.js (Christophe Hurpeau)

### v5.0.0-beta.1

- [`dca7f4d`](https://github.com/christophehurpeau/raspberry-pool/commit/dca7f4dc628eaff7cd399771c400d5f073e53b45) disconnected style (Christophe Hurpeau)
- [`d8f7b66`](https://github.com/christophehurpeau/raspberry-pool/commit/d8f7b66781f0da9059df57bc0ca5f6dd9912246d) Update config.sh (Christophe Hurpeau)
- [`1654509`](https://github.com/christophehurpeau/raspberry-pool/commit/16545095cdec1270c076d2dec24989860354c8c4) Update install-client.sh (Christophe Hurpeau)
- [`1833f69`](https://github.com/christophehurpeau/raspberry-pool/commit/1833f69e8d9c1bf92b927deeb0f54cb773b26140) fix missing NODE_ENV="production" (Christophe Hurpeau)
- [`33afaae`](https://github.com/christophehurpeau/raspberry-pool/commit/33afaaeb62a2e5d042005ce2092d4c917eb2b6f4) refacto in modules (Christophe Hurpeau)
- [`a49892c`](https://github.com/christophehurpeau/raspberry-pool/commit/a49892c0016fcb67dc853dbdfccd9ed82a0cb8c7) subscribe-container (Christophe Hurpeau)
- [`1decc4f`](https://github.com/christophehurpeau/raspberry-pool/commit/1decc4fa8a73011e7778dff5e29b297ba205230c) upgrade (Christophe Hurpeau)
- [`30047af`](https://github.com/christophehurpeau/raspberry-pool/commit/30047af59cc6f07a541c47e507df4764bd123fba) alp@9 (Christophe Hurpeau)
- [`d36c40e`](https://github.com/christophehurpeau/raspberry-pool/commit/d36c40e8a2c1c12c822c2c955882bee224afbdeb) react-alp-subscribe-container@0.2 (Christophe Hurpeau)
- [`652adcf`](https://github.com/christophehurpeau/raspberry-pool/commit/652adcf524ec74a8e839c8c6b737ed729ca05061) alp-auth (Christophe Hurpeau)
- [`d77d313`](https://github.com/christophehurpeau/raspberry-pool/commit/d77d313867365654da285c787ea89981869c8d06) chore(package): nightingale-browser-console@^0.4.0 (Christophe Hurpeau)
- [`a320924`](https://github.com/christophehurpeau/raspberry-pool/commit/a32092433a5ba038c52036eaebb1379eb0eb2ce3) alp-dev@3.1, eslint autofix (Christophe Hurpeau)
- [`5126e31`](https://github.com/christophehurpeau/raspberry-pool/commit/5126e3159b37f2ce8f563de4a5f8bfd834f1edf6) chore(authors): update AUTHORS (Christophe Hurpeau)
