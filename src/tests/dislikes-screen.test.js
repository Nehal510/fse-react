import {createUser, deleteUser} from "../services/users-service";
import {findAllTuitsLikedByUser, userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";
import {findAllTuitsDislikedByUser, userTogglesTuitDislikes} from "../services/dislikes-service";

describe('dislikes screen has all disliked tuits by user', ()=>{

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
        await userTogglesTuitDislikes(sowell._id, newTuit._id);
    });
    let tuit;
    test('dislikes screen has all disliked tuits by user' , async() =>{

        const user = sowell;
        const dislikes = await findAllTuitsDislikedByUser(sowell._id);
        expect(dislikes.tuit).toEqual(newTuit.tuit);
        expect(dislikes.postedBy._id).toEqual(newTuit.postedBy._id);
    })

    afterAll(async() =>{
        await deleteUser(sowell._id);
        await deleteTuit(newTuit._id);
    })



})