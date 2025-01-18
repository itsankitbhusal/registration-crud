import nodemailer from "nodemailer";

import "dotenv/config";
import jwt from "jsonwebtoken";

export const errorResponse = (message: string) => ({
  success: false,
  message,
});
export const successResponse = (data: unknown) => ({
  success: true,
  data,
});

export const signRefreshToken = (email: string) => {
  try {
    const refreshSecret = process.env.JWT_SECRET_REFRESH;
    if (!refreshSecret) {
      throw new Error("refresh secret not found");
    }
    return jwt.sign({ email }, refreshSecret, {
      expiresIn: "7d",
    });
  } catch (error) {
    return error;
  }
};

export const signAccessToken = (id: string, email: string) => {
  try {
    const accessSecret = process.env.JWT_SECRET_ACCESS;
    if (!accessSecret) {
      throw new Error("access secret not found");
    }
    return jwt.sign({ email, id }, accessSecret, {
      expiresIn: "15min",
    });
  } catch (error) {
    return error;
  }
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const frontendURL = process.env.FRONTEND_URL;
    const email = process.env.EMAIL;
    const password = process.env.PASS;

    if (!frontendURL || !email || !password) {
      throw new Error("Provide email, password and frontend URL");
    }

    if (!to || !subject || !text) {
      throw new Error(
        "Provide email address, subject and text for sending email"
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: email,
        pass: password,
      },
    });

    const mailOptions = {
      from: email,
      to,
      subject,
      html: text,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${to}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error sending email: ${error.message}`);
    }
    throw new Error("Failed to send email");
  }
};
