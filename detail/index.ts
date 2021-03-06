import * as constants from '../constants';

export default {
  name: '{{name}}',
  path: '/{{name}}',
  component: () => import('./detail.vue'),
  meta: {
    title: constants.PAGE_TITLE
  }
};
