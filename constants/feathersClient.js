import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import fetch from 'node-fetch';

const baseUrl = 'http://119.29.68.179/xhapi';
const feathersClient = feathers().configure(rest(baseUrl).fetch(fetch));

export default feathersClient;