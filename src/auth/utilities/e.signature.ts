export function generateESignature() {
  var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
  var account = '';
  for (var i = 0; i < 20; i++) {
    account += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return account;
}
