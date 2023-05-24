import { IView } from "../../common/interface/view/IView.js";
import { URL } from "url";
import terminalImage from "terminal-image";
import { fetch, RequestInit } from "undici";
import { Buffer } from "buffer";


export class ConsoleView implements IView {
  async showWithTablename<T>(tablename: string, title: string, data: T): Promise<void> {
    (await this.logStripLine()
        .logTableName(tablename)
        .logTitle(title)
        .log("Result: ")
        .logData(data)
    )
      .logStripLine()
      .log("\n\n\n\n");
  }

  private logStripLine() {
    console.log("==============================================================================" +
      "=================================================");
    console.log("==============================================================================" +
      "=================================================");
    return this;
  }

  private logTableName(tablename: string) {
    console.log("Tablename: ", "\x1b[31m", tablename.toUpperCase());
    return this;
  }

  private logTitle(title: string) {
    console.log("Title: ", "\x1b[34m", title);
    return this;
  }

  private isUrl(s: string) {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

  private log(...args: unknown[]) {
    console.log(...args);
    return this;
  };

  private async logData<T>(data: T) {
    if (Array.isArray(data)) {
      console.log("[");
      for (const item of data) {
        await this.logEntity(item);
      }
      console.log("]");
    } else {
      await this.logEntity(data as Object);
    }
    return this;
  }

  private async logEntity<T extends Object>(item: T) {
    console.log("{");
    for (const [key, value] of Object.entries(item)) {
      console.log(`  ${key}:  ${value}`);
      if (this.isUrl(value)) {
        try {
          const pictureBuffer = await this.fetchPictureOrAbort(value, 100);
          console.log(await terminalImage.buffer(Buffer.from(pictureBuffer)));
        } catch (e) {
          console.log("\x1b[31m", "\tCannot load picture");
        }

      }
    }
    console.log("}");
    return this;
  }

  private async fetchPictureOrAbort(url: string, time: number, options?: RequestInit): Promise<Buffer> {
    const controller = new AbortController();
    const fetchAbortTimeout = setTimeout(() => controller.abort(), time);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(fetchAbortTimeout);
    return response.arrayBuffer().then(arrBuffer => Buffer.from(arrBuffer));
  }
}