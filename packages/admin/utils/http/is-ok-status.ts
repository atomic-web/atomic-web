import { AxiosResponse } from "axios";

export const isOKStatus = (resp : AxiosResponse)=> [200].includes(resp.status)
