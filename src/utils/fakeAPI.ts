import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { EXAM_DATA } from '@data/questions';

const mock = new MockAdapter(axios);

mock.onGet('/exam').reply(200, EXAM_DATA);

export default axios;
