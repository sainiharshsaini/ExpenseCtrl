
export const serializeTxn = (obj: any) => {
  // Create a shallow copy to avoid modifying the original object
  const serialized = { ...obj };

  // Check if 'balance' exists and has a 'toNumber' method, then convert
  if (obj.balance && typeof obj.balance.toNumber === 'function') {
    serialized.balance = obj.balance.toNumber();
  }

  // Check if 'amount' exists and has a 'toNumber' method, then convert
  if (obj.amount && typeof obj.amount.toNumber === 'function') {
    serialized.amount = obj.amount.toNumber();
  }

  return serialized;
};