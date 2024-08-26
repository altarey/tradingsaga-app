import {Telemetry} from './telemetry';

export class Logger {
  static logError(message?: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
    Telemetry.logError(message, optionalParams);
  }

  static logWarning(message?: any, ...optionalParams: any[]) {
    console.warn(message, optionalParams);
  }

  static logMessage(message?: any, ...optionalParams: any[]) {
    console.info(message, optionalParams);
  }
}

export enum Level {
  Info,
  Warning,
}

export interface ILog {
  // Returns the flag which indicates if the logging is on/off
  toggle(): boolean;
  isEnabled(): boolean;
  log(level: Level, message?: any, ...optionalParams: any[]): void;
}

export class BaseLog implements ILog {
  private enabled: boolean;

  constructor(enabled: boolean = false) {
    this.enabled = enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    return this.isEnabled();
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public log(level: Level, onlyInDev: boolean, message?: any, ...optionalParams: any[]): void {
    if (!this.isEnabled()) {
      return;
    }
    switch (level) {
      case Level.Info:
        optionalParams ? Logger.logMessage(message, onlyInDev, optionalParams) : Logger.logMessage(message);
        break;
      case Level.Warning:
        optionalParams ? Logger.logWarning(message, onlyInDev, optionalParams) : Logger.logWarning(message);
        break;
    }
  }
}
