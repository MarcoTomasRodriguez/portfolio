import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid";
import SpinIcon from "../icons/SpinIcon";

export enum RequestStatus {
  None,
  Pending,
  Success,
  Failure,
}

export type StatusButtonProps = React.ComponentProps<"button"> & {
  status: RequestStatus;
  defaultText: string;
  pendingText: string;
  successText: string;
  failureText: string;
};

export default function StatusButton({
  status,
  defaultText,
  pendingText,
  successText,
  failureText,
  ...props
}: StatusButtonProps) {
  const resolveButtonStyles = () => {
    switch (status) {
      case RequestStatus.None:
        return "button--blue";
      case RequestStatus.Pending:
        return "button--yellow cursor-wait";
      case RequestStatus.Success:
        return "button--green cursor-not-allowed";
      case RequestStatus.Failure:
        return "button--red";
    }
  };

  return (
    <button
      className={`w-full font-medium button ${resolveButtonStyles()}`}
      disabled={
        status == RequestStatus.Pending || status == RequestStatus.Success
      }
      {...props}
    >
      {status == RequestStatus.None && defaultText}
      {status == RequestStatus.Pending && (
        <>
          {pendingText}
          <SpinIcon className="animate-spin h-4 w-4 ml-1" />
        </>
      )}
      {status == RequestStatus.Success && (
        <>
          {successText}
          <CheckCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
      {status == RequestStatus.Failure && (
        <>
          {failureText}
          <ExclamationCircleIcon className="h-5 w-5 ml-1" />
        </>
      )}
    </button>
  );
}
