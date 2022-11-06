import {createTuit, deleteTuit, findAllTuits, findTuitById} from "../services/tuits-service";

describe('createTuit', () => {
    const newTuit = {
        tuit: 'Hey, there!'
    };
    let createdTuit;
    test('can create tuit with REST API', async () => {
        createdTuit = await createTuit("6352ac2bbf252f9a7d577d41", newTuit);

        expect(createdTuit.tuit).toEqual(newTuit.tuit);
    });
    afterAll(() => {
        return deleteTuit(createdTuit._id);
    });
});

describe('deleteTuitById', () => {
    const newTuit = {
        tuit: 'Hey, there!'
    };
    let createdTuit;
    beforeAll(async() => {
        createdTuit = await createTuit("6352ac2bbf252f9a7d577d41", newTuit);
        return createdTuit;
    });
    test('can delete tuit with REST API', async () => {
        const status = await deleteTuit(createdTuit._id);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
    afterAll(() => {
        return deleteTuit(createdTuit._id);
    });
});

describe('findTuitById', () => {
    const newTuit = {
        tuit: 'Hey, there!'
    };
    let createdTuit;
    test('can retrieve a tuit by their primary key with REST API', async () => {
        createdTuit = await createTuit("6352ac2bbf252f9a7d577d41", newTuit);
        expect(createdTuit.tuit).toEqual(newTuit.tuit);

        const existingTuit = await findTuitById(createdTuit._id);
        expect(existingTuit.tuit).toEqual(newTuit.tuit);
    });
    afterAll(() => {
        return deleteTuit(createdTuit._id);
    });
});

describe('findAllTuits', () => {
    const tuits = [
        "Hello", "SpaceX is amazing", "Ice creams are love"
    ]
    let i = 0, newTuits;
    newTuits = new Array(tuits.length);
    beforeAll(async() => {
      await Promise.all(tuits.map(async tuit => {
          newTuits[i] = await createTuit("6352ac2bbf252f9a7d577d41", {tuit: tuit}).then(i=i+1)
      }))
    });
    test('can retrieve all tuits with REST API', async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(eachTuit => {
            const tuitInserted = tuits.find(tuit => tuit === eachTuit.tuit);
            expect(eachTuit.tuit).toEqual(tuitInserted);
        });
    });
    afterAll(async() => {
        await Promise.all(newTuits.map(async tuit => {
            await deleteTuit(tuit._id);
        }))
    });
});