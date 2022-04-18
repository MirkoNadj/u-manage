import { AxiosError } from 'axios';

export function isAxiosError(someError: any): someError is AxiosError {
    return someError.isAxiosError === true;
}