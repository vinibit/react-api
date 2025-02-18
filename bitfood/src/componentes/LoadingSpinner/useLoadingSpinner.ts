import { LoaderActions } from "./model"
import loader from "../../http/loader"

export const useLoadingSpinner = (): LoaderActions => ({ ...loader })   