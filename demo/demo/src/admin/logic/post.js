'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }
  createAction(){
    this.rules = {
      title: 'required',
      content: 'required'
    }
  }
  deleteAction(){
    this.rules = {
      id: 'required|int'
    }
  }
}