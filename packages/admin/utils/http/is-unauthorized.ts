import { AxiosResponse } from "axios";

export const isUnAuthorizedStatus = (resp : AxiosResponse)=> [401].includes(resp.status)