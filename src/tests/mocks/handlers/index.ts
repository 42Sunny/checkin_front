import { RestHandler } from "msw";
import configApiHandlers from "./configApiHandlers";
import userApiHandlers from "./userApiHandlers";

const handlers: RestHandler[] = [...configApiHandlers, ...userApiHandlers];

export default handlers;
