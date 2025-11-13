// Helper para serializar BigInt para JSON
// BigInt não é suportado nativamente em JSON, precisamos converter

export function serializeBigInt<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

// Adiciona suporte global para BigInt em JSON.stringify
if (typeof BigInt !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
}
