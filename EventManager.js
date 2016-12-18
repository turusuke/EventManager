class EventManager {

  /**
   * on イベントを購読する
   * @param name イベント名 {String}
   * @param callback コールバック関数 {Function}
   * @param context コンテキスト {*}
   * @returns {EventManager}
   */
  on(name, callback, context) {
    if (this.eventCallBacks == null) this.eventCallBacks = {}; // 登録されているイベントがあるかチェック
    if (this.eventCallBacks[name] == null) this.eventCallBacks[name] = []; // name と同じイベント名が登録されているかチェック、なければ配列追加
    this.eventCallBacks[name].push([callback, context]);
    return this;
  }

  /**
   * one 一度だけ発火するイベントを購読する
   * @param name イベント名 {String}
   * @param callback コールバック関数 {Function}
   */
  one(name, callback) {
    this.on(name, callback, 'one');
    return this;
  }

  /**
   * off 登録したイベントを削除する
   * @param name イベント名 {String}
   * @returns {EventManager}
   */
  off(name) {
    if (!this.eventCallBacks[name]) return this; // name と同じイベント名が存在していなかったら終了

    delete this.eventCallBacks[name];
    return this;
  }

  /**
   * trigger 登録されているイベントを実行する
   * @param name イベント名 {String}
   */
  trigger(name) {

    const callbackList = this.eventCallBacks[name] != null ? this.eventCallBacks[name] : null;

    if (callbackList == null) return; // name で指定されたイベントが存在していなかったら終了

    callbackList.forEach((list) => { // 登録されている callback を実行する
      const callback = list;
      callback[0]();

      if (callback[1] === 'one') this.off(name);
    });

  }
}
