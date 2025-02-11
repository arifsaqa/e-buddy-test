import { User } from "@repo/entities";
import { BaseApi } from "./base";

export class UserApi extends BaseApi {
  private readonly userBaseUrl = "/users";

  create(token: string, json: Omit<User, "recentlyActive" | "id">) {
    return this.fetch<User>(this.userBaseUrl, "POST", {
      isPrivate: true,
      token,
      json,
    });
  }

  lists(token: string) {
    return this.fetch<Array<User>>(this.userBaseUrl, "GET", {
      isPrivate: true,
      token,
    });
  }

  get(token: string, id: string) {
    return this.fetch(`${this.userBaseUrl}/${id}`, "GET", {
      isPrivate: true,
      token,
    });
  }

  update(token: string, id: string, json: Omit<User, "id" | "recentlyActive">) {
    return this.fetch<boolean>(`${this.userBaseUrl}/${id}`, "PATCH", {
      isPrivate: true,
      token,
      json,
    });
  }

  delete(token: string, id: string) {
    return this.fetch<boolean>(`${this.userBaseUrl}/${id}`, "DELETE", {
      isPrivate: true,
      token,
    });
  }
}
