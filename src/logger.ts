import * as vscode from "vscode";

export class Logger {
  readonly #outputChannel: vscode.OutputChannel;
  #verbose = false;

  constructor(outputChannel: vscode.OutputChannel) {
    this.#outputChannel = outputChannel;
  }

  setVerbose(enabled: boolean) {
    this.#verbose = enabled;
  }

  log(message: string, ...args: any[]) {
    this.#outputChannel.appendLine(getFormattedArgs(message, args));
  }

  logVerbose(message: string, ...args: any[]) {
    if (this.#verbose) {
      this.#outputChannel.appendLine(getFormattedMessageWithLevel("verbose", message, args));
    }
  }

  logInfo(message: string, ...args: any[]) {
    this.#outputChannel.appendLine(getFormattedMessageWithLevel("info", message, args));
  }

  logWarn(message: string, ...args: any[]) {
    this.#outputChannel.appendLine(getFormattedMessageWithLevel("warn", message, args));
  }

  logError(message: string, ...args: any[]) {
    this.#outputChannel.appendLine(getFormattedMessageWithLevel("error", message, args));
  }

  logErrorAndFocus(message: string, ...args: any[]) {
    this.logError(message, ...args);
    this.#outputChannel.show();
  }
}

function getFormattedMessageWithLevel(level: "verbose" | "info" | "warn" | "error", message: string, args: any[]) {
  return `[${level.toUpperCase()}] ${getFormattedArgs(message, args)}`;
}

function getFormattedArgs(message: string, args: any[]) {
  for (const arg of args) {
    message += " " + arg;
  }
  return message;
}
