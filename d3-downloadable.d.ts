/// <reference path="../d3/d3.d.ts"/>

declare module D3 {
  interface Downloadable {
    (selection: D3.Selection): void;
    filename: {
      (): string;
      (arg: string): Downloadable;
    };
    width: {
      (): number;
      (arg: number): Downloadable;
    };
    height: {
      (): number;
      (arg: number): Downloadable;
    };
  }

  interface Base extends Selectors {
    downloadable(arg: any): Downloadable;
  }
}
