import DigitsWorker from './DigitsWorker?worker';

export class DigitsWorkerFactory {
  create() {
    return new DigitsWorker();
  }
}