import * as fs from "fs";
import * as path from "path";
import { APIResponse } from "@playwright/test";

export class ApiLogger {
  private logFile: string;

  constructor() {
    this.logFile = path.join(process.cwd(), "api.log");
  }

  async log(method: string, response: APIResponse) {
    const url = response.url();
    const status = response.status();
    const headers = response.headers();
    
    // Obtenemos el body como texto
    const rawBody = await response.text();

    // Intentamos formatearlo como JSON si aplica
    let formattedBody = rawBody;
    try {
      formattedBody = JSON.stringify(JSON.parse(rawBody), null, 2);
    } catch {
      // No es JSON → se deja como texto
    }

    // 📌 Log completo para archivo
    const log = `
===== API LOG =====
TIME: ${new Date().toISOString()}
METHOD: ${method}
URL: ${url}
STATUS: ${status}
HEADERS: ${JSON.stringify(headers, null, 2)}
BODY:
${formattedBody}
========================
`;

    // 👉 Guardar en archivo
    fs.appendFileSync(this.logFile, log, "utf8");

    // 👉 Consola solo URL + Status
    console.log(`API: ${url} → Status: ${status}`);
  }
}