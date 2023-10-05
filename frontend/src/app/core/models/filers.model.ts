export class Filters {
    name?: string;
    offset?: number;

    constructor(
        name?: string,
        offset?: number
      ) {
        this.name = name;
        this.offset = offset;
      }
    
      public length(): number {
        let count: number = 0;
        if (this.name) count++;
        if (this.offset) count++;
        return count;
      }
}