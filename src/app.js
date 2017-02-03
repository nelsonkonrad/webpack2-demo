if (module.hot) {
  module.hot.accept()
}

import { groupBy } from 'lodash/collection';
import people from './people';
import './style.scss';
import imgURL from './tnt.png';

const managerGroups = groupBy(people, 'manager');

const root =  document.querySelector('#root');
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;

const img = document.createElement('img');
img.src = imgURL;
document.body.appendChild(img);