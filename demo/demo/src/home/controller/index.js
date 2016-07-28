'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  jsonAction(){
    let data = {
      name: '75team'
    };
    return this.fail(1000, 'error');
  }
}