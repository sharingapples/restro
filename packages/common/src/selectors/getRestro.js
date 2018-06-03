export default function getRestro(account) {
  return account.restros.find(r => r.id === account.restroId);
}
