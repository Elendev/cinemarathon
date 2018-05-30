import Pathe from '../Pathe';
import fetch from 'node-fetch';

(global as any)['fetch'] = fetch;

test('Get Movies fetch details is working (with call to the API)', async () => {
    const movies = await Pathe.getMoviesDetail();
    expect(movies).not.toHaveLength(0);
});

test('Get Schedule fetch details is working (with call to the API)', async () => {
    const schedule = await Pathe.getSchedule();
    expect(schedule).not.toHaveLength(0);
});
