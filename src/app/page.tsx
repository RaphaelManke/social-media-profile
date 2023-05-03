"use client";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaGlobe, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { QRCode } from "react-qrcode-logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <UserProfile
        githubUrl="https://github.com/RaphaelManke"
        imageUrl="/15867688.jpeg"
        jobTitle="IT consultant"
        linkedinUrl="https://www.linkedin.com/in/raphael-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-manke-a61912114/"
        name="Raphael Manke"
        websiteUrl="https://www.codecentric.de/standorte/karlsruhe/karlsruhe-team#raphael-manke"
        twitterUrl="https://twitter.com/RaphaelManke"
        descriptionEn="Raphael Manke is a full-stack developer and consultant with five years of experience in developing serverless applications in the AWS cloud. AWS CDK changed his way of defining infrastructure as code dramatically and he likes to share his experiences and challenges along the way."
        descriptionDe="Raphael ist ein Full-Stack-Entwickler und Berater bei der codecentric AG mit Erfahrung in der Entwicklung von Serverless-Anwendungen in der AWS-Cloud. AWS CDK hat seine Art, Infrastruktur als Code zu definieren. Raphael teilt gerne seine Erfahrungen und Herausforderungen."
      ></UserProfile>
    </main>
  );
}

interface UserAvatarProps {
  imageUrl: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl }) => {
  return (
    <div className="relative w-32 h-32 overflow-hidden rounded-full">
      <Image
        src={imageUrl}
        fill
        layout="fill"
        objectFit="cover"
        alt="Profile Picture"
      />
    </div>
  );
};

interface UserDescriptionProps {
  description: string;
}

const UserDescription: React.FC<UserDescriptionProps> = ({ description }) => {
  return <p className="text-gray-800">{description}</p>;
};

interface UserHeaderProps {
  name: string;
  jobTitle: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, jobTitle }) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <h1 className="mt-4 text-2xl font-semibold">
        <span className="text-primary-1">{"//"}</span> {name}
      </h1>
      <h2 className="text-xl text-gray-600">{jobTitle}</h2>
    </div>
  );
};

interface UserLinkProps {
  url: string;
  icon: React.ReactElement;
  label: string;
}

const UserLink: React.FC<UserLinkProps> = ({ url, icon, label }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 text-gray-900 hover:text-gray-500"
    >
      <span>{icon}</span>
      <span className="inline-block md:hidden">{label}</span>
      <span className="hidden md:inline-block">{label}</span>
    </a>
  );
};

interface UserProfileProps {
  name: string;
  jobTitle: string;
  imageUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  descriptionEn: string;
  descriptionDe: string;
}
const flagEmojis = {
  en: "\u{1F1EC}\u{1F1E7}", // United Kingdom Flag
  de: "\u{1F1E9}\u{1F1EA}", // Germany Flag
} as const;

// Set the initial language state based on the browser language or fallback to "en"
const initialLanguageState = "en";

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  jobTitle,
  imageUrl,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  websiteUrl,
  descriptionEn,
  descriptionDe,
}) => {
  const [language, setLanguage] = useState(initialLanguageState);

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const description = language === "en" ? descriptionEn : descriptionDe;

  return (
    <div className="w-full px-4 py-8 mx-auto bg-gray-100 md:max-w-lg md:w-1/2 md:mx-auto">
      <button
        onClick={handleLanguageToggle}
        className="absolute top-0 right-0 m-4 text-sm text-gray-500 focus:outline-none hover:text-gray-900"
      >
        <span className="inline-block h-4 w-4 mr-2">
          {flagEmojis[language === "en" ? "de" : "en"]}
        </span>
        {language === "en" ? "Deutsch" : "English"}
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
        <div className="flex flex-col items-center md:items-start">
          <UserAvatar imageUrl={imageUrl} />
          <UserHeader name={name} jobTitle={jobTitle} />
        </div>
        <div className="mt-4 md:mt-0">
          <UserDescription description={description} />
        </div>
        <div className="mt-4 space-y-2 md:flex md:space-x-4 md:space-y-0">
          <UserLink
            url={githubUrl}
            icon={<FaGithub size={24} />}
            label="GitHub"
          />
          <hr className="w-full border-t border-gray-300 md:hidden" />
          <UserLink
            url={linkedinUrl}
            icon={<FaLinkedin size={24} />}
            label="LinkedIn"
          />
          <hr className="w-full border-t border-gray-300 md:hidden" />
          <UserLink
            url={websiteUrl}
            icon={<FaGlobe size={24} color="#22F4AE" />}
            label="Website"
          />
          <hr className="w-full border-t border-gray-300 md:hidden" />
          <UserLink
            url={twitterUrl}
            icon={<FaTwitter size={24} color="#1DA1F2" />}
            label="Twitter"
          />
        </div>
        {/* <QRCode
          value="https://social-media-profile.vercel.app"
          logoImage="/cc_color logo_big-sign_RGB_onWhite.png"
          removeQrCodeBehindLogo={true}
          ecLevel="H"
          logoOpacity={1}
          size={400}
          logoHeight={100}
          logoWidth={100}
          qrStyle="dots"
        /> */}
      </div>
    </div>
  );
};
