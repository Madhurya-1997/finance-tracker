import { StreamOptions } from "morgan";
import { loggerStream } from '../utils/logger'

export const morganOptions: { stream: StreamOptions } = { stream: loggerStream };