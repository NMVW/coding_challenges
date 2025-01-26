export class Scoreboard {

  static style = {
    height: 100,
    width: 100,
    position: 'absolute',
    background: 'black',
    top: 0,
    right: 0,
    color: 'white',
    'text-align': 'center'
  };
  
  static parseStyle () {
    return _.reduce(Scoreboard.style, (style, value, attr) => {
      style += `${attr}: ${value}; `;
      return style;
    }, '');
  }

  get score () {
    return +localStorage.getItem('ceros-score');
  }

  set score (value) {
    return localStorage.setItem('ceros-score', value);
  }

  get isTracking () {
    return this._intervalId !== undefined;
  }

  constructor (host) {
    if (this.score === undefined) this.score = 0;
    this.attach(host);
  }
  attach (host='body') {
    this._view = $(this._template(this.score)).attr('style', Scoreboard.parseStyle());
    $(host).append(this._view); // attach to DOM
  }

  start (interval=1000) {
    this._intervalId = setInterval(() => {
      this.score = this.score + 10;
    }, interval);
  }

  stop () {
    clearInterval(this._intervalId);
    delete this._intervalId;
  }

  reduce (value) {
    this.score = this.score - value;    
  }

  clear () {
    this.score = 0;
  }
  
  render () {
    this._view.find('#score').text(this.score);
  }
  _template (score) {
    return `<div><span>Help Rhinaldo Score</span><br/><p id="score">${score}</p></div>`;
  }
}