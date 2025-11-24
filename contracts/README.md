# Rock Paper Scissors Smart Contract

Smart contract pour le jeu Rock Paper Scissors sur la blockchain Celo.

## 🆕 Version 2.0 - Changements Majeurs

### Suppression de la création de profil obligatoire
- ✅ **Les profils sont créés automatiquement** lors de la première partie
- ❌ **Plus besoin de fonction `creerProfil`**
- ✅ **Expérience utilisateur simplifiée** - jouer immédiatement

### Fonctionnalités

- ✅ Jeu Rock Paper Scissors on-chain
- ✅ Création automatique du profil au premier jeu
- ✅ Statistiques complètes (victoires, défaites, égalités)
- ✅ Suivi des séries de victoires
- ✅ Génération aléatoire du choix de l'ordinateur
- ✅ Events pour tracking des parties

## 📋 Prérequis

- Node.js 18+
- Un wallet avec des CELO (testnet Alfajores ou mainnet)
- Une clé privée pour le déploiement

## 🚀 Installation

```bash
cd contracts
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` dans le dossier `contracts`:

```env
PRIVATE_KEY=your_private_key_here
CELOSCAN_API_KEY=your_celoscan_api_key_here
```

⚠️ **Ne commitez JAMAIS votre `.env` sur GitHub!**

## 📝 Compilation

```bash
npm run compile
```

## 🧪 Tests (optionnel)

Créez des tests dans `test/RockPaperScissors.test.js`:

```bash
npm test
```

## 🚀 Déploiement

### Sur Alfajores (Testnet)

```bash
npm run deploy:alfajores
```

### Sur Celo (Mainnet)

```bash
npm run deploy:celo
```

Après le déploiement, vous recevrez l'adresse du contrat. Copiez-la pour l'étape suivante.

## ✅ Vérification du contrat

```bash
npx hardhat verify --network alfajores <CONTRACT_ADDRESS>
# ou pour mainnet:
npx hardhat verify --network celo <CONTRACT_ADDRESS>
```

## 🔧 Mise à jour du frontend

Après le déploiement, mettez à jour `lib/contract-abi.ts`:

1. Changez `CONTRACT_ADDRESS` avec la nouvelle adresse
2. Mettez à jour l'ABI si nécessaire

```typescript
export const CONTRACT_ADDRESS = '0xYourNewContractAddress' as `0x${string}`;

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
] as const;
```

## 📊 Fonctions du contrat

### `jouer(uint256 _choix)`
Joue une partie (0=Pierre, 1=Papier, 2=Ciseaux). Crée automatiquement le profil si nécessaire.

### `obtenirStats()`
Retourne les statistiques du joueur.

### `joueurExiste(address _joueur)`
Vérifie si un joueur a déjà joué.

### `version()`
Retourne la version du contrat.

## 🔗 Liens utiles

- [Celo Docs](https://docs.celo.org/)
- [Hardhat Docs](https://hardhat.org/docs)
- [Celoscan](https://celoscan.io/)
- [Alfajores Faucet](https://faucet.celo.org/)

## 📄 License

MIT
