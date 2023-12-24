import { LoginRequest, RegisterRequest } from "../models/dto/auth";
import { Auth } from "../models/entity/auth";
import { ErrorResponse } from "../models/entity/default";
import { User } from "../models/entity/user";
import UsersRepository from "../repositories/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUND = 10;

class AuthService {
  static async login(req: LoginRequest): Promise<Auth | ErrorResponse> {
    try {
      if (!req.email) throw new Error("Email is empty");
      if (!req.password) throw new Error("Password must be provided");

      // Check email
      const user = await UsersRepository.getUserByEmail(req.email);

      if (!user) {
        throw new Error("Error, user doesnt exist");
      }
      const isPasswordCorrect = bcrypt.compareSync(
        req.password,
        user.password as string
      );

      if (!isPasswordCorrect) {
        throw new Error("Password is not correct");
      }

      // Generate token JWT
      const jwtSecret = "SECRET";
      const jwtExpireTime = "24h";

      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );

      const token: Auth = {
        access_token: accessToken,
      };

      return token;
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }

  static async registerAdmin(
    req: RegisterRequest
  ): Promise<User | ErrorResponse> {
    try {
      const user = await UsersRepository.getUserByEmail(req.email);

      if (user) {
        throw new Error("User already exist");
      }
      if (req.role === "superadmin") {
        throw new Error("Super admin already exist");
      }
      // Encrypt password
      const encryptedPassword = bcrypt.hashSync(req.password, SALT_ROUND);

      // Store / create user to database
      const userToCreate: User = {
        email: req.email,
        name: req.name,
        password: encryptedPassword,
        profile_picture_url: req.profile_picture_url,
        role: req.role,
      };

      const createdUser = await UsersRepository.createUser(userToCreate);

      return createdUser;
    } catch (error: any) {
      // If something is wrong, return the error
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }
  static async register(req: RegisterRequest): Promise<User | ErrorResponse> {
    try {
      // Check if email is exist
      const user = await UsersRepository.getUserByEmail(req.email);

      if (user) {
        throw new Error("User email already exist");
      }


      const hasPass = bcrypt.hashSync(req.password, SALT_ROUND);

      // Store / create user to database
      const userToCreate: User = {
        email: req.email,
        name: req.name,
        password: hasPass,
        profile_picture_url: req.profile_picture_url,
        role: req.role,
      };

      const createdUser = await UsersRepository.createUser(userToCreate);

      return createdUser;
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }
  static async loginGoogle(
    googleAccessToken: string
  ): Promise<Auth | ErrorResponse> {
    try {
      // Get google user credential
      const client = new OAuth2Client(
       process.env.GOOGLE_ID_CLIENT
      );

      const userInfo: any = await client.verifyIdToken({
        idToken: googleAccessToken,
        audience:
        process.env.GOOGLE_ID_CLIENT
      });

      console.log("user response", userInfo.payload);
      const { email, name, picture } = userInfo.payload;

  
      const user = await UsersRepository.getUserByEmail(email);
    
      if (!user) {
        const newUser = {
          email: email,
          name: name,
          password: "secret",
          profile_picture_url: picture,
        };
        const createdUser = await UsersRepository.createUser(newUser);
        const jwtSecret = "SECRET";
        const jwtExpireTime = "24h";
        const accessToken = jwt.sign(
          {
            email: createdUser.email,
          },
          jwtSecret,
          {
            expiresIn: jwtExpireTime,
          }
        );

        const token: Auth = {
          access_token: accessToken,
        };

        return token;
      }
      const jwtSecret = "SECRET";
      const jwtExpireTime = "24h";

      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );

      const token: Auth = {
        access_token: accessToken,
      };

      return token;
    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }
}

export default AuthService;
