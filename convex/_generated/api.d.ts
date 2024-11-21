/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as applications from "../applications.js";
import type * as comments from "../comments.js";
import type * as coverLetter from "../coverLetter.js";
import type * as feeds from "../feeds.js";
import type * as openai from "../openai.js";
import type * as prompt from "../prompt.js";
import type * as results from "../results.js";
import type * as resume from "../resume.js";
import type * as types from "../types.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  applications: typeof applications;
  comments: typeof comments;
  coverLetter: typeof coverLetter;
  feeds: typeof feeds;
  openai: typeof openai;
  prompt: typeof prompt;
  results: typeof results;
  resume: typeof resume;
  types: typeof types;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
