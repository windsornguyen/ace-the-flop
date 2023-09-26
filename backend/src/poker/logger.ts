enum LogLevel {
    INFO,
    WARN,
    ERROR
  }
  
  /**
   * Logger class for robust logging.
   * 
   * Allows for different levels of logging and optional timestamps.
   * Levels are ordered as INFO < WARN < ERROR.
   */
  export class Logger {
    static logLevel: LogLevel = LogLevel.INFO;
    static includeTimestamp: boolean = true;
  
    /**
     * Configures the logger.
     * 
     * @param level - The log level to set.
     * @param includeTimestamp - Whether to include timestamps.
     */
    static configure(level: LogLevel, includeTimestamp: boolean): void {
      this.logLevel = level;
      this.includeTimestamp = includeTimestamp;
    }
  
    /**
     * Logs an informational message.
     * 
     * @param message - The message to log.
     */
    static info(message: string): void {
      if (this.logLevel <= LogLevel.INFO) {
        this.log(message, 'INFO');
      }
    }
  
    /**
     * Logs a warning message.
     * 
     * @param message - The message to log.
     */
    static warn(message: string): void {
      if (this.logLevel <= LogLevel.WARN) {
        this.log(message, 'WARN');
      }
    }
  
    /**
     * Logs an error message.
     * 
     * @param message - The message to log.
     */
    static error(message: string): void {
      if (this.logLevel <= LogLevel.ERROR) {
        this.log(message, 'ERROR');
      }
    }
  
    /**
     * Logs a message with an optional level and timestamp.
     * 
     * @param message - The message to log.
     * @param level - The log level.
     */
    protected static log(message: string, level: string): void {
      const timestamp = this.includeTimestamp ? `[${new Date().toISOString()}]` : '';
      console.log(`${timestamp} [${level}] ${message}`);
    }
  }
  