'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async __before(){
    if(this.http.controller === 'user' && this.http.action === 'login'){
      return;
    }
    let userInfo = await this.session('userInfo');
    if(think.isEmpty(userInfo)){
      return this.redirect('/admin/user/login');
    }
  }
}