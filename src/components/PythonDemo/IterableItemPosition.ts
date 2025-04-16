class IterableItemPosition {
  constructor(public x: number, public y: number) {}

  isEqual(other: IterableItemPosition) {
    return this.x === other.x && this.y === other.y;
  }

  isBefore(other: IterableItemPosition) {
    return this.y < other.y || (this.y === other.y && this.x < other.x);
  }

  isAfter(other: IterableItemPosition) {
    return this.x > other.x || (this.x === other.x && this.y > other.y);
  }

  nextColWise(maxX: number, maxY: number): IterableItemPosition | null {
    if(maxX <= 0 || maxY <= 0) {
      return null;
    }
    if (this.x + 1 < maxX) {
      return new IterableItemPosition(this.x + 1, this.y);
    } else if (this.y + 1 < maxY) {
      return new IterableItemPosition(0, this.y + 1);
    }
    return null;
  }

  prevColWise(maxX: number): IterableItemPosition | null {
    if (this.x - 1 >= 0) {
      return new IterableItemPosition(this.x - 1, this.y);
    } else if (this.y - 1 >= 0) {
      return new IterableItemPosition(maxX - 1, this.y - 1);
    }
    return null;
  }

  toString() {
    return `Position (${this.x}, ${this.y})`;
  }
}

export default IterableItemPosition;
