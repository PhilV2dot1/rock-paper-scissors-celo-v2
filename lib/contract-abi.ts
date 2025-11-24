// OLD CONTRACT (requires profile creation): 0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0
// NEW CONTRACT v2.0.0 (auto profile creation): 0xc4f5f0201bf609535ec7a6d88a05b05013ae0c49
// Verified and deployed on Celo mainnet
export const CONTRACT_ADDRESS = '0xc4f5f0201bf609535ec7a6d88a05b05013ae0c49' as `0x${string}`;

export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_choix', type: 'uint256' }],
    name: 'jouer',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'obtenirStats',
    outputs: [
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
    inputs: [{ internalType: 'address', name: '_joueur', type: 'address' }],
    name: 'joueurExiste',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'joueur', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'choixJoueur', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'choixOrdinateur', type: 'uint256' },
      { indexed: false, internalType: 'string', name: 'resultat', type: 'string' },
    ],
    name: 'PartieJouee',
    type: 'event',
  },
] as const;
