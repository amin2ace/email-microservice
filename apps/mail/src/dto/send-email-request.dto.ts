import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsObject,
  IsUrl,
} from 'class-validator';

export class SendEmailRequestDto {
  @IsEmail()
  @IsNotEmpty()
  to: string; // Recipient's email address

  @IsEmail()
  @IsNotEmpty()
  from: string; // Sender's email address

  @IsEmail()
  @IsOptional()
  cc?: string; // CC email address (optional)

  @IsEmail()
  @IsOptional()
  bcc?: string; // BCC email address (optional)

  @IsString()
  @IsNotEmpty()
  subject: string; // Email subject

  @IsString()
  @IsNotEmpty()
  template: string; // Template name to be used

  @IsString()
  @IsNotEmpty()
  userName: string; // User's name

  @IsUrl()
  @IsNotEmpty()
  appUrl: string; // Application URL

  @IsUrl()
  @IsNotEmpty()
  appName: string; // Application Name
  @IsObject()
  @IsOptional()
  context?: Record<string, any>; // Additional context data for the email template
}
