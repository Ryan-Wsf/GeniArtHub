const index = require('./index.js');

// Utilisez jest.mock pour créer des mouchards sur getAPI et afficherOeuvres
jest.mock('./index.js', () => ({
    getAPI: jest.fn().mockResolvedValue(),
    afficherOeuvres: jest.fn().mockResolvedValue(),
    init:jest.requireActual('./index.js').init
}));


describe('init', () => {
    // Réinitialisez les mouchards avant chaque test
    beforeEach(() => {
      index.getAPI.mockClear();
      index.afficherOeuvres.mockClear();
    });

    test('should call getAPI and afficherOeuvres', async () => {
        // Appelez la fonction init
        await index.init();
        // Vérifiez que getAPI et afficherOeuvres ont été appelées
        expect(index.getAPI).toHaveBeenCalled();
        expect(index.afficherOeuvres).toHaveBeenCalled();
    });
});

// Chargement du module : Vous utilisez require pour charger index

// Mocking des fonctions : Utilisez jest.mock pour moucher getAPI et afficherOeuvres. getAPI est mouchée pour résoudre une promesse, tandis que afficherOeuvres est une fonction synchrone.

// beforeEach : Réinitialisez les mouchards avant chaque test pour garantir que les appels de fonctions ne sont pas partagés entre les tests.

// Test de init : Appelez init et utilisez await pour attendre que la fonction asynchrone init se termine. Ensuite, utilisez expect pour vérifier que getAPI et afficherOeuvres ont été appelées.