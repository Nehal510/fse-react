import {createUser, deleteUser} from "../services/users-service";
import {findAllTuitsLikedByUser, userTogglesTuitLikes} from "../services/likes-service";
import {createTuit, deleteTuit, findTuitById, findTuitsByUser} from "../services/tuits-service";
import {userTogglesTuitDislikes} from "../services/dislikes-service";

describe('likes screen has all liked tuits by user', ()=>{

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
    test('likes screen has all liked tuits by user' , async() =>{

        const user = sowell;
        const likes = await findAllTuitsLikedByUser(sowell._id);
        expect(likes.tuit).toEqual(newTuit.tuit);
        expect(likes.postedBy._id).toEqual(newTuit.postedBy._id);
    })

    afterAll(async() =>{
        await deleteUser(sowell._id);
        await deleteTuit(newTuit._id);
    })



})