'use strict';
/**
 * model
 */
export default class extends think.model.base {
  async addAndReturn(){
    let data = {
      title: 'title',
      content: 'content',
      create_time: think.datetime()
    };
    await this.add(data);
    let result = await this.select();
    return result;
  }
}