import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const SALT = bcrypt.genSaltSync(5);
  const password = bcrypt.hashSync("super", SALT);

  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "yulius",
      email: "yuliusetyawan@mail.com",
      password,
      role: "superadmin",
    },
  ]);
}
