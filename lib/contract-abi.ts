export const CONTRACT_ADDRESS = '0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0' as `0x${string}`;

export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_choix', type: 'uint256' }],
    name: 'jouer',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '_nom', type: 'string' }],
    name: 'creerProfil',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'obtenirStats',
    outputs: [
      { internalType: 'string', name: 'nom', type: 'string' },
      { internalType: 'uint256', name: 'victoires', type: 'uint256' },
      { internalType: 'uint256', name: 'defaites', type: 'uint256' },
      { internalType: 'uint256', name: 'egalites', type: 'uint256' },
      { internalType: 'uint256', name: 'totalParties', type: 'uint256' },
      { internalType: 'uint256', name: 'tauxVictoire', type: 'uint256' },
      { internalType: 'uint256', name: 'serieActuelle', type: 'uint256' },
      { internalType: 'uint256', name: 'meilleureSerie', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'joueurs',
    outputs: [
      { internalType: 'string', name: 'nom', type: 'string' },
      { internalType: 'uint256', name: 'victoires', type: 'uint256' },
      { internalType: 'uint256', name: 'defaites', type: 'uint256' },
      { internalType: 'uint256', name: 'egalites', type: 'uint256' },
      { internalType: 'uint256', name: 'serieActuelle', type: 'uint256' },
      { internalType: 'uint256', name: 'meilleureSerie', type: 'uint256' },
      { internalType: 'bool', name: 'existe', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
