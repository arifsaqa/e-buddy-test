import { BaseRepository } from "../base/BaseRepository";
import { User } from "@repo/entities";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super("USERS");
  }
}
