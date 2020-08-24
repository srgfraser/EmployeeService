export class Employee {
  constructor(  public id: number,
                public name: string,
                public address: string,
                public role: string,
                public department: string,
                public skillSets: string,
                public dateOfBirth: Date,
                public dateOfJoining: Date,
                public isActive: boolean,
    ) {}
}
