/// <reference path="../d3/d3.d.ts"/>

interface Downloadable {
  (selection: D3.Selection): void;
  filename: {
    (): string;
    (arg: string): Downloadable;
  };
}

declare function downloadable(): Downloadable;
