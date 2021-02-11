import React from 'react';
// import { Delete } from 'admin-on-rest';
// import { fetchUtils, Admin, Resource } from 'react-admin';
import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import authProvider from './authProvider';import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';

import Dashboard from './Dashboard';
import { CourseList, CourseCreate, CourseEdit } from './resources/courses';
import { ChapterList } from './resources/chapters';
import { TopicList } from './resources/topics';


const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('x-access-token', `${token}`);
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider('http://localhost:3005/admin', httpClient);

const App = () => (
    <Admin 
        dashboard={Dashboard} 
        authProvider={authProvider}
        // dataProvider={dataProvider}
        restClient={jsonServerRestClient('http://localhost:3005/admin')}
    >
        <Resource name="courses" list={CourseList} create = {CourseCreate} edit = {CourseEdit} />
        <Resource name="chapters" list={ChapterList} />
        <Resource name="topics" list={TopicList} />
    </Admin>
);

export default App;