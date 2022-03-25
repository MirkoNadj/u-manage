import { UserInterface } from '../Interfaces/ObjectInterfaces';
import { Position } from '../TypeFiles/ObjectTypes';

export class User implements UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    companyId: string;
    companyName: string;
    dOB: string;
    position: Position;
    phoneNumber: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        companyId: string,
        companyName: string,
        dOB: string,
        position: Position,
        phoneNumber: string,
    ) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.companyId = companyId
        this.companyName = companyName
        this.dOB = dOB
        this.position = position
        this.phoneNumber = phoneNumber
    }
}



