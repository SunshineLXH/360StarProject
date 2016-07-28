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
  async createAction(){
    let title = this.post('title');
    let content = this.post('content');
    let postModel = this.model('post');
    let insertId = await postModel.add({
      title,
      content,
      create_time: think.datetime()
    });
    return this.success({
      insertId
    })
  }
  async listAction(){
    let postModel = this.model('post');
    let page = this.get('page');
    let data = await postModel.page(page, 10).order('id DESC').countSelect();
    this.assign('post', data);
    return this.display();
    //return this.success(data);
  }
  async deleteAction(){
    let id = this.get('id');
    let postModel = this.model('post');
    let result = await postModel.where({
      id
    }).delete();
    return this.success({
      rows: result
    })
  }
  async testAction(){
    let postModel = this.model('post');
    let data = await postModel.addAndReturn();
    return this.success(data);
  }
}