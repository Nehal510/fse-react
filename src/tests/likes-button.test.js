import {createUser, deleteUser} from "../services/users-service";
import {userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";
import {userTogglesTuitDislikes} from "../services/dislikes-service";

describe('liking/unliking the tuit updates the number of likes', ()=>{

    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const newTuit = {
        tuit: "Hi, my name is Nehal"
    }

    // setup the tests before verification
    beforeAll(async() => {
        // insert the sample user we then try to remove
        await createUser(sowell);
        await createTuit(sowell._id, newTuit);
        await userTogglesTuitLikes(sowell._id, newTuit._id);
    });
    let tuit;
    test('liking/unliking the tuit updates the number of likes' , async() =>{

        const user = sowell;
        tuit= await createTuit(user._id, {
            tuit:  `Tuit posted by ${user.username}`
        });
        await userTogglesTuitLikes(user._id, tuit._id);
        const newTuit = await findTuitById(tuit._id);
        expect(newTuit.stats.likes).toEqual(user.length);
    })

    afterAll(async() =>{
        await deleteUser(sowell._id);
        await deleteTuit(newTuit._id);
    })



})