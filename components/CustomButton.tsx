import Image from "next/image";

import { Button } from "./ui/button";

interface ButtonProps {
  isloading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isloading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isloading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isloading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;