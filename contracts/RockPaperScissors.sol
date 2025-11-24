// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RockPaperScissors
 * @dev Rock Paper Scissors game on Celo blockchain
 * No profile creation required - profiles are created automatically on first play
 */
contract RockPaperScissors {
    struct Joueur {
        uint256 victoires;
        uint256 defaites;
        uint256 egalites;
        uint256 serieActuelle;
        uint256 meilleureSerie;
        bool existe;
    }

    mapping(address => Joueur) public joueurs;

    event PartieJouee(
        address indexed joueur,
        uint256 choixJoueur,
        uint256 choixOrdinateur,
        string resultat
    );

    /**
     * @dev Play a game of Rock Paper Scissors
     * Automatically creates player profile if it doesn't exist
     * @param _choix Player's choice (0=Rock, 1=Paper, 2=Scissors)
     * @return Result of the game as a string
     */
    function jouer(uint256 _choix) public returns (string memory) {
        require(_choix < 3, "Choix invalide");

        // Auto-create profile on first play
        if (!joueurs[msg.sender].existe) {
            joueurs[msg.sender].existe = true;
            joueurs[msg.sender].victoires = 0;
            joueurs[msg.sender].defaites = 0;
            joueurs[msg.sender].egalites = 0;
            joueurs[msg.sender].serieActuelle = 0;
            joueurs[msg.sender].meilleureSerie = 0;
        }

        // Generate computer's choice using block data
        uint256 choixOrdinateur = uint256(
            keccak256(
                abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)
            )
        ) % 3;

        string memory resultat;
        Joueur storage joueur = joueurs[msg.sender];

        // Determine winner
        if (_choix == choixOrdinateur) {
            resultat = "tie";
            joueur.egalites++;
            joueur.serieActuelle = 0;
        } else if (
            (_choix == 0 && choixOrdinateur == 2) || // Rock beats Scissors
            (_choix == 1 && choixOrdinateur == 0) || // Paper beats Rock
            (_choix == 2 && choixOrdinateur == 1) // Scissors beats Paper
        ) {
            resultat = "win";
            joueur.victoires++;
            joueur.serieActuelle++;
            if (joueur.serieActuelle > joueur.meilleureSerie) {
                joueur.meilleureSerie = joueur.serieActuelle;
            }
        } else {
            resultat = "loss";
            joueur.defaites++;
            joueur.serieActuelle = 0;
        }

        emit PartieJouee(msg.sender, _choix, choixOrdinateur, resultat);
        return resultat;
    }

    /**
     * @dev Get player statistics
     * Returns empty stats if player doesn't exist yet
     * @return victoires Number of wins
     * @return defaites Number of losses
     * @return egalites Number of ties
     * @return totalParties Total number of games played
     * @return tauxVictoire Win rate percentage (0-100)
     * @return serieActuelle Current winning streak
     * @return meilleureSerie Best winning streak
     */
    function obtenirStats()
        public
        view
        returns (
            uint256 victoires,
            uint256 defaites,
            uint256 egalites,
            uint256 totalParties,
            uint256 tauxVictoire,
            uint256 serieActuelle,
            uint256 meilleureSerie
        )
    {
        Joueur memory joueur = joueurs[msg.sender];

        victoires = joueur.victoires;
        defaites = joueur.defaites;
        egalites = joueur.egalites;
        totalParties = victoires + defaites + egalites;
        tauxVictoire = totalParties > 0
            ? (victoires * 100) / totalParties
            : 0;
        serieActuelle = joueur.serieActuelle;
        meilleureSerie = joueur.meilleureSerie;
    }

    /**
     * @dev Check if a player profile exists
     * @param _joueur Address of the player to check
     * @return True if player has played at least once
     */
    function joueurExiste(address _joueur) public view returns (bool) {
        return joueurs[_joueur].existe;
    }

    /**
     * @dev Get total games played by all players (optional analytics)
     */
    function version() public pure returns (string memory) {
        return "2.0.0 - Auto Profile Creation";
    }
}
