import React from 'react';
import { shallow } from 'enzyme';
import ArticleFull from '../ArticleFull';

describe('<ArticleFull />', () => {
    it('should render the component properly', () => {
        const props = {
            title: 'Article Title',
            pubDate: '2001-11-02',
            content: 'Desc',
        };
        const wrapper = shallow(<ArticleFull {...props} />);
        expect(wrapper.render().text()).toContain('Article Title');
    });
});
