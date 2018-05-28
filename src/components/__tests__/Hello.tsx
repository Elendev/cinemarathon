import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Hello from '../Hello';

test('Ensure Hello display correctly', () => {
    const hello = renderer.create(
        <Hello/>,
    );
    expect(hello.toJSON()).toMatchSnapshot();
});
