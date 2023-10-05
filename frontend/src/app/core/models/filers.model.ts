export class Filters {
    name?: string;

    constructor(
        name?: string,
      ) {
        this.name = name;
      }
    
      public length(): number {
        let count: number = 0;
        if (this.name) count++;
        return count;
      }
}