import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

  private scale: string;
  constructor() {
    this.scale = 'C';
  }

  setScale(scale: string) {
    this.scale = scale;
  }
  getScale(): string {
    return this.scale;
  }
}
