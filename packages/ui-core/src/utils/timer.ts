export class Timer {
  private remaining = 0;
  private start: number = Date.now();
  private timerId: number | null = null;
  private callback : ()=>void;
  constructor(interval: number, callback: () => void) {
    this.callback = callback;    
    this.remaining = interval;
    this.resume = this.resume.bind(this);
    this.pause = this.pause.bind(this);
    this.resume();
  }

  public stop() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
  }

  public pause() {
    if (this.timerId) {
      window.clearTimeout(this.timerId);
    }
    this.timerId = null;
    this.remaining -= Date.now() - this.start;
  }

  public resume() {
    if (this.timerId) {
      return;
    }
    this.start = Date.now();
    if (this.remaining > 0) {
      this.timerId = window.setTimeout(this.callback, this.remaining);
    }
  }
}
