import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');
const mock = jest.spyOn(axios, 'get');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  "alice's tuit", "bob's tuit", "charlie's tuit"
];

const MOCKED_TUITS_NEW = [
    {
        _id: "123",
        tuit: "alice's tuit",
        postedBy: "6352ac2bbf252f9a7d577d41",
        postedOn: Date.now()
    },
    {
        _id: "456",
        tuit: "bob's tuit",
        postedBy: "6359b7b57ead2919432e6373",
        postedOn: Date.now()
    },
    {
        _id: "789",
        tuit: "charlie's tuit",
        postedBy: "635ed6ca7ead2919432e63c7",
        postedOn: Date.now()
    }
]

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS_NEW}/>
      </HashRouter>);
  const linkElement = screen.getByText(/bob's tuit/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  mock.mockRestore();
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);
  const linkElement = screen.getByText(/tuit2/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() =>
      Promise.resolve({ data: {tuits: MOCKED_TUITS_NEW} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>);

  const tuit = screen.getByText(/alice's tuit/i);
  expect(tuit).toBeInTheDocument();
});
