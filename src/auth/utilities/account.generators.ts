export function generateAccount() {
  var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
  var account = '';
  for (var i = 0; i < 32; i++) {
    account += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return account;
}
