# 🎮 Smart Contract Upgrade - Suppression de la création de profil

## 📋 Résumé du problème

**Problème:** L'erreur "Please create a profile first (coming soon)" apparaissait lors de la tentative de jeu On-chain car l'ancien smart contract exigeait la création d'un profil avant de pouvoir jouer.

**Solution:** Nouveau smart contract qui crée automatiquement le profil lors de la première partie.

## ✨ Changements Majeurs

### 🆕 Nouveau Smart Contract (v2.0.0)

**Emplacement:** [`contracts/RockPaperScissors.sol`](contracts/RockPaperScissors.sol)

#### Améliorations:
- ✅ **Création automatique du profil** lors du premier `jouer()`
- ❌ **Suppression de `creerProfil()`** - plus nécessaire
- ✅ **Toutes les statistiques conservées** (victoires, défaites, égalités, séries)
- ✅ **Event `PartieJouee`** pour tracking des parties
- ✅ **Fonction `version()`** retourne "2.0.0 - Auto Profile Creation"
- ✅ **Fonction `joueurExiste()`** pour vérifier si un joueur a joué

#### Fonctions du contrat:
```solidity
// Jouer une partie (crée le profil automatiquement si nécessaire)
function jouer(uint256 _choix) public returns (string memory)

// Obtenir les statistiques du joueur
function obtenirStats() public view returns (
    uint256 victoires,
    uint256 defaites,
    uint256 egalites,
    uint256 totalParties,
    uint256 tauxVictoire,
    uint256 serieActuelle,
    uint256 meilleureSerie
)

// Vérifier si un joueur a déjà joué
function joueurExiste(address _joueur) public view returns (bool)

// Obtenir la version du contrat
function version() public pure returns (string memory)
```

### 🔧 Mises à jour du Frontend

**Fichiers modifiés:**
- [`lib/contract-abi.ts`](lib/contract-abi.ts) - Nouvelle ABI sans creerProfil et joueurs
- [`hooks/useGame.ts`](hooks/useGame.ts) - Suppression de la vérification playerExists

#### Changements dans useGame.ts:
1. ❌ Suppression de la query `playerData` (joueurs)
2. ❌ Suppression du check `playerExists`
3. ✅ Mise à jour des indices du tableau stats (anciennement [1-7], maintenant [0-6])
4. ✅ Suppression du message d'erreur "Please create a profile first"

## 🚀 Comment Déployer le Nouveau Contrat

### 1️⃣ Installation des dépendances

```bash
cd contracts
npm install
```

### 2️⃣ Configuration

Créez un fichier `.env` dans le dossier `contracts`:

```env
PRIVATE_KEY=votre_clé_privée_sans_0x
CELOSCAN_API_KEY=votre_api_key_celoscan
```

⚠️ **IMPORTANT:** Ne commitez JAMAIS le fichier `.env` !

### 3️⃣ Compilation (optionnel)

```bash
npm run compile
```

### 4️⃣ Déploiement

#### Sur Alfajores (Testnet - Recommandé pour tester):
```bash
npm run deploy:alfajores
```

#### Sur Celo (Mainnet - Production):
```bash
npm run deploy:celo
```

Le script affichera l'adresse du contrat déployé. **Copiez cette adresse !**

Exemple de sortie:
```
✅ Contract deployed successfully!
Contract address: 0x1234567890abcdef1234567890abcdef12345678

Next steps:
1. Update CONTRACT_ADDRESS in lib/contract-abi.ts with: 0x1234567890abcdef1234567890abcdef12345678
2. Verify the contract on Celoscan:
   npx hardhat verify --network alfajores 0x1234567890abcdef1234567890abcdef12345678

View on Celoscan:
https://alfajores.celoscan.io/address/0x1234567890abcdef1234567890abcdef12345678
```

### 5️⃣ Vérification du Contrat (Recommandé)

```bash
npx hardhat verify --network alfajores 0xVOTRE_ADRESSE_DE_CONTRAT
# ou pour mainnet:
npx hardhat verify --network celo 0xVOTRE_ADRESSE_DE_CONTRAT
```

### 6️⃣ Mise à jour du Frontend

Éditez [`lib/contract-abi.ts`](lib/contract-abi.ts):

```typescript
// Ligne 3: Remplacez l'ancienne adresse par la nouvelle
export const CONTRACT_ADDRESS = '0xVOTRE_NOUVELLE_ADRESSE' as `0x${string}`;
```

### 7️⃣ Commit et Déploiement

```bash
git add lib/contract-abi.ts
git commit -m "Update contract address to new v2.0.0 deployment"
git push
```

Vercel déploiera automatiquement avec le nouveau contrat !

## 🔍 Comparaison Ancien vs Nouveau

### Ancien Contrat (0xDeDb830D70cE3f687cad36847Ef5b9b96823A9b0)
```
1. Connexion wallet ✅
2. Appel creerProfil() ❌ (bloquant!)
3. Appel jouer() ✅
```

### Nouveau Contrat (À déployer)
```
1. Connexion wallet ✅
2. Appel jouer() ✅ (profil créé automatiquement!)
```

## 📊 Données Migrées

### Statistiques conservées:
- ✅ Victoires, défaites, égalités
- ✅ Série actuelle et meilleure série
- ✅ Total de parties
- ✅ Taux de victoire

### Données supprimées:
- ❌ Nom du joueur (non nécessaire, on utilise l'adresse)

## 🔗 Liens Utiles

- [Contrat Solidity](contracts/RockPaperScissors.sol)
- [README Contrat](contracts/README.md)
- [Script de Déploiement](contracts/scripts/deploy.js)
- [Celo Docs](https://docs.celo.org/)
- [Hardhat Docs](https://hardhat.org/docs)
- [Celoscan](https://celoscan.io/)
- [Alfajores Faucet](https://faucet.celo.org/) - Pour obtenir des CELO testnet

## ⚠️ Notes Importantes

1. **Le nouveau contrat est incompatible** avec l'ancien - les données ne seront pas migrées automatiquement
2. **Les utilisateurs devront rejouer** pour créer leurs nouvelles statistiques
3. **Le frontend actuel est déjà compatible** avec le nouveau contrat
4. **Testez d'abord sur Alfajores** avant de déployer sur mainnet
5. **Gardez l'ancienne adresse** en commentaire dans le code pour référence

## ✅ Checklist de Déploiement

- [ ] Installation des dépendances (`cd contracts && npm install`)
- [ ] Configuration du `.env` avec PRIVATE_KEY et CELOSCAN_API_KEY
- [ ] Compilation réussie (`npm run compile`)
- [ ] Déploiement sur Alfajores (`npm run deploy:alfajores`)
- [ ] Test du contrat sur Alfajores
- [ ] Vérification sur Celoscan (`npx hardhat verify`)
- [ ] Mise à jour de CONTRACT_ADDRESS dans `lib/contract-abi.ts`
- [ ] Test du jeu On-chain avec le nouveau contrat
- [ ] Commit et push des changements
- [ ] (Optionnel) Déploiement sur Celo mainnet pour production

## 🎉 Résultat Attendu

Après le déploiement et la mise à jour du frontend:
- Les utilisateurs peuvent jouer On-chain **immédiatement** après connexion wallet
- Plus besoin de créer un profil manuellement
- L'expérience utilisateur est **beaucoup plus fluide**
- Les statistiques sont trackées automatiquement

---

**Version du document:** 1.0
**Date:** 2025-11-24
**Auteur:** Claude Code
